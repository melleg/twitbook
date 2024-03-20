package nl.itvitae.twitbook.post;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.follow.Follow;
import nl.itvitae.twitbook.follow.FollowRepository;
import nl.itvitae.twitbook.like.Like;
import nl.itvitae.twitbook.like.LikeRepository;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.User.Role;
import nl.itvitae.twitbook.user.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/posts")
public class PostController {

  private final PostService postService;
  private final UserRepository userRepository;
  private final LikeRepository likeRepository;

  private static final int PAGE_SIZE = 4;

  // Returns the proper DTO based on post type
  private Object getPostDTO(Post post, User userRequesting) {
    return post.getLinkedPost() == null ? new PostDTO(post, userRequesting)
        : new RepostDTO(post, userRequesting);
  }

  private PageRequest getPageable(Pageable pageable) {
    return PageRequest.of(
        pageable.getPageNumber(),
        Math.min(pageable.getPageSize(), PAGE_SIZE),
        Sort.by(Direction.DESC, "postedDate"));
  }

  @GetMapping
  public ResponseEntity<?> getAll(@AuthenticationPrincipal User user, Pageable pageable) {
    return ResponseEntity.ok(
        postService.findAll(getPageable(pageable)).map(p -> getPostDTO(p, user)));
  }

  @GetMapping("{id}")
  public ResponseEntity<?> getById(@PathVariable Long id, @AuthenticationPrincipal User user) {
    Optional<Post> post = postService.findById(id);

    if (post.isEmpty()) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(getPostDTO(post.get(), user), HttpStatus.OK);
  }

  @GetMapping("by-username/{username}")
  public ResponseEntity<?> getAllByUsername(@PathVariable String username,
      @AuthenticationPrincipal User user, Pageable pageable) {
    Optional<User> findUser = userRepository.findByUsernameIgnoreCase(username);
    if (findUser.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Page<Post> posts = postService.getByAuthor(findUser.get().getUsername(),
        getPageable(pageable));
    return ResponseEntity.ok(posts.map(p -> getPostDTO(p, user)));
  }

  @PostMapping
  public ResponseEntity<?> createPost(@RequestBody PostModel model, UriComponentsBuilder uriBuilder,
      @AuthenticationPrincipal User user) {

    // Create post and save to database
    Post newPost = postService.addPost(model.content(), user);

    // Return post uri
    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    return ResponseEntity.created(uri).body(getPostDTO(newPost, user));
  }

  @PostMapping("reply/{postId}")
  public ResponseEntity<?> replyToPost(@PathVariable long postId, @RequestBody PostModel model,
      UriComponentsBuilder uriBuilder, @AuthenticationPrincipal User user) {
    Optional<Post> originalPost = postService.findById(postId);
    if (originalPost.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    // Create post and save to database
    Post newPost = postService.addReply(model.content(), user, originalPost.get());

    // Return post uri
    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    return ResponseEntity.created(uri).body(getPostDTO(newPost, user));
  }

  @PostMapping("repost/{postId}")
  public ResponseEntity<?> repostPost(@PathVariable long postId, @AuthenticationPrincipal User user,
      UriComponentsBuilder uriBuilder) {
    Optional<Post> originalPost = postService.findById(postId);
    if (originalPost.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    // If we have reposted already, remove repost
    Optional<Post> repostCheck = postService.findByTypeAndLinkedPostAndAuthor_UsernameIgnoreCase(
        Post.PostType.REPOST, originalPost.get(), user.getUsername());

    if (repostCheck.isPresent()) {
      postService.deletePost(repostCheck.get());
      return ResponseEntity.noContent().build();
    }

    // Otherwise, create and save repost
    Post newPost = postService.addRepost(user, originalPost.get());

    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    return ResponseEntity.created(uri).body(getPostDTO(newPost, user));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deletePost(@PathVariable long id, @AuthenticationPrincipal User user) {
    Optional<Post> post = postService.findById(id);
    if (post.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    var userRoles = List.of(user.getRoles());

    if (userRoles.contains(Role.ROLE_ADMIN) || (userRoles.contains(Role.ROLE_USER) && post.get()
        .getAuthor().getId().equals(user.getId()))) {
      postService.deletePost(post.get());
      return ResponseEntity.noContent().build();
    }

    return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
  }

  @GetMapping("by-following")
  public ResponseEntity<?> getAllByFollowing(@AuthenticationPrincipal User user,
      Pageable pageable) {
    if (user == null) {
      return ResponseEntity.notFound().build();
    }

    Page<Post> posts = postService.getByFollowing(user.getUsername(),
        getPageable(pageable));

    return ResponseEntity.ok(posts.map(p -> getPostDTO(p, user)));
  }

  @PostMapping("/like/{postId}")
  public ResponseEntity<?> likePost(@PathVariable long postId, @AuthenticationPrincipal User user,
      UriComponentsBuilder ucb) {
    Optional<Post> post = postService.findById(postId);
    if (post.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Optional<Like> optionalLike = likeRepository.findLikeByUserIdAndPostId(user.getId(), postId);
    if (optionalLike.isPresent()) {
      likeRepository.delete(optionalLike.get());
      return ResponseEntity.noContent().build();
    }

    likeRepository.save(new Like(post.get(), user));
    return ResponseEntity.created(null).build();
  }
}

package nl.itvitae.twitbook.post;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.User.Role;
import nl.itvitae.twitbook.user.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
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

  private final PostRepository postRepository;
  private final UserRepository userRepository;

  // Returns the proper DTO based on post type
  private Object getPostDTO(Post post) {
    return post.getLinkedPost() == null ? new PostDTO(post) : new RepostDTO(post);
  }

  @GetMapping
  public List<?> getAll() {
    return postRepository.findAll().stream().map(this::getPostDTO).toList();
  }

  @GetMapping("{id}")
  public ResponseEntity<?> getById(@PathVariable Long id) {
    Optional<Post> post = postRepository.findById(id);

    if (post.isEmpty()) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(getPostDTO(post.get()), HttpStatus.OK);
  }

  @GetMapping("by-username/{username}")
  public ResponseEntity<?> getAllByUsername(@PathVariable String username) {
    Optional<User> user = userRepository.findByUsernameIgnoreCase(username);
    if (user.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    List<Post> posts = postRepository.findByAuthor_UsernameIgnoreCase(user.get().getUsername());
    return ResponseEntity.ok(posts.stream().map(this::getPostDTO).toList());
  }

  @PostMapping
  public ResponseEntity<?> createPost(@RequestBody PostModel model, UriComponentsBuilder uriBuilder, @AuthenticationPrincipal User author) {

    // Create post and save to database
    Post newPost = new Post(model.content(), author);
    postRepository.save(newPost);

    // Return post uri
    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    return ResponseEntity.created(uri).body(getPostDTO(newPost));
  }

  @PostMapping("reply/{postId}")
  public ResponseEntity<?> replyToPost(@PathVariable long postId, @RequestBody PostModel model, UriComponentsBuilder uriBuilder, @AuthenticationPrincipal User author) {
    Optional<Post> originalPost = postRepository.findById(postId);
    if(originalPost.isEmpty()) return ResponseEntity.notFound().build();

    // Create post and save to database
    Post newPost = new Post(model.content(), author, originalPost.get());
    postRepository.save(newPost);

    // Return post uri
    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    return ResponseEntity.created(uri).body(getPostDTO(newPost));
  }

  @PostMapping("repost/{postId}")
  public ResponseEntity<?> repostPost(@PathVariable long postId, UriComponentsBuilder uriBuilder, @AuthenticationPrincipal User author) {
    Optional<Post> originalPost = postRepository.findById(postId);
    if(originalPost.isEmpty()) return ResponseEntity.notFound().build();

    // If we have reposted already, remove repost
    Optional<Post> repostCheck = postRepository.findByTypeAndLinkedPostAndAuthor_UsernameIgnoreCase(
        Post.PostType.REPOST, originalPost.get(), author.getUsername());

    if(repostCheck.isPresent()) {
      postRepository.delete(repostCheck.get());
      return ResponseEntity.noContent().build();
    }

    // Otherwise, create and save repost
    Post newPost = new Post(null, author, originalPost.get());
    postRepository.save(newPost);

    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    return ResponseEntity.created(uri).body(getPostDTO(newPost));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deletePost(@PathVariable long id, @AuthenticationPrincipal User user) {
    Optional<Post> post = postRepository.findById(id);
    if (post.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    var userRoles = List.of(user.getRoles());

    if (userRoles.contains(Role.ROLE_ADMIN) || (userRoles.contains(Role.ROLE_USER) && post.get()
        .getAuthor().getId().equals(user.getId()))) {
      postRepository.delete(post.get());
      return ResponseEntity.noContent().build();
    }

    return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
  }
}

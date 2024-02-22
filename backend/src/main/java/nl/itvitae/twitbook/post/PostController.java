package nl.itvitae.twitbook.post;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.like.Like;
import nl.itvitae.twitbook.like.LikeDTO;
import nl.itvitae.twitbook.like.LikeModel;
import nl.itvitae.twitbook.like.LikeRepository;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("api/v1/posts")
public class PostController {

  private final PostRepository postRepository;

  private final UserRepository userRepository;

  private final LikeRepository likeRepository;

  @GetMapping
  public List<PostDTO> getAll() {
    return postRepository.findAll().stream().map(PostDTO::new).toList();
  }

  @GetMapping("{id}")
  public ResponseEntity<?> getById(@PathVariable Long id) {
    Optional<Post> post = postRepository.findById(id);

    if (post.isEmpty()) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(new PostDTO(post.get()), HttpStatus.OK);
  }

  @GetMapping("by-username/{username}")
  public ResponseEntity<?> getAllByUsername(@PathVariable String username) {
    Optional<User> user = userRepository.findByUsernameIgnoreCase(username);
    if (user.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    List<Post> posts = postRepository.findByAuthor_UsernameIgnoreCase(user.get().getUsername());
    return ResponseEntity.ok(posts.stream().map(PostDTO::new).toList());
  }

  @PostMapping
  public ResponseEntity<?> createPost(@RequestBody PostModel model,
      UriComponentsBuilder uriBuilder) {

    // TODO: replace with get user from auth
    List<User> allUsers = userRepository.findAll();
    if (allUsers.isEmpty()) {
      return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }
    User author = allUsers.getFirst();

    // Create post and save to database
    Post newPost = new Post(model, author);
    postRepository.save(newPost);

    // Return post uri
    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    PostDTO newPostDTO = new PostDTO(newPost);

    return ResponseEntity.created(uri).body(newPostDTO);
  }

  @PostMapping("/like")
  public ResponseEntity<LikeDTO> likePost(@RequestBody LikeModel likeModel,
      UriComponentsBuilder ucb) {
    Optional<Post> post = postRepository.findById(likeModel.postId());
    Optional<User> user = userRepository.findByUsernameIgnoreCase(likeModel.username());
    if (post.isEmpty() || user.isEmpty()) {
      return ResponseEntity.badRequest().build();
    }
    Optional<Like> optionalLike = likeRepository.findLikeByUserIdAndPostId(user.get().getId(), post.get().getId());
    if (optionalLike.isPresent()) {
      likeRepository.delete(optionalLike.get());
      return ResponseEntity.noContent().build();
    }

    Like like = likeRepository.save(new Like(post.get(), user.get()));
    return ResponseEntity.created(null).body(new LikeDTO(like));

  }
}

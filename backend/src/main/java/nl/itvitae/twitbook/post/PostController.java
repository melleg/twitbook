package nl.itvitae.twitbook.post;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;

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

    if(post.isEmpty())
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    return new ResponseEntity<>(getPostDTO(post.get()), HttpStatus.OK);
  }

  @GetMapping("by-username/{username}")
  public ResponseEntity<?> getAllByUsername(@PathVariable String username) {
    Optional<User> user = userRepository.findByUsernameIgnoreCase(username);
    if(user.isEmpty()) return ResponseEntity.notFound().build();

    List<Post> posts = postRepository.findByAuthor_UsernameIgnoreCase(user.get().getUsername());
    return ResponseEntity.ok(posts.stream().map(this::getPostDTO).toList());
  }

  @PostMapping
  public ResponseEntity<?> createPost(@RequestBody PostModel model, UriComponentsBuilder uriBuilder) {

    // TODO: replace with get user from auth
    List<User> allUsers = userRepository.findAll();
    if (allUsers.isEmpty()) return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    User author = allUsers.getFirst();

    Post newPost = new Post(model.content(), author);

    // If we're linking a post, try to add to post or return
    if(model.linkedPostId() != null) {
      Optional<Post> linkedPost = postRepository.findById(model.linkedPostId());
      if(linkedPost.isEmpty())
        return new ResponseEntity<>("Unable to find linked post", HttpStatus.NOT_FOUND);

      newPost = new Post(model.content(), author, linkedPost.get());
    }

    // Create post and save to database
    postRepository.save(newPost);

    // Return post uri
    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    return ResponseEntity.created(uri).body(getPostDTO(newPost));
  }
}

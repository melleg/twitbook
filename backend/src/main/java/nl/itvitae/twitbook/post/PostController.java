package nl.itvitae.twitbook.post;

import java.util.List;
import java.util.Optional;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("api/v1/posts")
public class PostController {

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private UserRepository userRepository;

  @GetMapping
  public List<Post> getAll() {
    return postRepository.findAll();
  }

  @GetMapping("{id}")
  public Optional<Post> getById(@PathVariable Long id) {
    return postRepository.findById(id);
  }

  @PostMapping
  public ResponseEntity<?> createPost(@RequestBody PostModel model, UriComponentsBuilder uriBuilder) {

    // TODO: replace with get user from auth
    List<User> allUsers = userRepository.findAll();
    if (allUsers.size() == 0) return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    User author = allUsers.getFirst();

    // Create post and save to database
    Post newPost = new Post(model, author);
    postRepository.save(newPost);

    // Return post uri
    var uri = uriBuilder.path("/posts/{id}")
        .buildAndExpand(newPost.getId())
        .toUri();

    return ResponseEntity.created(uri).body(newPost);
  }
}

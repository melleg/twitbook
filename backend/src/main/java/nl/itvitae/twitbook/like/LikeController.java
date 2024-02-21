package nl.itvitae.twitbook.like;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import nl.itvitae.twitbook.post.Post;
import nl.itvitae.twitbook.post.PostDTO;

import nl.itvitae.twitbook.post.PostRepository;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("api/v1/likes")
public class LikeController {
  private final LikeRepository likeRepository;
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  @GetMapping
  public ResponseEntity<Iterable<Like>> getAll() {
    return ResponseEntity.ok(likeRepository.findAll());
  }

  private record PostData(Long postId, String username){}
  @PostMapping
  public ResponseEntity<LikeDTO> likePost(@RequestBody PostData postData, UriComponentsBuilder ucb) {
    Optional<Post> post = postRepository.findById(postData.postId);
    Optional<User> user = userRepository.findByUsernameIgnoreCase(postData.username);
    if (post.isPresent() && user.isPresent()) {
      Like like = likeRepository.save(new Like(post.get(), user.get()));
      URI locationOfLike = ucb
          .path("/{id}")
          .buildAndExpand(likeRepository.findAll())
          .toUri();
      return ResponseEntity.created(locationOfLike).body(new LikeDTO(like));
    } else {
      return ResponseEntity.badRequest().build();
    }

  }
}

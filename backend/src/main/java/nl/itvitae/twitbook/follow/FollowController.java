package nl.itvitae.twitbook.follow;

import java.util.Optional;
import lombok.AllArgsConstructor;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/follows")
public class FollowController {
  private final FollowRepository followRepository;
  private final UserRepository userRepository;

  @GetMapping
  public Iterable<FollowDTO> getAll() {
    return followRepository.findAll().stream().map(FollowDTO::new).toList();
  }

  @PostMapping("user/{followingUsername}")
  public ResponseEntity<?> followUser(@PathVariable String followingUsername,
      @AuthenticationPrincipal User user) {
    Optional<User> following = userRepository.findByUsernameIgnoreCase(
        followingUsername);
    if (following.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    if (user.getUsername().equals(followingUsername)) {
      return new ResponseEntity<>(null, HttpStatus.CONFLICT);
    }

    // check if follow already exists, if it does, delete the follow (unfollow)
    Optional<Follow> optionalFollow = followRepository.findFollowByFollowerIdAndFollowingId(
        user.getId(), following.get().getId());
    if (optionalFollow.isPresent()) {
      followRepository.delete(optionalFollow.get());
      return ResponseEntity.noContent().build();
    }
    Follow follow = followRepository.save(new Follow(user, following.get()));
    return ResponseEntity.created(null).body(new FollowDTO(follow));
  }
}

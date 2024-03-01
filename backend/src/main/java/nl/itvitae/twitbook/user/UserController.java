package nl.itvitae.twitbook.user;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.follow.Follow;
import nl.itvitae.twitbook.follow.FollowDTO;
import nl.itvitae.twitbook.follow.FollowRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {

  private final UserRepository userRepository;
  private final FollowRepository followRepository;

  @GetMapping
  public List<UserDTO> getAll() {
    return userRepository.findAll().stream().map(UserDTO::new).toList();
  }

  @GetMapping("by-username/{username}")
  public ResponseEntity<?> findByUsername(@PathVariable String username,  @AuthenticationPrincipal User authUser) {
    Optional<User> user = userRepository.findByUsernameIgnoreCase(username);

    if (user.isEmpty()) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    if (authUser == null) {
      return new ResponseEntity<>(new UserDTO(user.get()), HttpStatus.OK);
    }
    return new ResponseEntity<>(new UserDTO(user.get(), followRepository.existsFollowByFollowerIdAndFollowingId(authUser.getId(), user.get().getId())), HttpStatus.OK);
  }

  @PostMapping("/follow/{followingUsername}")
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

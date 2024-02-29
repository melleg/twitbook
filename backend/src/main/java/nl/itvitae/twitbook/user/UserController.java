package nl.itvitae.twitbook.user;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.follow.Follow;
import nl.itvitae.twitbook.follow.FollowDTO;
import nl.itvitae.twitbook.follow.FollowModel;
import nl.itvitae.twitbook.follow.FollowRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<?> findByUsername(@PathVariable String username) {
    Optional<User> user = userRepository.findByUsernameIgnoreCase(username);

    if(user.isEmpty())
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    return new ResponseEntity<>(new UserDTO(user.get()), HttpStatus.OK);
  }

  @PostMapping("/follow")
  public ResponseEntity<?> followUser(@RequestBody FollowModel followModel){
    Optional<User> follower = userRepository.findByUsernameIgnoreCase(followModel.followerUsername());
    Optional<User> following = userRepository.findByUsernameIgnoreCase(followModel.followingUsername());
    if (follower.isEmpty() || following.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    Follow follow = followRepository.save(new Follow(follower.get(), following.get()));
    return ResponseEntity.created(null).body(new FollowDTO(follow));
  }
}

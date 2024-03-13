package nl.itvitae.twitbook.user;

import java.util.List;
import java.util.Optional;

import java.util.UUID;
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
  public ResponseEntity<?> findByUsername(@PathVariable String username,
      @AuthenticationPrincipal User user) {
    Optional<User> targetUser = userRepository.findByUsernameIgnoreCase(username);

    if (targetUser.isEmpty()) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    if (user == null) {
      return new ResponseEntity<>(new UserDTO(targetUser.get()), HttpStatus.OK);
    }
    return new ResponseEntity<>(new UserDTO(targetUser.get(),
        followRepository.existsFollowByFollowerIdAndFollowingId(user.getId(),
            targetUser.get().getId())), HttpStatus.OK);
  }

  private record UserUsernameOnly(String newUsername) {

  }

  @PatchMapping("username")
  public ResponseEntity<?> editUsername(@RequestBody UserUsernameOnly userUsernameOnly,
      @AuthenticationPrincipal User user) {
    if (userRepository.existsByUsernameIgnoreCase(userUsernameOnly.newUsername())) {
      return new ResponseEntity<>("Username already in use", HttpStatus.CONFLICT);
    }

    user.setUsername(userUsernameOnly.newUsername());
    userRepository.save(user);
    return ResponseEntity.ok().build();
  }


  private record UserBioOnly(String newBio) {

  }

  @PatchMapping("bio")
  public ResponseEntity<?> editUsername(@RequestBody UserBioOnly userBioOnly,
      @AuthenticationPrincipal User user) {
    user.setBio(userBioOnly.newBio());
    userRepository.save(user);
    return ResponseEntity.ok().build();
  }
}

package nl.itvitae.twitbook.user;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.follow.FollowRepository;
import nl.itvitae.twitbook.post.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

  private static final int PAGE_SIZE = 4;

  private PageRequest getPageable(Pageable pageable) {
    return PageRequest.of(
        pageable.getPageNumber(),
        Math.min(pageable.getPageSize(), PAGE_SIZE),
        Sort.by(Sort.Direction.DESC, "displayName"));
  }

  @GetMapping
  public ResponseEntity<?> getAll(Pageable pageable) {
    Page<User> users = userRepository.findAll(getPageable(pageable));
    return ResponseEntity.ok(users.map(UserDTO::new));
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

  private record UserUsernameBioOnly(String displayName, String bio) {

  }

  @PatchMapping("profile")
  public ResponseEntity<?> editProfile(@RequestBody UserUsernameBioOnly userUsernameBioOnly,
      @AuthenticationPrincipal User user) {
    user.setDisplayName(userUsernameBioOnly.displayName());
    user.setBio(userUsernameBioOnly.bio());
    userRepository.save(user);
    return ResponseEntity.ok().build();
  }
}

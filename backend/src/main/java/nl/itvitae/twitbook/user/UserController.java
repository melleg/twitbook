package nl.itvitae.twitbook.user;

import java.io.IOException;
import java.util.Optional;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.follow.FollowRepository;
import nl.itvitae.twitbook.image.ImageService;
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
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {

  private final UserRepository userRepository;
  private final FollowRepository followRepository;
  private final ImageService imageService;

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

  @GetMapping("search/{query}")
  public ResponseEntity<?> queryByDisplayName(@PathVariable String query, Pageable pageable) {
    Page<User> users = userRepository.findByDisplayNameContainingIgnoreCase(query,
        getPageable(pageable));
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


  @PatchMapping("profile")
  public ResponseEntity<?> editProfile(@RequestPart EditUserModel editUserModel,
      @RequestPart(required = false)
      MultipartFile file,
      @AuthenticationPrincipal User user) {
    user.setDisplayName(editUserModel.displayName());
    user.setBio(editUserModel.bio());
    try {
      var oldImage = user.getProfileImage();
      user.setProfileImage(imageService.uploadImage(file));
      userRepository.save(user);
      imageService.deleteImage(oldImage);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      userRepository.save(user);
      return ResponseEntity.ok().build();
    }
  }
}

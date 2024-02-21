package nl.itvitae.twitbook.user;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {

  private final UserRepository userRepository;

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
}

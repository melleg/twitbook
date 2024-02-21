package nl.itvitae.twitbook.user;

import java.util.List;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.user.User.Role;
import org.springframework.http.HttpStatus;
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
@RequestMapping("api/v1/users")
public class UserController {

  private final UserRepository userRepository;

  @GetMapping
  public List<UserDTO> getAll() {
    return userRepository.findAll().stream().map(UserDTO::new).toList();
  }

  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody UserModel model, UriComponentsBuilder uriBuilder) {

    // Create a new user and save it to database
    User newUser = new User(model, Role.ROLE_USER);
    userRepository.save(newUser);

    // Return user uri with a UserDTO
    var uri = uriBuilder.path("/posts/{id}")
    .buildAndExpand(newUser.getId())
    .toUri();

    UserDTO newUserDTO = new UserDTO(newUser);

    return ResponseEntity.created(uri).body(newUserDTO);
  }
}

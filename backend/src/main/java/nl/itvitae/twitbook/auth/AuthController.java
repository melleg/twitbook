package nl.itvitae.twitbook.auth;

import java.util.List;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.User.Role;
import nl.itvitae.twitbook.user.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthController {

  private final UserRepository userRepository;

  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody RegisterModel model, UriComponentsBuilder uriBuilder) {

      if (userRepository.findByUsernameIgnoreCase(model.username()).isPresent())
        return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);


    User newUser = new User(model, Role.ROLE_USER);
    userRepository.save(newUser);

    var uri = uriBuilder.path("/profile/{id}")
        .buildAndExpand(newUser.getId())
        .toUri();

    return ResponseEntity.created(uri).build();
  }
}

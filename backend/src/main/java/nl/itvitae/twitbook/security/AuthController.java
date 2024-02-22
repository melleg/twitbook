package nl.itvitae.twitbook.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.User.Role;
import nl.itvitae.twitbook.user.UserRepository;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthController {

  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final JWTService jwtService;

  @PostMapping("login")
  public ResponseEntity<?> login(@RequestBody LoginModel loginModel) {
    try {
      Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginModel.username(), loginModel.password()));

      if (!authentication.isAuthenticated())
        return new ResponseEntity<>("Invalid user credentials", HttpStatus.UNAUTHORIZED);

      return new ResponseEntity<>(jwtService.generateUserJWT(loginModel.username()), HttpStatus.OK);
    }
    catch(AuthenticationException exc) {
      return new ResponseEntity<>("Invalid user credentials", HttpStatus.UNAUTHORIZED);
    }
  }

  @PostMapping("register")
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

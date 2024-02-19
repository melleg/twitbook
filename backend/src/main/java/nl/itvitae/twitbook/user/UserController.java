package nl.itvitae.twitbook.user;

import java.util.List;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

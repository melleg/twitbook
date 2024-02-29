package nl.itvitae.twitbook.follow;

import java.util.Optional;
import lombok.AllArgsConstructor;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/follows")
public class FollowController {
  private final FollowRepository followRepository;
  private final UserRepository userRepository;

  @GetMapping
  public Iterable<FollowDTO> getAll() {
    return followRepository.findAll().stream().map(FollowDTO::new).toList();
  }
}

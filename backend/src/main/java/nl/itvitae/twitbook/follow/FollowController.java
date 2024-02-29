package nl.itvitae.twitbook.follow;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/follows")
public class FollowController {
  private final FollowRepository followRepository;

  @GetMapping
  public Iterable<FollowDTO> getAll() {
    return followRepository.findAll().stream().map(FollowDTO::new).toList();
  }
}

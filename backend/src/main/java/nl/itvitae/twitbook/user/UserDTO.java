package nl.itvitae.twitbook.user;

import java.time.LocalDateTime;

public record UserDTO(String username, LocalDateTime registerDate) {
  public UserDTO(User user) {
    this(user.getUsername(), user.getRegisterDate());
  }
}

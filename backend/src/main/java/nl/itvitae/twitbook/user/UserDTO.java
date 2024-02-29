package nl.itvitae.twitbook.user;

import java.time.LocalDateTime;

public record UserDTO(String username, LocalDateTime registerDate, boolean hasFollowed) {

  public UserDTO(User user) {
    this(user.getUsername(), user.getRegisterDate(), false);
  }
  public UserDTO(User user, boolean hasFollowed) {
    this(user.getUsername(), user.getRegisterDate(), hasFollowed);
  }
}

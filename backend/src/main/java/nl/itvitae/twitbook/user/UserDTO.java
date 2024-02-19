package nl.itvitae.twitbook.user;

public record UserDTO(String username) {
  public UserDTO(User user) {
    this(user.getUsername());
  }
}

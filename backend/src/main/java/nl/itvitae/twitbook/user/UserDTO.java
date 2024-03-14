package nl.itvitae.twitbook.user;

import java.time.LocalDateTime;

public record UserDTO(String username, String displayName, LocalDateTime registerDate,
                      boolean hasFollowed, int numberOfFollowers, int numberOfFollowing,
                      String bio) {

  public UserDTO(User user) {
    this(user.getUsername(), user.getDisplayName(), user.getRegisterDate(), false,
        user.getFollowers().size(), user.getFollowing().size(), user.getBio());
  }

  public UserDTO(User user, boolean hasFollowed) {
    this(user.getUsername(), user.getDisplayName(), user.getRegisterDate(), hasFollowed,
        user.getFollowers().size(), user.getFollowing().size(),
        user.getBio());
  }
}

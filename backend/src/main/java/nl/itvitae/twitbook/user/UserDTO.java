package nl.itvitae.twitbook.user;

import java.time.LocalDateTime;
import nl.itvitae.twitbook.image.Image;

public record UserDTO(String username, String displayName, LocalDateTime registerDate,
                      boolean hasFollowed, int numberOfFollowers, int numberOfFollowing,
                      String bio, Image profileImage) {

  public UserDTO(User user) {
    this(user.getUsername(), user.getDisplayName(), user.getRegisterDate(), false,
        user.getFollowers().size(), user.getFollowing().size(), user.getBio(), user.getProfileImage());
  }

  public UserDTO(User user, boolean hasFollowed) {
    this(user.getUsername(), user.getDisplayName(), user.getRegisterDate(), hasFollowed,
        user.getFollowers().size(), user.getFollowing().size(),
        user.getBio(), user.getProfileImage());
  }
}

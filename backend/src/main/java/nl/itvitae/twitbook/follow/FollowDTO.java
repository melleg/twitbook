package nl.itvitae.twitbook.follow;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public record FollowDTO(Long id, String followerUsername, String followingUsername,
                        ZonedDateTime followDate) {

  public FollowDTO(Follow follow) {
    this(follow.getId(), follow.getFollower().getUsername(), follow.getFollowing().getUsername(),
        follow.getDateCreated());
  }
}

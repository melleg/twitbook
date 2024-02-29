package nl.itvitae.twitbook.follow;

import java.time.LocalDateTime;

public record FollowDTO(Long id, String followerUsername, String followingUsername,
                        LocalDateTime followDate) {

  public FollowDTO(Follow follow) {
    this(follow.getId(), follow.getFollower().getUsername(), follow.getFollowing().getUsername(),
        follow.getFollowDate());
  }
}

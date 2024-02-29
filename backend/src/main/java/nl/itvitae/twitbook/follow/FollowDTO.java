package nl.itvitae.twitbook.follow;

import java.time.LocalDateTime;
import java.util.UUID;
import nl.itvitae.twitbook.post.Post;

public record FollowDTO(Long id, String followerUsername, String followingUsername) {
  public FollowDTO(Follow follow) {
    this(follow.getId(), follow.getFollower().getUsername(), follow.getFollowing().getUsername());
  }
}

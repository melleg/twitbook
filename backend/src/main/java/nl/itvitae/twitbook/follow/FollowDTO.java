package nl.itvitae.twitbook.follow;

public record FollowDTO(Long id, String followerUsername, String followingUsername) {
  public FollowDTO(Follow follow) {
    this(follow.getId(), follow.getFollower().getUsername(), follow.getFollowing().getUsername());
  }
}

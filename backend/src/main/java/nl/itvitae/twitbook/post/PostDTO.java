package nl.itvitae.twitbook.post;

import java.time.LocalDateTime;

public record PostDTO(
    Long id,
    String content,
    LocalDateTime postedDate,
    String username,
    int type,
    boolean hasReposted,
    boolean hasLiked
) {
  public PostDTO(Post post, boolean hasLiked, boolean hasReposted) {
    this(
        post.getId(),
        post.getContent(),
        post.getPostedDate(),
        post.getAuthor().getUsername(),
        post.getType().ordinal(),
        hasReposted,
        hasLiked
    );
  }
}

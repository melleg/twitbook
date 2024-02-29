package nl.itvitae.twitbook.post;

import java.time.LocalDateTime;

public record RepostDTO(
    Long id,
    String content,
    LocalDateTime postedDate,
    String username,
    PostDTO linkedPost,
    int type,
    boolean hasLiked,
    boolean hasReposted
) {
  public RepostDTO(Post post, boolean hasLiked, boolean hasReposted) {
    this(
        post.getId(),
        post.getContent(),
        post.getPostedDate(),
        post.getAuthor().getUsername(),
        new PostDTO(post.getLinkedPost(), hasLiked, hasReposted),
        post.getType().ordinal(),
        hasLiked,
        hasReposted
    );
  }
}

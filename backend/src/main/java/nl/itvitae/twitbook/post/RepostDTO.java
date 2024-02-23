package nl.itvitae.twitbook.post;

import java.time.LocalDateTime;

public record RepostDTO(Long id, String content, LocalDateTime postedDate, String username, PostDTO linkedPost) {
  public RepostDTO(Post post) {
    this(post.getId(), post.getContent(), post.getPostedDate(), post.getAuthor().getUsername(), new PostDTO(post.getLinkedPost()));
  }
}

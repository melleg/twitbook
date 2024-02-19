package nl.itvitae.twitbook.post;

import java.time.LocalDateTime;

public record PostDTO(String content, LocalDateTime postedDate, String username) {
  public PostDTO(Post post) {
    this(post.getContent(), post.getPostedDate(), post.getAuthor().getUsername());
  }
}

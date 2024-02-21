package nl.itvitae.twitbook.post;

import java.time.LocalDateTime;

public record PostDTO(Long id, String content, LocalDateTime postedDate, String username, Long likes) {
  public PostDTO(Post post) {
    this(post.getId(), post.getContent(), post.getPostedDate(), post.getAuthor().getUsername(),
        (long) post.getLikeIds().size());
  }
}

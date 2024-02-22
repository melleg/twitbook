package nl.itvitae.twitbook.post;

import java.time.LocalDateTime;

public record PostDTO(Long id, String content, LocalDateTime postedDate, String username,
                      int likes, boolean hasLiked) {

  public PostDTO(Post post, boolean hasLiked) {
    this(post.getId(), post.getContent(), post.getPostedDate(), post.getAuthor().getUsername(),
        post.getLikes().size(), hasLiked);
  }

  public PostDTO(Post post) {
    this(post.getId(), post.getContent(), post.getPostedDate(), post.getAuthor().getUsername(),
        post.getLikes().size(), false);
  }
}

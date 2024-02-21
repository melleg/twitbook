package nl.itvitae.twitbook.post;

import java.time.LocalDateTime;
import java.util.Set;
import nl.itvitae.twitbook.like.Like;
import nl.itvitae.twitbook.like.LikeDTO;

public record PostDTO(Long id, String content, LocalDateTime postedDate, String username, Set<Long> likeIds) {
  public PostDTO(Post post) {
    this(post.getId(), post.getContent(), post.getPostedDate(), post.getAuthor().getUsername(), post.getLikeIds());
  }
}

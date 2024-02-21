package nl.itvitae.twitbook.like;

public record LikeDTO(Long id) {
  public LikeDTO(Like like) {
    this(like.getId());
  }
}
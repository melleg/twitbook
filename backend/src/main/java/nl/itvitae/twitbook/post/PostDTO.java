package nl.itvitae.twitbook.post;

import nl.itvitae.twitbook.image.Image;
import nl.itvitae.twitbook.user.User;

import java.time.LocalDateTime;

public class PostDTO {
  public Long id;
  public String content;
  public LocalDateTime postedDate;
  public String username;
  public String displayName;

  public Image profileImage;
  public int type;
  public long likes;
  public long reposts;
  public long replies;
  public boolean hasLiked;
  public boolean hasReposted;
  public boolean hasReplied;

  public PostDTO(Post post, User userRequesting) {
    Post postInQuestion = (post.getType() == Post.PostType.REPOST) ? post.getLinkedPost() : post;

    this.id = post.getId();
    this.content = post.getContent();
    this.postedDate = post.getPostedDate();
    this.username = post.getPoster().getUsername();
    this.displayName = post.getPoster().getDisplayName();
    this.profileImage = post.getPoster().getProfileImage();
    this.type = post.getType().ordinal();
    this.likes = post.getLikes().size();
    this.reposts = postInQuestion.getLinkedPosts().stream().filter(p -> p.getType().equals(Post.PostType.REPOST)).count();
    this.replies = postInQuestion.getLinkedPosts().stream().filter(p -> p.getType().equals(Post.PostType.REPLY)).count();
    if(userRequesting != null) {
      this.hasLiked = postInQuestion.getLikes().stream().anyMatch(l -> l.getUser().getId().equals(userRequesting.getId()));
      this.hasReposted = postInQuestion.getLinkedPosts().stream().anyMatch(p -> p.getType().equals(Post.PostType.REPOST) && p.getPoster().getId().equals(userRequesting.getId()));
      this.hasReplied = postInQuestion.getLinkedPosts().stream().anyMatch(p -> p.getType().equals(Post.PostType.REPLY) && p.getPoster().getId().equals(userRequesting.getId()));
    }
  }
}

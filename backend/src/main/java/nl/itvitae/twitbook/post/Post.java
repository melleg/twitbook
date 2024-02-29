package nl.itvitae.twitbook.post;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import nl.itvitae.twitbook.user.User;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String content;

  private LocalDateTime postedDate;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE) // If user is removed, this post is removed. Or it's empty...?
  private User author;

  // Enum property
  @Enumerated(EnumType.ORDINAL)
  private PostType type;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.SET_NULL) // If linkedPost is deleted, set this property to null
  private Post linkedPost;

  public Post(String content, User author) {
    this.content = content;
    this.author = author;
    postedDate = LocalDateTime.now();
    this.type = PostType.POST;
  }

  public Post(String content, User author, Post linkedPost) {
    this(content, author);
    this.linkedPost = linkedPost;
    this.type = (content == null || content.isBlank()) ? PostType.REPOST : PostType.REPLY;
  }

  public enum PostType {
    POST,
    REPOST,
    REPLY,
  }
}

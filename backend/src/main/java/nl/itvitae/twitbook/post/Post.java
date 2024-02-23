package nl.itvitae.twitbook.post;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import nl.itvitae.twitbook.user.User;

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
  private User author;

  @ManyToOne
  private Post linkedPost;

  public Post(String content, User author) {
    this.content = content;
    this.author = author;
    postedDate = LocalDateTime.now();
  }

  public Post(String content, User author, Post linkedPost) {
    this(content, author);
    this.linkedPost = linkedPost;
  }
}

package nl.itvitae.twitbook.post;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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

  private User author;

  public Post(PostModel model, User author) {
    this.content = model.content();
    this.author = author;
  }

  public Post(String content, User author) {
    this.content = content;
    this.author = author;
  }
}

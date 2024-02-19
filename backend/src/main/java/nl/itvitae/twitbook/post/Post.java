package nl.itvitae.twitbook.post;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.ManyToMany;
import java.time.LocalDateTime;

import java.util.HashSet;
import java.util.Set;
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

  @ManyToMany
  private Set<User> likedBy = new HashSet<>();

  public Post(PostModel model, User author) {
    this.content = model.content();
    this.author = author;
    postedDate = LocalDateTime.now();
  }

  public Post(String content, User author) {
    this.content = content;
    this.author = author;
    postedDate = LocalDateTime.now();
  }

  public void addLikedBy(User user){
    this.likedBy.add(user);
    System.out.println("liked users = " + this.likedBy.size());
  }
}

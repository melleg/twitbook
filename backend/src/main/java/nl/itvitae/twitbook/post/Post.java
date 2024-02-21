package nl.itvitae.twitbook.post;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import nl.itvitae.twitbook.like.Like;
import nl.itvitae.twitbook.like.LikeDTO;
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

  @OneToMany(mappedBy = "post")
  private Set<Like> likes = new HashSet<>();

  public Set<Long> getLikeIds(){
    return likes.stream().map(Like::getId).collect(Collectors.toSet());
  }
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
}

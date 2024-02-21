package nl.itvitae.twitbook.like;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nl.itvitae.twitbook.post.Post;
import nl.itvitae.twitbook.user.User;

@Entity
@Table(name = "`like`")
@NoArgsConstructor
@Getter
public class Like {
  @Id
  @GeneratedValue
  private Long id;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "post_id", referencedColumnName = "id")
  private Post post;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  public Like(Post post, User user) {
    this.post = post;
    this.user = user;
  }
}

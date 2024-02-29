package nl.itvitae.twitbook.follow;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nl.itvitae.twitbook.user.User;

@Entity
@Table(name = "follow")
@NoArgsConstructor
@Getter
public class Follow {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "follower_id", referencedColumnName = "id")
  private User follower;

  @ManyToOne
  @JoinColumn(name = "following_id", referencedColumnName = "id")
  private User following;

  public Follow(User follower, User following) {
    this.follower = follower;
    this.following = following;
  }
}
package nl.itvitae.twitbook.follow;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nl.itvitae.twitbook.user.User;

@Entity
@Table(name = "follows")
@NoArgsConstructor
@Getter
public class Follow {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private User follower;

  @ManyToOne
  private User following;

  private ZonedDateTime dateCreated;

  public Follow(User follower, User following) {
    this.follower = follower;
    this.following = following;
    dateCreated = ZonedDateTime.now();
  }
}
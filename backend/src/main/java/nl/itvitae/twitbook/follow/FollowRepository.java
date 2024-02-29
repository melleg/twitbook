package nl.itvitae.twitbook.follow;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {

  boolean existsFollowByFollowerUsernameAndFollowingUsername(String followerUsername,
      String followingUsername);

}

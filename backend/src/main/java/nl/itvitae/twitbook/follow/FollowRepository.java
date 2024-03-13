package nl.itvitae.twitbook.follow;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {

  Optional<Follow> findFollowByFollowerIdAndFollowingId(UUID followerId, UUID followingId);

  boolean existsFollowByFollowerIdAndFollowingId(UUID followerId, UUID followingId);

  List<Follow> findAllByFollowerId(UUID id);
}

package nl.itvitae.twitbook.user;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByUsernameIgnoreCase(String username);
  Page<User> findByDisplayNameContainingIgnoreCase(String username, Pageable pageable);

  Page<User> findByFollowing_Following_UsernameIgnoreCase(String username, Pageable pageable);

  Page<User> findByFollowers_Follower_UsernameIgnoreCase(String username, Pageable pageable);

  boolean existsByUsernameIgnoreCase(String username);
}

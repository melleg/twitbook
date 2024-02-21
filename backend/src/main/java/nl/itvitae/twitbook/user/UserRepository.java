package nl.itvitae.twitbook.user;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {
    public Optional<User> findByUsernameIgnoreCase(String username);
}

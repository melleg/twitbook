package nl.itvitae.twitbook.post;

import nl.itvitae.twitbook.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    public List<Post> findByAuthor(User user);
}

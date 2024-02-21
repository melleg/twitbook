package nl.itvitae.twitbook.post;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    public List<Post> findByAuthor_UsernameIgnoreCase(String username);
}

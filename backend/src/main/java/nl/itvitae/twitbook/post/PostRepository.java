package nl.itvitae.twitbook.post;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthor_UsernameIgnoreCase(String username);
    Optional<Post> findByTypeAndLinkedPostAndAuthor_UsernameIgnoreCase(Post.PostType postType, Post linkedPost, String username);
}

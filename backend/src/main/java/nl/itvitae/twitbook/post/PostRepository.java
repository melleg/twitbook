package nl.itvitae.twitbook.post;

import nl.itvitae.twitbook.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthor_UsernameIgnoreCase(String username);

    List<Post> findByAuthor_UsernameIgnoreCase(String username, Pageable pageable);
    Optional<Post> findByTypeAndLinkedPostAndAuthor_UsernameIgnoreCase(Post.PostType postType, Post linkedPost, String username);
    boolean existsByTypeAndLinkedPostAndAuthor(Post.PostType postType, Post linkedPost, User user);
}

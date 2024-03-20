package nl.itvitae.twitbook.post;

import nl.itvitae.twitbook.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByPoster_UsernameIgnoreCase(String username);
    Optional<Post> findByTypeAndLinkedPostAndPoster_UsernameIgnoreCase(Post.PostType postType, Post linkedPost, String username);
    boolean existsByTypeAndLinkedPostAndPoster(Post.PostType postType, Post linkedPost, User user);
}

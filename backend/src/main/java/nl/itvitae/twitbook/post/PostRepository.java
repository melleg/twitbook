package nl.itvitae.twitbook.post;

import nl.itvitae.twitbook.hashtag.Hashtag;
import nl.itvitae.twitbook.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByPoster_UsernameIgnoreCase(String username);
    Page<Post> findByLinkedPost_Id(Long id, Pageable pageable);
    Page<Post> findByHashtagsContaining(Hashtag hashtag, Pageable pageable);
    Page<Post> findByPoster_UsernameIgnoreCase(String username, Pageable pageable);
    Page<Post> findByPoster_Followers_Follower_UsernameIgnoreCase(String username, Pageable pageable);
    Optional<Post> findByTypeAndLinkedPostAndPoster_UsernameIgnoreCase(Post.PostType postType, Post linkedPost, String username);
    boolean existsByTypeAndLinkedPostAndPoster(Post.PostType postType, Post linkedPost, User user);
}

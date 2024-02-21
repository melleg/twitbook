package nl.itvitae.twitbook.like;

import nl.itvitae.twitbook.post.Post;
import nl.itvitae.twitbook.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository  extends JpaRepository<Like, Long> {

  boolean existsLikeByUserAndPost(User user, Post post);
  Like findLikeByUserAndPost(User user, Post post);

}

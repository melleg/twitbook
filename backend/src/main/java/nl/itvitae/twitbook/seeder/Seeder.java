package nl.itvitae.twitbook.seeder;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.follow.Follow;
import nl.itvitae.twitbook.follow.FollowRepository;
import nl.itvitae.twitbook.like.Like;
import nl.itvitae.twitbook.like.LikeRepository;
import nl.itvitae.twitbook.post.Post;
import nl.itvitae.twitbook.post.PostRepository;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.User.Role;
import nl.itvitae.twitbook.user.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class Seeder implements CommandLineRunner {
  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final FollowRepository followRepository;
  private final LikeRepository likeRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) {
    User melle = saveUser("Melle", "Password", Role.ROLE_ADMIN);
    User raafi = saveUser("Raafi", "Password", Role.ROLE_ADMIN);
    User nol = saveUser("Nol", "Password", Role.ROLE_ADMIN);
    User sjaakie = saveUser("sjaakie", "Password", Role.ROLE_USER);

    var post1 = savePost("Bingleblong", nol);
    savePost("Melle en Raafi zijn chads", sjaakie);
    savePost("this post should be deleted", melle);
    savePost("this is a post", raafi);

    followUser(sjaakie, nol);
    followUser(sjaakie, raafi);
    
    likePost(post1, melle);
  }

  private Post savePost(String content, User author) {
    return postRepository.save(new Post(content, author));
  }

  private User saveUser(String username, String password, Role... roles) {
    return userRepository.save(new User(username, passwordEncoder.encode(password), roles));
  }

  private Follow followUser(User follower, User following) {
    return followRepository.save(new Follow(follower, following));
  }
  
  private Like likePost(Post post, User user) {
    return likeRepository.save(new Like(post, user));
  }
}

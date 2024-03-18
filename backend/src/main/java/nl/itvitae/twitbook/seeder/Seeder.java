package nl.itvitae.twitbook.seeder;

import java.util.List;
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

  private static final String[] CONTENT = {
      "TAke a look, y'all: IMG_4346.jpeg", "Xenoblade",
      "New rule: never trust how you feel about your life past 9pm",
      "░L░I░N░K ░I░N ░B░I░O", "This website is so much better than the other bird site", """
        Wow i really need to study
        *distraction*
        *distraction*
        *distraction*
        *distraction*
        *distraction*
        Dude i really need to study rn
        *distraction*
        *distraction*
        *distraction*
        *distraction*
        *distraction*
        Haha omg i reaaally need to st-""", "twitbook is love, twitbook is life", "gameing",
      "me when the", "banaan", "fun", "wow", "concerning", "interesting", "looking into this",
      "I'm running out of unique tweets"
  };

  @Override
  public void run(String... args) {
    User melle = saveUser("Melle", "Password", Role.ROLE_ADMIN);
    User raafi = saveUser("Raafi", "Password", Role.ROLE_ADMIN);
    User nol = saveUser("Nol", "Password", Role.ROLE_ADMIN);
    User sjaakie = saveUser("sjaakie", "Password", Role.ROLE_USER);

    Post post1 = savePost("Bingleblong", nol);
    Post post2 = savePost("Melle en Raafi zijn chads", sjaakie);

    final int postsPerUser = 6;
    for (int i = 0; i < postsPerUser; i++) {
      postRepository.saveAll(List.of(
          new Post(randomContent(), melle),
          new Post(randomContent(), raafi),
          new Post(randomContent(), nol),
          new Post(randomContent(), sjaakie)
      ));
    }

    Post reply = saveRepost("Mee eens", nol, post2);

    Post repost = saveRepost("", sjaakie, post1);

    followUser(sjaakie, nol);
    followUser(sjaakie, raafi);

    likePost(post1, melle);
  }

  private static String randomContent() {
    return CONTENT[(int) (Math.random() * CONTENT.length)];
  }

  private Post savePost(String content, User author) {
    return postRepository.save(new Post(content, author));
  }

  private Post saveRepost(String content, User author, Post linkedPost) {
    Post post = new Post(content, author, linkedPost);
    return postRepository.save(post);
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

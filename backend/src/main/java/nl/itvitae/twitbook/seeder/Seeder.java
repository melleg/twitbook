package nl.itvitae.twitbook.seeder;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.like.Like;
import nl.itvitae.twitbook.like.LikeRepository;
import nl.itvitae.twitbook.post.Post;
import nl.itvitae.twitbook.post.PostService;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.User.Role;
import nl.itvitae.twitbook.user.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class Seeder implements CommandLineRunner {
  private final PostService postService;
  private final UserRepository userRepository;
  private final LikeRepository likeRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) {
    User melle = saveUser("Melle", "Password", Role.ROLE_ADMIN);
    User raafi = saveUser("Raafi", "Password", Role.ROLE_ADMIN);
    User nol = saveUser("Nol", "Password", Role.ROLE_ADMIN);
    User sjaakie = saveUser("sjaakie", "Password", Role.ROLE_USER);

    Post post1 = savePost("Bingleblong", nol);
    Post post2 = savePost("Melle en Raafi zijn chads", sjaakie);

    Post repost = saveRepost(sjaakie, post1);
    Post reply = saveReply("Mee eens", nol, post2);

    likePost(post1, melle);
  }

  private Post savePost(String content, User author) {
    return postService.addPost(content, author);
  }

  private Post saveRepost(User author, Post linkedPost) {
    return postService.addRepost(author, linkedPost);
  }

  private Post saveReply(String content, User author, Post linkedPost) {
    return postService.addReply(content, author, linkedPost);
  }

  private User saveUser(String username, String password, Role... roles) {
    User user = new User(username, passwordEncoder.encode(password), roles);
    userRepository.save(user);
    return user;
  }

  private void likePost(Post post, User user) {
    likeRepository.save(new Like(post, user));
  }
}

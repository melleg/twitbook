package nl.itvitae.twitbook.seeder;

import lombok.AllArgsConstructor;

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
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) {
    User melle = saveUser("Melle", "Password", Role.ROLE_ADMIN);
    User raafi = saveUser("Raafi", "Password", Role.ROLE_ADMIN);
    User nol = saveUser("Nol", "Password", Role.ROLE_ADMIN);
    User sjaakie = saveUser("sjaakie", "Password", Role.ROLE_USER);

    Post post1 = savePost("Bingleblong", nol);
    Post post2 = savePost("Melle en Raafi zijn chads", sjaakie);
    Post post3 = saveRepost("Mee eens", nol, post2);
  }

  private Post savePost(String content, User author) {
    Post post = new Post(content, author);
    return postRepository.save(post);
  }

  private Post saveRepost(String content, User author, Post linkedPost) {
    Post post = new Post(content, author, linkedPost);
    return postRepository.save(post);
  }

  private User saveUser(String username, String password, Role... roles) {
    User user = new User(username, passwordEncoder.encode(password), roles);
    userRepository.save(user);
    return user;
  }
}

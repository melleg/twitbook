package nl.itvitae.twitbook.seeder;

import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.post.Post;
import nl.itvitae.twitbook.post.PostRepository;
import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.User.Role;
import nl.itvitae.twitbook.user.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class Seeder implements CommandLineRunner {
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  @Override
  public void run(String... args) {
    User melle = saveUser("Melle", "Password", Role.ROLE_ADMIN);
    User raafi = saveUser("Raafi", "Password", Role.ROLE_ADMIN);
    User nol = saveUser("Nol", "Password", Role.ROLE_ADMIN);
    User sjaakie = saveUser("sjaakie", "Password", Role.ROLE_USER);

    savePost("Bingleblong", nol);
    savePost("Melle en Raafi zijn chads", sjaakie);
  }

  private Post savePost(String content, User author) {
    Post post = new Post(content, author);
    postRepository.save(post);
    return post;
  }

  private User saveUser(String username, String password, Role... roles) {
    User user = new User(username, password, roles);
    userRepository.save(user);
    return user;
  }
}

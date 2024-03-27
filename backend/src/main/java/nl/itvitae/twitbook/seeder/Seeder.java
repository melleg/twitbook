package nl.itvitae.twitbook.seeder;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;

import nl.itvitae.twitbook.follow.Follow;
import nl.itvitae.twitbook.follow.FollowRepository;
import nl.itvitae.twitbook.image.Image;
import nl.itvitae.twitbook.image.ImageRepository;
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
  private final FollowRepository followRepository;
  private final LikeRepository likeRepository;
  private final PasswordEncoder passwordEncoder;
  private final ImageRepository imageRepository;

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
      "me when the", "banaan", "fun", "amogus", "when the imposter is sus", "ඞ", "emotional damage",
      "Why do they call it oven when you of in the cold food of out hot eat the food",
      "I'm running out of unique tweets",
      "Flamingos can juggle fireballs. #BirdFacts",
      "Sparrows host underground dance battles. #BirdFacts",
      "Pigeons are expert chess players. #BirdFacts",
      "Owls run secret libraries in the woods. #BirdFacts",
      "Seagulls attend clown school on weekends. #BirdFacts",
      "Robins moonlight as stand-up comedians. #BirdFacts",
      "Pelicans are certified scuba divers. #BirdFacts",
      "Crows practice parkour in their spare time. #BirdFacts",
      "Hummingbirds invented breakdancing. #BirdFacts",
      "Eagles coach the national soccer team. #BirdFacts",
      "Woodpeckers hold drumming concerts at dawn. #BirdFacts",
      "Ducks lead underwater treasure expeditions. #BirdFacts",
      "Geese run a gourmet bakery in the countryside. #BirdFacts",
      "Parrots are fluent in seven languages. #BirdFacts",
      "Swans moonlight as ballerinas. #BirdFacts",
      "Toucans solve complex math equations. #BirdFacts",
      "Penguins are expert chefs specializing in sushi. #BirdFacts",
      "Roadrunners are professional race car drivers. #BirdFacts",
      "Emus are master architects building skyscrapers. #BirdFacts",
      "Condors are world-class skydivers. #BirdFacts"
  };

  private static final String[] REPLIES = {
      "Hard pass",
      "Big if true",
      "Kind of agree but not really",
      "Makes me #think",
      "What happened to being a gentleman?",
      "wow",
      "concerning",
      "interesting",
      "looking into this",
      "skill issue",
      "\uD83E\uDD13" //nerd emoji
  };

  @Override
  public void run(String... args) throws Exception {

    User melle = saveUser("Melle", "Password", Role.ROLE_ADMIN);
    User raafi = saveUser("Raafi", "BIGXENOBLADEFAN3000", "Password", saveImage("raafi_pfp.jpg"), Role.ROLE_ADMIN);
    User nol = saveUser("Nol", "Go10", "Password", saveImage("nol_pfp.jpg"), Role.ROLE_ADMIN);
    User sjaakie = saveUser("sjaakie", "Password", saveImage("trollface.jpg"), Role.ROLE_USER);

    Post post1 = savePost("#Bingleblong", nol);
    Post post2 = savePost("Melle en Raafi zijn #chads #winning", sjaakie);

    List<Post> newPosts = new ArrayList<>();

    // Create random posts and replies
    int numPosts = 500;
    for (int i = 0; i < numPosts; i++) {
      if (newPosts.isEmpty() || Math.random() > 0.7) {
        newPosts.add(postService.addPost(randomContent(), randomUser(melle, raafi, nol, sjaakie)));
      } else {
        Post randomPost = newPosts.get((int) (Math.random() * newPosts.size()));
        postService.addReply(randomReply(), randomUser(melle, raafi, nol, sjaakie), randomPost);
      }
    }

    Post repost = saveRepost(sjaakie, post1);
    Post reply = saveReply("Mee eens", nol, post2);

    followUser(sjaakie, nol);
    followUser(sjaakie, raafi);

    likePost(post1, melle);
  }

  private static String randomContent() {
    return CONTENT[(int) (Math.random() * CONTENT.length)];
  }

  private static String randomReply() {
    return REPLIES[(int) (Math.random() * REPLIES.length)];
  }

  private static User randomUser(User... users) {
    return users[(int) (Math.random() * users.length)];
  }

  private Post savePost(String content, User poster) {
    return postService.addPost(content, poster);
  }

  private Post saveRepost(User poster, Post linkedPost) {
    return postService.addRepost(poster, linkedPost);
  }

  private Post saveReply(String content, User poster, Post linkedPost) {
    return postService.addReply(content, poster, linkedPost);
  }

  private User saveUser(String username, String password, Role... roles) {
    return userRepository.save(new User(username, passwordEncoder.encode(password), roles));
  }

  private User saveUser(String username, String password, Image profileImage, Role... roles) {
    return userRepository.save(
        new User(username, passwordEncoder.encode(password), profileImage, roles));
  }

  private User saveUser(String username, String displayName, String password, Image profileImage, Role... roles) {
    return userRepository.save(
        new User(username,displayName, passwordEncoder.encode(password), profileImage, roles));
  }

  private Follow followUser(User follower, User following) {
    return followRepository.save(new Follow(follower, following));
  }

  private Like likePost(Post post, User user) {
    return likeRepository.save(new Like(post, user));
  }

  private Image saveImage(String filename) throws Exception {
    Image image = new Image();
    image.setFilename(filename);
    image.setMimeType("image/jpeg");
    image.setData(Files.readAllBytes(Paths.get("src/main/resources/images/" + filename)));
    return imageRepository.save(image);
  }
}

package nl.itvitae.twitbook.hashtag;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.AllArgsConstructor;
import nl.itvitae.twitbook.post.Post;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class HashtagService {
  private final HashtagRepository hashtagRepository;

  public Optional<Hashtag> findHashtagByText(String text) {
    return hashtagRepository.findHashtagByText(text);
  }

  public void createHashtags(Post post) {
    Pattern pattern = Pattern.compile("\\B#(\\w|#)+\\b");
    Matcher matcher = pattern.matcher(post.getContent());

    while (matcher.find()) {
      String group = matcher.group();

      // Find the hashtag
      Hashtag hashtag = hashtagRepository.findHashtagByText(group)
          .orElse(hashtagRepository.save(new Hashtag(group)));

      System.out.println("Found/created hashTag: " + hashtag.getText());
    }
  }
}
package nl.itvitae.twitbook.hashtag;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
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
    return hashtagRepository.findHashtagByTextIgnoreCase(text);
  }

  public void createHashtags(Post post) {
    Pattern pattern = Pattern.compile("(#(\\w)+)");
    Matcher matcher = pattern.matcher(post.getContent());

    Set<Hashtag> hashtags = new HashSet<>();

    while (matcher.find()) {
      String group = matcher.group();

      // Find the hashtag
      Hashtag hashtag = findHashtagByText(group)
          .orElse(hashtagRepository.save(new Hashtag(group)));

      hashtags.add(hashtag);

      System.out.println("Found/created hashTag: " + hashtag.getText());
    }

    post.setHashtags(hashtags);
  }
}
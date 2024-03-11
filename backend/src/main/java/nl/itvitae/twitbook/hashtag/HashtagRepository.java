package nl.itvitae.twitbook.hashtag;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface HashtagRepository  extends JpaRepository<Hashtag, String> {
  Optional<Hashtag> findHashtagByText(String text);
}

package nl.itvitae.twitbook.image;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
  Optional<Image> findByFilename(String filename);

  boolean existsByFilename(String filename);
}

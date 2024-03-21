package nl.itvitae.twitbook.image;

import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class ImageService {

  private final ImageRepository imageRepository;

  public Image uploadImage(MultipartFile file) throws Exception {
    if (imageRepository.existsByFilename(file.getOriginalFilename())) {
      return null;
    }
    var image = Image.builder()
        .filename(file.getOriginalFilename())
        .mimeType(file.getContentType())
        .data(file.getBytes())
        .build();
    return image;
  }

  public Optional<Image> getByFilename(String filename) {
    return imageRepository.findByFilename(filename);
  }
}

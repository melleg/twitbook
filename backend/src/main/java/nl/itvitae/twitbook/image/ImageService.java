package nl.itvitae.twitbook.image;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class ImageService {

  private final ImageRepository imageRepository;

  public Image uploadImage(MultipartFile file) {
    var sdf = new SimpleDateFormat("ddMMyy-hhmmss-SSS");

    try {
      var image = Image.builder()
          .filename(String.format("%s.%s", sdf.format(new Date()),
              file.getContentType().substring(file.getContentType().lastIndexOf('/') + 1)))
          .mimeType(file.getContentType())
          .data(file.getBytes())
          .build();
      return imageRepository.save(image);
    } catch (IOException e) {
      return null;
    }
  }

  public Optional<Image> getByFilename(String filename) {
    return imageRepository.findByFilename(filename);
  }

  public void deleteImage(Image image) {
    imageRepository.delete(image);
  }
}

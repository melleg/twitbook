package nl.itvitae.twitbook.image;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import lombok.AllArgsConstructor;
import nl.itvitae.twitbook.user.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class ImageService {

  private final ImageRepository imageRepository;

  public Image uploadImage(MultipartFile file) throws Exception {
    var sdf = new SimpleDateFormat("ddMMyy-hhmmss-SSS");

    var image = Image.builder()
        .filename(sdf.format(new Date()) + ".jpg")
        .mimeType(file.getContentType())
        .data(file.getBytes())
        .build();
    return imageRepository.save(image);
  }

  public Optional<Image> getByFilename(String filename) {
    return imageRepository.findByFilename(filename);
  }

  public void deleteImage(Image image){
    imageRepository.delete(image);
  }
}

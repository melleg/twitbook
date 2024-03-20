package nl.itvitae.twitbook.image;

import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/images")
public class ImageController {
  private final ImageRepository imageRepository;

  @GetMapping("{filename}")
  public ResponseEntity<Resource> getImage(@PathVariable String filename) {
    Image image = imageRepository.findByFilename(filename).get();
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, image.getMimeType()).body(new ByteArrayResource(image.getData()));
  }
}

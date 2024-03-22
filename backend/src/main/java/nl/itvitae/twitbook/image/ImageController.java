package nl.itvitae.twitbook.image;

import java.util.Optional;
import lombok.AllArgsConstructor;
import nl.itvitae.twitbook.user.UserRepository;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("api/v1/images")
public class ImageController {

  private final UserRepository userRepository;
  private final ImageService imageService;

  @GetMapping("{filename}")
  public ResponseEntity<Resource> getByFilename(@PathVariable String filename) {
    Optional<Image> optionalImage = imageService.getByFilename(filename);
    if (optionalImage.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, optionalImage.get().getMimeType())
        .body(new ByteArrayResource(optionalImage.get().getData()));
  }

  @GetMapping("u/{username}")
  public ResponseEntity<Image> getProfileImageByUsername(@PathVariable String username) {
    return ResponseEntity.ok(userRepository.findByUsernameIgnoreCase(username).get()
        .getProfileImage());
  }

  @PostMapping
  public ResponseEntity<?> uploadImage(@RequestPart MultipartFile file, UriComponentsBuilder uriBuilder) throws Exception {
    var image = imageService.uploadImage(file);

    var uri = uriBuilder.path("api/v1/images/{filename}")
        .buildAndExpand(image.getFilename())
        .toUri();
    return ResponseEntity.created(uri).body(image.getFilename());
  }
}

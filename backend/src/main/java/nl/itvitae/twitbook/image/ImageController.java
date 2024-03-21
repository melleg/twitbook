package nl.itvitae.twitbook.image;

import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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

  private final ImageRepository imageRepository;

  @GetMapping("{filename}")
  public ResponseEntity<Resource> getImage(@PathVariable String filename) {
    Image image = imageRepository.findByFilename(filename).get();
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, image.getMimeType())
        .body(new ByteArrayResource(image.getData()));
  }

  @PostMapping("upload")
  public ResponseEntity<?> uploadImage(@RequestPart MultipartFile file, UriComponentsBuilder uriBuilder) throws Exception {
    if (imageRepository.existsByFilename(file.getOriginalFilename())) {
      return new ResponseEntity<>(null, HttpStatus.CONFLICT);
    }
    var image = Image.builder()
        .filename(file.getOriginalFilename())
        .mimeType(file.getContentType())
        .data(file.getBytes())
        .build();

    var uri = uriBuilder.path("api/v1/images/{filename}")
        .buildAndExpand(image.getFilename())
        .toUri();
    return ResponseEntity.created(uri).body(imageRepository.save(image).getFilename());
  }
}

package nl.itvitae.twitbook.image;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String filename;

  @Column(name = "mime_type")
  private String mimeType;

  private byte[] data;

  public Image(String filename, String mimeType, byte[] data) {
    this.filename = filename;
    this.mimeType = mimeType;
    this.data = data;
  }
}

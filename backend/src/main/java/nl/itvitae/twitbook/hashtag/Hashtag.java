package nl.itvitae.twitbook.hashtag;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hashtag")
@NoArgsConstructor
@Getter
public class Hashtag {
  @Id
  private String text;

  public Hashtag(String text) {
    this.text = text.startsWith("#") ? text.substring(1) : text;
  }
}

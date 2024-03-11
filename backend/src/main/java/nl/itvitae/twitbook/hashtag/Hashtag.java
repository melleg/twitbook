package nl.itvitae.twitbook.hashtag;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;

import nl.itvitae.twitbook.post.Post;
import nl.itvitae.twitbook.user.User;

@Entity
@Table(name = "hashtag")
@NoArgsConstructor
@Getter
public class Hashtag {
  @Id
  private String text;

  public Hashtag(String text) {
    this.text = text;
  }
}

package nl.itvitae.twitbook.post;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import nl.itvitae.twitbook.like.Like;
import nl.itvitae.twitbook.user.User;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String content;

  private LocalDateTime postedDate;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE) // If user is removed, this post is removed. Or it's empty...?
  private User author;

  @OneToMany(mappedBy = "post", orphanRemoval = true)
  private Set<Like> likes = new HashSet<>();

  @Enumerated(EnumType.ORDINAL)
  private PostType type;

  @OneToMany(mappedBy = "linkedPost", orphanRemoval = true)
  private Set<Post> linkedPosts = new HashSet<>();

  @ManyToOne
  @OnDelete(action = OnDeleteAction.SET_NULL) // If linkedPost is deleted, set this property to null
  private Post linkedPost;

  public Post(PostModel model, User author) {
    this(model.content(), author);
  }

  public Post(String content, User author) {
    this.content = content;
    this.author = author;
    postedDate = LocalDateTime.now();
    this.type = PostType.POST;
  }

  public Post(String content, User author, Post linkedPost) {
    this(content, author);
    this.linkedPost = linkedPost;
    this.type = (content == null || content.isBlank()) ? PostType.REPOST : PostType.REPLY;
  }

  public enum PostType {
    POST,
    REPOST,
    REPLY,
  }
}

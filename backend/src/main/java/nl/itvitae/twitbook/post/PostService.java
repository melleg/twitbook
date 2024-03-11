package nl.itvitae.twitbook.post;

import nl.itvitae.twitbook.hashtag.HashtagRepository;
import nl.itvitae.twitbook.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PostService {
  @Autowired
  PostRepository postRepository;
  @Autowired
  HashtagRepository hashtagRepository;

  // Save regular post
  public Post addPost(PostModel model, User author) {
    Post post = constructPost(model.content(), author);
    return postRepository.save(post);
  }

  // Save re-post or reply
  public Post addPost(String content, User author, Post linkedPost) {
    Post post = constructPost(content, author);
    post.setLinkedPost(linkedPost);
    post.setType((content == null || content.isBlank()) ? Post.PostType.REPOST : Post.PostType.REPLY);
    return postRepository.save(post);
  }

  // Internal post constructor
  private Post constructPost(String content, User author) {
    Post post = new Post();
    post.setContent(content);
    post.setAuthor(author);
    post.setPostedDate(LocalDateTime.now());
    post.setType(Post.PostType.POST);
    return post;
  }
}

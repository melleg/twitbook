package nl.itvitae.twitbook.post;

import lombok.AllArgsConstructor;
import nl.itvitae.twitbook.hashtag.HashtagService;
import nl.itvitae.twitbook.user.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
  private final PostRepository postRepository;
  private final HashtagService hashtagService;

  public List<Post> findAll() {
    return postRepository.findAll();
  }

  public Optional<Post> findById(Long id) {
    return postRepository.findById(id);
  }

  public Optional<Post> findByTypeAndLinkedPostAndAuthor_UsernameIgnoreCase(Post.PostType postType, Post linkedPost, String username) {
    return postRepository.findByTypeAndLinkedPostAndAuthor_UsernameIgnoreCase(postType, linkedPost, username);
  }

  public List<Post> findByAuthor_UsernameIgnoreCase(String username) {
    return postRepository.findByAuthor_UsernameIgnoreCase(username);
  }

  // Save regular post
  public Post addPost(String content, User author) {
    Post post = new Post(content, author);
    post.setType(Post.PostType.POST);
    hashtagService.createHashtags(post); // add hashtags
    return postRepository.save(post);
  }

  // Save reply
  public Post addReply(String content, User author, Post linkedPost) {
    Post post = new Post(content, author);
    post.setLinkedPost(linkedPost);
    post.setType(Post.PostType.REPLY);
    hashtagService.createHashtags(post); // add hashtags
    return postRepository.save(post);
  }

  // Save re-post
  public Post addRepost(User author, Post linkedPost) {
    Post post = new Post("", author);
    post.setLinkedPost(linkedPost);
    post.setType(Post.PostType.REPOST);
    return postRepository.save(post);
  }


  // Delete post
  public void deletePost(Post post) {
    postRepository.delete(post);
  }
}

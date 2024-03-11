package nl.itvitae.twitbook.post;

import nl.itvitae.twitbook.hashtag.HashtagRepository;
import nl.itvitae.twitbook.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
  @Autowired
  PostRepository postRepository;
  @Autowired
  HashtagRepository hashtagRepository;

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
    Post post = constructPost(content, author);
    post.setType(Post.PostType.POST);
    return postRepository.save(post);
  }

  // Save re-post
  public Post addRepost(User author, Post linkedPost) {
    Post post = constructPost("", author);
    post.setLinkedPost(linkedPost);
    post.setType(Post.PostType.REPOST);
    return postRepository.save(post);
  }

  // Save reply
  public Post addReply(String content, User author, Post linkedPost) {
    Post post = constructPost(content, author);
    post.setLinkedPost(linkedPost);
    post.setType(Post.PostType.REPLY);
    return postRepository.save(post);
  }

  // Internal post constructor
  private Post constructPost(String content, User author) {
    Post post = new Post();
    post.setContent(content);
    post.setAuthor(author);
    post.setPostedDate(LocalDateTime.now());
    return post;
  }

  // Delete post
  public void deletePost(Post post) {
    postRepository.delete(post);
  }
}

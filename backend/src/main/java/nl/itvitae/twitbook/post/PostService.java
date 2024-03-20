package nl.itvitae.twitbook.post;

import lombok.AllArgsConstructor;
import nl.itvitae.twitbook.hashtag.Hashtag;
import nl.itvitae.twitbook.hashtag.HashtagService;
import nl.itvitae.twitbook.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
  private final PostRepository postRepository;
  private final HashtagService hashtagService;

  public Page<Post> findAll(Pageable pageable) {
    return postRepository.findAll(pageable);
  }

  public Page<Post> findByHashtag(Hashtag hashtag, Pageable pageable) { return postRepository.findByHashtagsContaining(hashtag, pageable); }

  public Optional<Post> findById(Long id) {
    return postRepository.findById(id);
  }

  public Optional<Post> findByTypeAndLinkedPostAndUsername(Post.PostType postType, Post linkedPost, String username) {
    return postRepository.findByTypeAndLinkedPostAndAuthor_UsernameIgnoreCase(postType, linkedPost, username);
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

  public Page<Post> getByAuthor(String username, Pageable pageable){
    return postRepository.findByAuthor_UsernameIgnoreCase(username,
        pageable);
  }

  public Page<Post> getByFollowing(String username, Pageable pageable){
    return postRepository.findByAuthor_Followers_Follower_UsernameIgnoreCase(username,
        pageable);
  }
}

package nl.itvitae.twitbook.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.ManyToMany;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import nl.itvitae.twitbook.post.Post;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "`users`")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String username;

  private String password;

  private Role[] roles;

  @ManyToMany
  private Set<Post> likedPosts = new HashSet<>();

  public User(String username, String password, Role... roles) {
    this.username = username;
    this.password = password;
    this.roles = roles;
  }

  public void addLikedPost(Post newLikedPost){
    this.likedPosts.add(newLikedPost);
    System.out.println("liked posts = " + this.likedPosts.size());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Arrays.stream(roles).map(Role::toAuthority).toList();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public enum Role {
    ROLE_USER,
    ROLE_ADMIN;
    public GrantedAuthority toAuthority() {
      return new SimpleGrantedAuthority(toString());
    }
  }
}

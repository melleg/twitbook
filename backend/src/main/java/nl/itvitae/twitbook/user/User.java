package nl.itvitae.twitbook.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import nl.itvitae.twitbook.follow.Follow;
import nl.itvitae.twitbook.image.Image;

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

  private String bio;

  private String displayName;

  private Role[] roles;

  private LocalDateTime registerDate;

  @OneToOne
  private Image profileImage;

  @OneToMany(mappedBy = "follower")
  private Set<Follow> following = new HashSet<>();

  @OneToMany(mappedBy = "following")
  private Set<Follow> followers = new HashSet<>();

  public User(String username, String password, Role... roles) {
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.displayName = username;
    this.registerDate = LocalDateTime.now();
  }

  public User(String username, String password, Image profileImage, Role... roles) {
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.displayName = username;
    this.profileImage = profileImage;
    this.registerDate = LocalDateTime.now();
  }
  public User(String username, String displayName, String password, Image profileImage, Role... roles) {
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.displayName = displayName;
    this.profileImage = profileImage;
    this.registerDate = LocalDateTime.now();
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
  public boolean isCredentialsNonExpired() { return true; }

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

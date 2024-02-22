package nl.itvitae.twitbook.security;

import nl.itvitae.twitbook.user.User;
import nl.itvitae.twitbook.user.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class JWTService {

//  @Value("${spring.jwt.secret}")
  private final String JWT_SECRET = "d7929ef0109bcf45992736d6a7963d7166ad5450e5b16ecafd4a8f935184e5c4ba7f1513b949f9f3db6a181218967f077e706a734815c5b72981297cd22fb152";

//  @Value("${spring.jwt.jwtExpirationTimeInMs}")
  private final int JWT_EXPIRATION_TIME = 360000000;

  private final UserRepository userRepository;

  public String generateUserJWT(String username) {
    User user =
        userRepository
            .findByUsernameIgnoreCase(username)
            .orElseThrow(() -> new RuntimeException(username));

    Map<String, Object> claims = new HashMap<>();
    claims.put("roles", user.getAuthorities());
    return buildJWT(claims, user.getUsername());
  }

  private String buildJWT(Map<String, Object> claims, String username) {
    return Jwts.builder()
        .claims(claims)
        .subject(username)
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
        .signWith(getSignKey())
        .compact();
  }

  private SecretKey getSignKey() {
    byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String extractUsernameFromToken(String theToken) {
    return extractClaim(theToken, Claims::getSubject);
  }

  public Date extractExpirationTimeFromToken(String theToken) {
    return extractClaim(theToken, Claims::getExpiration);
  }

  public Boolean validateToken(String theToken, UserDetails userDetails) {
    final String username = extractUsernameFromToken(theToken);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(theToken));
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload();
  }

  private boolean isTokenExpired(String theToken) {
    return extractExpirationTimeFromToken(theToken).before(new Date());
  }


}

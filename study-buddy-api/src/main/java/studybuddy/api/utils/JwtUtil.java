package studybuddy.api.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import studybuddy.api.user.User;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    @Autowired
    private TokenStore tokenStore;

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String generateToken(User userDetails) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("userId", userDetails.getId())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + 86400000)) // 24 hours
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token) {
        if (tokenStore.isTokenInvalid(token)) {
            return false;
        }
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            // Token has expired
            return false;
        } catch (Exception e) {
            // Token is invalid
            return false;
        }
    }


    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}

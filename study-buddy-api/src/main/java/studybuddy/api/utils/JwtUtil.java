package studybuddy.api.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import studybuddy.api.user.User;

import javax.crypto.SecretKey;
import java.util.Date;

@Component()
public class JwtUtil {

    private SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String generateToken(User userDetails) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("userId", userDetails.getId())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + 86400000)) //24 hours
                .signWith(secretKey)
                .compact();
    }
}

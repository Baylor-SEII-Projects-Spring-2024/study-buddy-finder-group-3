package studybuddy.api.utils;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenStore {
    private final Map<String, Long> invalidTokens = new ConcurrentHashMap<>();

    public void invalidateToken(String token) {
        invalidTokens.put(token, System.currentTimeMillis());
    }

    public boolean isTokenInvalid(String token) {
        return invalidTokens.containsKey(token);
    }

}


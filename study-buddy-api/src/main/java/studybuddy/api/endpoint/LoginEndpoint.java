package studybuddy.api.endpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class LoginEndpoint {
    private static final Logger log = LoggerFactory.getLogger(LoginEndpoint.class);

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> login(@RequestBody LoginReq loginRequest) {
        log.info("Attempting login for username: {}", loginRequest.getUsername());
        Optional<User> user = userService.findByUsername(loginRequest.getUsername());

        if (user.isPresent()) {
            log.info("User found for username: {}", loginRequest.getUsername());
            if (user.get().getPassword().equals(loginRequest.getPassword())) {
                log.info("Password match for user: {}", loginRequest.getUsername());
                return ResponseEntity.status(200).body("User logged in successfully!");
            } else {
                log.info("Password mismatch for user: {}", loginRequest.getUsername());
            }
        } else {
            log.info("No user found for username: {}", loginRequest.getUsername());
        }

        return ResponseEntity.status(401).body("Unauthorized");
    }


    static class LoginReq {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }


    }

}

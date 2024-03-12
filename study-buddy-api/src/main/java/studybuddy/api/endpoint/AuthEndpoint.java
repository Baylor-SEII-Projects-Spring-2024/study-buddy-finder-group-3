package studybuddy.api.endpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import studybuddy.api.utils.JwtUtil;

import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthEndpoint {
    private static final Logger log = LoggerFactory.getLogger(AuthEndpoint.class);
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    JdbcTemplate jdbcTemplate;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserReq loginRequest) {
        log.info("Attempting login for username: {}", loginRequest.getUsername());
        Optional<User> user = userService.findByUsername(loginRequest.getUsername());

        if (user.isPresent()) {
            log.info("User found for username: {}", loginRequest.getUsername());
            User foundUser = user.get();
//            if (user.get().getPassword().equals(loginRequest.getPassword())) {
            //*Uncomment once password hashing exits
            if (passwordEncoder.matches(loginRequest.getPassword(), foundUser.getPassword())) {
                log.info("Password match for user: {}", loginRequest.getUsername());
                String token = jwtUtil.generateToken(foundUser); //tokenize

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);

                User safeUser = new User(foundUser);
                safeUser.setPassword(null);

                response.put("user", safeUser);

                return ResponseEntity.ok().body(response);
            } else {
                log.info("Password mismatch for user: {}", loginRequest.getUsername());
            }
        } else {
            log.info("No user found for username: {}", loginRequest.getUsername());
        }
        return ResponseEntity.status(401).body("Unauthorized");
    }


    @PostMapping("/createAccount")
    public boolean addUser(@RequestBody UserReq userRequest) {
        List<Object[]> parameters = new ArrayList<>();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(userRequest.getPassword());

        parameters.add(new Object[]{
                userRequest.getEmail(),
                hashedPassword,
                "Computer Science",
                userRequest.getFirstName(),
                userRequest.getLastName(),
                userRequest.getIsTutor(),
                userRequest.getUsername()
        });

        jdbcTemplate.batchUpdate("INSERT INTO users (email_address, password, areaofstudy, namefirst, " +
                "namelast, istutor, username) VALUES(?,?,?,?,?,?,?)", parameters);
        return true;
    }


    static class UserReq {
        private String username;
        private String password;
        private String firstName;
        private String lastName;
        private String email;
        private Boolean isTutor;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public String getFirstName() {
            return firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public String getEmail() {
            return email;
        }

        public Boolean getIsTutor() {
            return isTutor;
        }

    }
}
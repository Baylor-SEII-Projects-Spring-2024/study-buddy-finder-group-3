package studybuddy.api.endpoint;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import studybuddy.api.utils.JwtUtil;
import studybuddy.api.utils.TokenStore;

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

    @Autowired
    private TokenStore tokenStore;

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

    @GetMapping("/checkUsername/{username}")
    public boolean validateUsername(@PathVariable String username){
        try{
            Optional<User> user = userService.findByUsername(username);
            return user.isEmpty();
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }

    }

    @GetMapping("/checkEmail/{email}")
    public boolean validateEmail(@PathVariable String email){
        try{
            Optional<User> user = userService.findByEmail(email);
            return user.isEmpty();
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }

    }


    @PutMapping("/updateProfile/{userId}")
    public boolean updateProfile(@PathVariable Long userId, @RequestBody UserReq userRequest) {
        //BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        //String hashedPassword = encoder.encode(userRequest.getPassword());

        log.info("Update user using: {}", userRequest);
        log.info("Updating user profile with userId={}, areaofstudy={}, email={}, firstName={}, lastName={}, username={}",
                userId, userRequest.getCourses(), userRequest.getEmail(), userRequest.getFirstName(),
                userRequest.getLastName(), userRequest.getUsername());



        jdbcTemplate.update("UPDATE users SET " +
                        "email_address = ?, " +
                        //"password = ?, " +
                        "areaofstudy = ?, " +
                        "namefirst = ?, " +
                        "namelast = ?, " +
                        //"istutor = ?, " +
                        "username = ?, " +
                        "pref_meeting_type = ?, " +
                        "pref_time = ? " +
                        "WHERE user_id = ?",
                userRequest.getEmail(),
                //hashedPassword,
                userRequest.getCourses(),
                userRequest.getFirstName(),
                userRequest.getLastName(),
                //userRequest.getIsTutor(),
                userRequest.getUsername(),
                userRequest.getPrefMeetingType(),
                userRequest.getPrefTime(),
                userId);

        return true;
    }

    @GetMapping("/validateToken")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        try {
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);
                User user = userService.findByUsername(username).orElse(null);
                if (user != null) {
                    return ResponseEntity.ok(user);
                }
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Token validation error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/invalidateToken")
    public ResponseEntity<?> invalidateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenStore.invalidateToken(token);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Invalid Authorization header");
    }





    public static class UserReq {
        private String username;
        private String password;
        private String firstName;
        private String lastName;
        private String email;
        private Boolean isTutor;
        private String courses;
        private String prefTime;
        private String prefMeetingType;

        public UserReq(String username, String password, String firstName, String lastName, String email, boolean isTutor) {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.isTutor = isTutor;
        }

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

        public String getCourses() { return courses; }

        public String getPrefTime() { return prefTime; }

        public String getPrefMeetingType() { return prefMeetingType; }
    }
}
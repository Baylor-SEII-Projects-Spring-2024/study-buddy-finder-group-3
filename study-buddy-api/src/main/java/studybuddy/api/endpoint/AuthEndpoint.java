package studybuddy.api.endpoint;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import studybuddy.api.user.PasswordReset;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import studybuddy.api.utils.JwtUtil;
import studybuddy.api.utils.TokenStore;

import java.io.IOException;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
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
                userRequest.getAreaOfStudy(),
                userRequest.getFirstName(),
                userRequest.getLastName(),
                userRequest.getIsTutor(),
                userRequest.getUsername(),
                userRequest.getPrefTime(),
                userRequest.getPrefMeetingType()
        });

        jdbcTemplate.batchUpdate("INSERT INTO users (email_address, password, areaofstudy, namefirst, " +
                "namelast, istutor, username, pref_time, pref_meeting_type) VALUES(?,?,?,?,?,?,?,?,?)", parameters);
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


    @PostMapping("/{id}/changePassword")
    public boolean changePassword(@PathVariable Long id, @RequestBody UserReq userRequest) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(userRequest.getPassword());

        int rowsAffected = jdbcTemplate.update("UPDATE users SET password = ? WHERE user_id = ?", hashedPassword, id);

        // Check if the update was successful (1 row affected)
        return rowsAffected == 1;
    }


    @PostMapping("/verifyPassword/{id}")
    public boolean verifyPassword(@PathVariable Long id, @RequestBody UserReq userReq) {
        try {
            String password = userReq.getPassword();


            // Retrieve the stored hashed password from the database using the user's ID
            String storedHashedPassword = jdbcTemplate.queryForObject(
                    "SELECT password FROM users WHERE user_id = ?",
                    new Object[]{id},
                    String.class
            );

            // Use bcrypt to compare the input password with the stored hashed password
            return passwordEncoder.matches(password, storedHashedPassword);
        } catch (Exception e) {
            log.error("Error verifying password: {}", e.getMessage());
            return false;
        }
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

    @GetMapping("/generateResetToken/{email}")
    public ResponseEntity<BigInteger> generateResetToken(@PathVariable String email) {
        //Check if email is valid
        String sql = "SELECT * FROM users WHERE email_address = ?";

        List<User> users = jdbcTemplate.query(sql, new GetFriendsEndpoint.UserRowMapper(), email);

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        //Generate a token

        SecureRandom random = new SecureRandom();

        BigInteger token = BigInteger.valueOf(random.nextLong());

        //Store token and userID in db

        sql = "INSERT INTO password_reset (token, reset_user_id) VALUES(?, ?)";

        jdbcTemplate.update(sql, token, users.get(0).getId());

        //return token
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @GetMapping("/validateResetToken/{token}")
    public ResponseEntity<User> validateResetToken(@PathVariable BigInteger token) {

        String sql = "SELECT u.* FROM users u JOIN password_reset pr ON u.user_id = pr.reset_user_id WHERE pr.token = ?";

        List<User> users = jdbcTemplate.query(sql, new GetFriendsEndpoint.UserRowMapper(), token);

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (users.size() > 1) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return new ResponseEntity<>(users.get(0), HttpStatus.OK);
    }

    @DeleteMapping("invalidateResetToken/{token}")
    public ResponseEntity<?> invalidateResetToken(@PathVariable BigInteger token) {
        String sql = "DELETE FROM password_reset WHERE token = ?";

        jdbcTemplate.update(sql, token);

        return ResponseEntity.ok().build();
    }


    public static class UserReq {
        private String username;
        private String password;
        private String firstName;
        private String lastName;
        private String email;
        private Boolean isTutor;
        private String areaOfStudy;
        private String prefTime;
        private String prefMeetingType;
        private String aboutMe;

        public UserReq(String username, String password, String firstName, String lastName, String email, boolean isTutor) {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.isTutor = isTutor;
        }

        public UserReq(){

        }

        public UserReq(String username, String password, String firstName, String lastName, String email, boolean isTutor, String areaOfStudy, String prefTime, String prefMeetingType) {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.isTutor = isTutor;
            this.areaOfStudy = areaOfStudy;
            this.prefTime = prefTime;
            this.prefMeetingType = prefMeetingType;
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

        public String getAreaOfStudy() { return areaOfStudy; }

        public String getPrefTime() { return prefTime; }

        public String getPrefMeetingType() { return prefMeetingType; }

        public String getAboutMe() { return aboutMe; }
    }


}

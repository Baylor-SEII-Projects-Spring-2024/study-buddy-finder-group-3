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

import java.util.ArrayList;
import java.util.List;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class LoginEndpoint {
    private static final Logger log = LoggerFactory.getLogger(LoginEndpoint.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    JdbcTemplate jdbcTemplate;


    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> login(@RequestBody LoginReq loginRequest) {
        log.info("Attempting login for username: {}", loginRequest.getUsername());
        Optional<User> user = userService.findByUsername(loginRequest.getUsername());

        if (user.isPresent()) {
            log.info("User found for username: {}", loginRequest.getUsername());
            User foundUser = user.get();
            if (user.get().getPassword().equals(loginRequest.getPassword())) {
                //*Uncomment once password hashing exits
//            if (passwordEncoder.matches(loginRequest.getPassword(), foundUser.getPassword())) {
                log.info("Password match for user: {}", loginRequest.getUsername());
                String token = jwtUtil.generateToken(foundUser); //tokenize
                return ResponseEntity.ok().body(Collections.singletonMap("token", token)); // pass token
            } else {
                log.info("Password mismatch for user: {}", loginRequest.getUsername());
            }
        } else {
            log.info("No user found for username: {}", loginRequest.getUsername());
        }

        return ResponseEntity.status(401).body("Unauthorized");
    }


    @RequestMapping(value = "/createAccount", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean addUser(@RequestParam("username") String username, @RequestParam("password") String password,
                           @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName,
                           @RequestParam("email") String email, @RequestParam("isTutor") String isTutor){
        List<Object[]> parameters =  new ArrayList<>();
        String hashedPassword = passwordEncoder.encode(password);

        parameters.add(new Object[]{email, hashedPassword, "Computer Science", firstName, lastName, isTutor, username});

        jdbcTemplate.batchUpdate("INSERT INTO users (email_address, password, areaofstudy, namefirst, " +
                "namelast, istutor, username) VALUES(?,?,?,?,?,?,?)", parameters);
        return true;
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

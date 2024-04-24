package studybuddy.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

import java.util.List;
import java.util.Map;

@Log4j2
@RestController
public class UserEndpoint {
    @Autowired
    private UserService userService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/users/{id}")
    public User findUserById(@PathVariable Long id) {
        var user = userService.findUser(id).orElse(null);

        if (user == null) {
            log.warn("User not found");
        }

        return user;
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/users/{id}/is-tutor")
    public ResponseEntity<?> isUserATutor(@PathVariable Long id) {
        User user = userService.findUser(id).orElse(null);
        log.warn(user);
        if (user == null) {
            log.warn("User not found for ID: {}", id);
            return ResponseEntity.notFound().build();
        }

        boolean isTutor = user.getIsTutor();
        return ResponseEntity.ok(isTutor);
    }

    @PutMapping("/users/{id}/changeAccountType")
    public ResponseEntity<?> updateUserTutorStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> requestBody) {
        Boolean isTutor = requestBody.get("isTutor");
        User user = userService.findUser(id).orElse(null);

        if (user == null) {
            log.warn("User not found for ID: {}", id);
            return ResponseEntity.notFound().build();
        }

        // Update the user's isTutor attribute in the database using SQL
        String sql = "UPDATE users SET istutor = ? WHERE user_id = ?";
        int rowsAffected = jdbcTemplate.update(sql, isTutor, id);

        if (rowsAffected == 1) {
            // Update successful, set the new isTutor value in the User object
            user.setIsTutor(isTutor);
            // No need to explicitly save the user, assuming userService uses the same database session
            return ResponseEntity.ok().build();
        } else {
            // Update failed, return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/users/search/{searchTerm}")
    public ResponseEntity<?> findUsersContainingUsername(@PathVariable String searchTerm) {
        log.warn("Searching for users with username containing: {}", searchTerm);
        List<User> usersFound = userService.findUsersContainingUsername(searchTerm);
        return ResponseEntity.ok(usersFound);
    }
}
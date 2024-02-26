package studybuddy.api.endpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friends")
public class GetFriendsEndpoint {

    private final UserService userService;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    public GetFriendsEndpoint(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<User>> getUserProfile(@PathVariable Long userId) {

        String sql = "SELECT u.* FROM users u " +
                "JOIN friends f ON u.user_id = f.user2_id OR u.user_id = f.user1_id " +
                "WHERE (f.user1_id = ? OR f.user2_id = ?) AND u.user_id != ?";

        List<User> friends = jdbcTemplate.query(sql, new Object[]{userId, userId, userId}, (rs, rowNum) ->
            new User(
                rs.getLong("user_id"),
                rs.getString("username"),
                rs.getString("email_address"),
                rs.getString("password"),
                rs.getBoolean("istutor"),
                rs.getString("namefirst"),
                rs.getString("namelast"),
                rs.getString("areaofstudy")
            )
        );

        return new ResponseEntity<>(friends, HttpStatus.OK);
    }
}

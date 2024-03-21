package studybuddy.api.endpoint;
import org.json.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import studybuddy.api.utils.JwtUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friends")
public class GetFriendsEndpoint {

    //TODO: upgrade deprecated query functions to non deprecated versions

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    JdbcTemplate jdbcTemplate;

    //Gets all friends with the given user
    @GetMapping("/{userId}/all")
    public ResponseEntity<List<User>> getUserProfile(@PathVariable Long userId)
    {

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

    //Gets all users with the given string in the username
    @GetMapping("/{userId}/get/{username}")
    public ResponseEntity<List<User>> getAddFriend(@PathVariable String username, @PathVariable Long userId)
    {

        String sql = "SELECT * FROM users WHERE username LIKE ? AND user_id != ? AND user_id NOT IN " +
                //Gets all friends
                "(SELECT u.user_id FROM users u " +
                "JOIN friends f ON u.user_id = f.user2_id OR u.user_id = f.user1_id " +
                "WHERE (f.user1_id = ? OR f.user2_id = ?) AND u.user_id != ?) " +

                " AND user_id NOT IN (" +
                //Gets all friend requests
                "SELECT u.user_id FROM users u " +
                "JOIN friends_request f ON u.user_id = f.userfrom_id OR u.user_id = f.userto_id " +
                "WHERE (f.userto_id = ? OR f.userfrom_id = ?) AND u.user_id != ?)";

        String searchTerm = "%" + username + "%";

        List<User> users = jdbcTemplate.query(sql, new Object[]{searchTerm, userId, userId, userId, userId, userId, userId, userId}, (rs, rowNum) ->
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

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //Creates friend request
    @PostMapping("/{idFrom}/request/{idTo}")
    public boolean addFriendRequest(@PathVariable Long idTo, @PathVariable Long idFrom)
    {
        List<Object[]> parameters = new ArrayList<>();

        parameters.add(new Object[]{
                idTo,
                idFrom
        });



        jdbcTemplate.batchUpdate("INSERT INTO friends_request (userto_id, userfrom_id) VALUES(?, ?)", parameters);

        return true;
    }

    //Get all users who sent a friend request to user
    @GetMapping("/{userId}/getRequests")
    public ResponseEntity<List<User>> getRequests(@PathVariable Long userId)
    {

        String sql = "SELECT u.* FROM users u JOIN friends_request fr ON u.user_id = fr.userfrom_id " +
                "WHERE fr.userto_id = ?";

        List<User> friends = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) ->
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

    //Add friend
    @PostMapping("/{idFrom}/add/{idTo}")
    public boolean addFriend(@PathVariable Long idTo, @PathVariable Long idFrom)
    {
        List<Object[]> parameters = new ArrayList<>();

        parameters.add(new Object[]{
                idTo,
                idFrom
        });



        jdbcTemplate.batchUpdate("INSERT INTO friends (user1_id, user2_id) VALUES(?, ?)", parameters);

        return true;
    }

    //Remove friend request
    @PostMapping("/{idFrom}/delete/{idTo}")
    public boolean removeRequest(@PathVariable Long idTo, @PathVariable Long idFrom)
    {
        String sql = "DELETE FROM friends_request WHERE userto_id = ? AND userfrom_id = ?";

        List<Object[]> parameters = new ArrayList<>();

        parameters.add(new Object[]{
                idTo,
                idFrom
        });

        jdbcTemplate.batchUpdate(sql, parameters);

        return true;
    }

    //Remove friend
    @PostMapping("/{user1}/deleteFriend/{user2}")
    public boolean removeFriend(@PathVariable Long user1, @PathVariable Long user2)
    {
        String sql = "DELETE FROM friends WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)";

        List<Object[]> parameters = new ArrayList<>();

        parameters.add(new Object[]{
                user1,
                user2,
                user2,
                user1
        });

        jdbcTemplate.batchUpdate(sql, parameters);

        return true;
    }

    //Block user
    @PostMapping("/{blocker_id}/block/{blocked_id}")
    public boolean blockUser(@PathVariable Long blocker_id, @PathVariable Long blocked_id)
    {
        List<Object[]> parameters = new ArrayList<>();

        parameters.add(new Object[]{
                blocker_id,
                blocked_id
        });



        jdbcTemplate.batchUpdate("INSERT INTO blockedlist (blocker_id, blocked_id) VALUES(?, ?)", parameters);

        return true;
    }

    //Get all blocked users
    @GetMapping("/{userId}/getBlocked")
    public ResponseEntity<List<User>> getBlocked(@PathVariable Long userId)
    {

        String sql = "SELECT u.* FROM users u JOIN blockedlist bl ON u.user_id = bl.blocked_id " +
                "WHERE bl.blocker_id = ?";

        List<User> blockedUsers = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) ->
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

        return new ResponseEntity<>(blockedUsers, HttpStatus.OK);
    }
}

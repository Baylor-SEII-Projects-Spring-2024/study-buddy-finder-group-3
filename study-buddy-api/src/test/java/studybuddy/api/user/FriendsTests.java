package studybuddy.api.user;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.bind.annotation.RequestBody;
import studybuddy.api.endpoint.AuthEndpoint;
import studybuddy.api.endpoint.GetFriendsEndpoint;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


//TODO: fix broken unit tests

@SpringBootTest
@ActiveProfiles("testdb")  // make these tests use the H2 in-memory DB instead of your actual DB
@Transactional             // make these tests revert their DB changes after the test is complete
public class FriendsTests {

    @Autowired
    private AuthEndpoint authEndpoint;

    @Autowired
    private GetFriendsEndpoint getFriendsEndpoint;

    private long id1;
    private long id2;
    private long id3;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void init(){

        authEndpoint.addUser( new AuthEndpoint.UserReq(
                "user1", "nameLast", "email", "UserLast", "password", false
        ));

        id1 = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE username = ?", Long.class, "user1");

        authEndpoint.addUser( new AuthEndpoint.UserReq(
                "Friend1", "nameLast", "email", "friend1", "password", false
        ));

        id2 = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE username = ?", Long.class, "Friend1");

        authEndpoint.addUser( new AuthEndpoint.UserReq(
                "Friend2", "nameLast", "email", "friend2", "password", true
        ));

        id3 = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE username = ?", Long.class, "Friend2");

    }

    @Test
    public void testGetUserProfileNoFriends() {

        ResponseEntity<List<User>> response = getFriendsEndpoint.getUserProfile(id1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<User> users = response.getBody();
        assert users != null;
        assertTrue(users.isEmpty());
    }

    @Test
    public void testGetUserProfileWithFriends() {

        boolean addedSuccessfully = getFriendsEndpoint.addFriend(id1,id2);
        assertTrue(addedSuccessfully);
        addedSuccessfully = getFriendsEndpoint.addFriend(id1,id3);
        assertTrue(addedSuccessfully);

        ResponseEntity<List<User>> response = getFriendsEndpoint.getUserProfile(id1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<User> users = response.getBody();
        assert users != null;
        assertEquals(2, users.size());
    }

    @Test
    public void testGetAddFriend() {
        ResponseEntity<List<User>> response = getFriendsEndpoint.getAddFriend("Friend", id1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<User> users = response.getBody();
        assert users != null;
        assertEquals(2, users.size());
    }

    @Test
    public void testAddFriendRequest() {
        boolean response = getFriendsEndpoint.addFriendRequest(id2,id1);

        assertTrue(response);

        String sql = "SELECT requests_id FROM friends_request WHERE userfrom_id = ?";

        List<Long> requestIds = jdbcTemplate.queryForList(sql, Long.class, id1);

        assert requestIds != null;
        assertEquals(1, requestIds.size());
    }

    @Test
    public void testGetRequests() {
        boolean response = getFriendsEndpoint.addFriendRequest(id1,id2);

        assertTrue(response);

        response = getFriendsEndpoint.addFriendRequest(id1,id3);

        assertTrue(response);


        ResponseEntity<List<User>> response2 = getFriendsEndpoint.getRequests(id1);

        assertEquals(HttpStatus.OK, response2.getStatusCode());
        List<User> users = response2.getBody();
        assert users != null;
        assertEquals(2, users.size());
    }

    @Test
    public void testGetOutgoingRequests() {
        boolean response = getFriendsEndpoint.addFriendRequest(id2,id1);

        assertTrue(response);

        response = getFriendsEndpoint.addFriendRequest(id3,id1);

        assertTrue(response);


        ResponseEntity<List<User>> response2 = getFriendsEndpoint.getOutgoingRequests(id1);

        assertEquals(HttpStatus.OK, response2.getStatusCode());
        List<User> users = response2.getBody();
        assert users != null;
        assertEquals(2, users.size());
    }

    @Test
    public void testAddFriend() {
        boolean response = getFriendsEndpoint.addFriend(id1, id2);

        assertTrue(response);

        ResponseEntity<List<User>> response2 = getFriendsEndpoint.getUserProfile(id1);

        assertEquals(HttpStatus.OK, response2.getStatusCode());
        List<User> users = response2.getBody();
        assert users != null;
        assertEquals(1, users.size());

    }

    @Test
    public void testRemoveRequest() {
        boolean response = getFriendsEndpoint.addFriendRequest(id2,id1);

        assertTrue(response);

        String sql = "SELECT requests_id FROM friends_request WHERE userfrom_id = ?";

        List<Long> requestIds = jdbcTemplate.queryForList(sql, Long.class, id1);

        assert requestIds != null;
        assertEquals(1, requestIds.size());

        response = getFriendsEndpoint.removeRequest(id2, id1);

        assertTrue(response);

        sql = "SELECT requests_id FROM friends_request WHERE userfrom_id = ?";

        requestIds = jdbcTemplate.queryForList(sql, Long.class, id1);

        assert requestIds != null;
        assertEquals(0, requestIds.size());

    }

    @Test
    public void testRemoveFriend() {
        boolean response = getFriendsEndpoint.addFriend(id1, id2);

        assertTrue(response);

        ResponseEntity<List<User>> response2 = getFriendsEndpoint.getUserProfile(id1);

        assertEquals(HttpStatus.OK, response2.getStatusCode());
        List<User> users = response2.getBody();
        assert users != null;
        assertEquals(1, users.size());

        response = getFriendsEndpoint.removeFriend(id1,id2);

        assertTrue(response);

        response2 = getFriendsEndpoint.getUserProfile(id1);

        assertEquals(HttpStatus.OK, response2.getStatusCode());
        users = response2.getBody();
        assert users != null;
        assertEquals(0, users.size());
    }

    @Test
    public void testBlockUser() {
        boolean response = getFriendsEndpoint.blockUser(id1,id2);

        assertTrue(response);

        String sql = "SELECT blockedlist_id FROM blockedlist WHERE blocker_id = ?";
        List<Long> ids = jdbcTemplate.queryForList(sql, Long.class, id1);
        assert ids != null;
        assertEquals(1, ids.size());
    }

    @Test
    public void testGetBlocked() {
        boolean response = getFriendsEndpoint.blockUser(id1,id2);

        assertTrue(response);

        ResponseEntity<List<User>> response2 = getFriendsEndpoint.getBlocked(id1);
        assertEquals(HttpStatus.OK, response2.getStatusCode());
        List<User> users = response2.getBody();
        assert users != null;
        assertEquals(1, users.size());
    }

    @Test
    public void testUnBlockUser() {
        boolean response = getFriendsEndpoint.blockUser(id1,id2);

        assertTrue(response);

        ResponseEntity<List<User>> response2 = getFriendsEndpoint.getBlocked(id1);
        assertEquals(HttpStatus.OK, response2.getStatusCode());
        List<User> users = response2.getBody();
        assert users != null;
        assertEquals(1, users.size());

        response = getFriendsEndpoint.unBlockUser(id1,id2);

        assertTrue(response);

        response2 = getFriendsEndpoint.getBlocked(id1);
        assertEquals(HttpStatus.OK, response2.getStatusCode());
        users = response2.getBody();
        assert users != null;
        assertEquals(0, users.size());
    }
    //TODO: add test for getProfilePicture

    

}

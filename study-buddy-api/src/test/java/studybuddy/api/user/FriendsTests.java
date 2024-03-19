package studybuddy.api.user;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.test.context.ActiveProfiles;
import studybuddy.api.endpoint.GetFriendsEndpoint;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@SpringBootTest
@ActiveProfiles("testdb")  // make these tests use the H2 in-memory DB instead of your actual DB
@Transactional             // make these tests revert their DB changes after the test is complete
public class FriendsTests {
    @Mock
    JdbcTemplate jdbcTemplate;

    @InjectMocks
    private GetFriendsEndpoint getFriendsEndpoint;

    @Test
    void GetUserProfileTest() {
        List<User> expectedFriends = new ArrayList<>();
        expectedFriends.add(new User(2L, "friend1", "friend1@example.com", "password1", false, "First1", "Last1", "Study1"));
        expectedFriends.add(new User(3L, "friend2", "friend2@example.com", "password2", false, "First2", "Last2", "Study2"));

        when(jdbcTemplate.query(Mockito.anyString(), Mockito.any(Object[].class), Mockito.any(RowMapper.class)))
                .thenReturn(expectedFriends);

        ResponseEntity<List<User>> responseEntity = getFriendsEndpoint.getUserProfile(1L);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedFriends, responseEntity.getBody());
    }

    @Test
    public void GetAddFriendTest() {
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(new User(2L, "user1", "user1@example.com", "password1", false, "First1", "Last1", "Study1"));
        expectedUsers.add(new User(3L, "user2", "user2@example.com", "password2", false, "First2", "Last2", "Study2"));

        when(jdbcTemplate.query(Mockito.anyString(), Mockito.any(Object[].class), Mockito.any(RowMapper.class)))
                .thenReturn(expectedUsers);

        ResponseEntity<List<User>> responseEntity = getFriendsEndpoint.getAddFriend("user", 1L);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedUsers, responseEntity.getBody());
    }

    @Test
    public void AddFriendRequestTest() {
        boolean result = getFriendsEndpoint.addFriendRequest(2L, 1L);

        assertTrue(result);
    }

    @Test
    public void GetRequestsTest() {
        List<User> expectedRequests = new ArrayList<>();
        expectedRequests.add(new User(2L, "user1", "user1@example.com", "password1", false, "First1", "Last1", "Study1"));
        expectedRequests.add(new User(3L, "user2", "user2@example.com", "password2", false, "First2", "Last2", "Study2"));

        when(jdbcTemplate.query(Mockito.anyString(), Mockito.any(Object[].class), Mockito.any(RowMapper.class)))
                .thenReturn(expectedRequests);

        ResponseEntity<List<User>> responseEntity = getFriendsEndpoint.getRequests(1L);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedRequests, responseEntity.getBody());
    }

    @Test
    public void addFriendTest() {
        boolean result = getFriendsEndpoint.addFriend(2L, 1L);

        assertTrue(result);
    }

    @Test
    public void removeRequestTest() {
        boolean result = getFriendsEndpoint.removeRequest(2L, 1L);

        assertTrue(result);
    }
}

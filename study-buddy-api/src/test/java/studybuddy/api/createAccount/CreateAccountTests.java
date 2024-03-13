package studybuddy.api.createAccount;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import studybuddy.api.endpoint.AuthEndpoint;
import studybuddy.api.endpoint.UserEndpoint;
import studybuddy.api.meeting.meetingService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;
import studybuddy.api.user.UserService;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("testdb")
@Transactional
public class CreateAccountTests {
    @Autowired
    private AuthEndpoint authEndpoint;
    private String nameFirst, nameLast, email, username, password;
    private boolean isTutor;

    @BeforeEach
    void init(){
        nameFirst = "John";
        nameLast = "Doe";
        email = "johnDoe123@gmail.com";
        username = "Jdoe";
        password = "password";
        isTutor = true;
    }

    @Test
    public void createAccountTest(){
        //AuthEndpoint authEndpoint = new AuthEndpoint();

        AuthEndpoint.UserReq newUser = new AuthEndpoint.UserReq(
                nameFirst, nameLast, email, username, password, isTutor
        );

        boolean flag = authEndpoint.addUser(newUser);

        assertTrue(flag);
    }

    @Test
    public void validateUsernameTest(){
        AuthEndpoint.UserReq newUser = new AuthEndpoint.UserReq(
                nameFirst, nameLast, email, username, password, isTutor
        );

        AuthEndpoint.UserReq clone = new AuthEndpoint.UserReq(
                nameFirst, nameLast, email, username, password, isTutor
        );

        authEndpoint.addUser(newUser);
        boolean flag = authEndpoint.validateUsername(clone.getUsername());
        assertFalse(flag);
    }

    @Test
    public void validateEmailTest(){
        AuthEndpoint.UserReq newUser = new AuthEndpoint.UserReq(
                nameFirst, nameLast, email, username, password, isTutor
        );

        AuthEndpoint.UserReq clone = new AuthEndpoint.UserReq(
                nameFirst, nameLast, email, username, password, isTutor
        );

        authEndpoint.addUser(newUser);
        boolean flag = authEndpoint.validateEmail(clone.getEmail());
        assertFalse(flag);
    }
}

package studybuddy.api.createAccount;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import studybuddy.api.endpoint.AuthEndpoint;

import static org.junit.jupiter.api.Assertions.*;

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

package studybuddy.api.chat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import studybuddy.api.user.Messages;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import studybuddy.api.user.messageService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("testdb")  // make these tests use the H2 in-memory DB instead of your actual DB
class ChatTests {

    @Autowired
    messageService messageService;

    @Autowired
    UserService userService;

    @Test
    void emptyTest() {
    }

    @Test
    void exampleTest() {
        assertEquals(2, 1 + 1);
    }

    @Test
    void createMessagePass() {
        User user = new User();
        User newUser = new User();

        user.setUsername("test1");
        newUser.setUsername("test2");

        user.setId(1L);
        newUser.setId(2L);

        userService.saveUser(user);
        userService.saveUser(newUser);

        messageService.sendMessage(user,newUser,"Test Message");

        List<Messages> msgs = messageService.findMessageByUsers(user.getId(),newUser.getId());

        assertEquals(1, msgs.size());
        Messages msg = msgs.get(0);
        assertEquals(msg.getContent(), "Test Message");
    }
}
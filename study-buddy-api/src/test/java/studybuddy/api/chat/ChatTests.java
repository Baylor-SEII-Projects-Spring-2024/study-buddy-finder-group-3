package studybuddy.api.chat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import studybuddy.api.user.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("testdb")  // make these tests use the H2 in-memory DB instead of your actual DB
class ChatTests {

    @Autowired
    messageService messageService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;

    @AfterEach
    void tearDown() throws Exception {
        messageRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void createMessagePass() throws Exception {
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

    @Test
    void createMessagesPass() throws Exception {
        User user = new User();
        User newUser = new User();

        user.setUsername("test1");
        newUser.setUsername("test2");

        user.setId(1L);
        newUser.setId(2L);

        userService.saveUser(user);
        userService.saveUser(newUser);

        messageService.sendMessage(user,newUser,"Test Message1");
        messageService.sendMessage(user,newUser,"Test Message2");
        messageService.sendMessage(user,newUser,"Test Message3");

        List<Messages> msgs = messageService.findMessageByUsers(user.getId(),newUser.getId());

        assertEquals(3, msgs.size());
        for(int i = 0; i < 3; i++) {
            Messages msg = msgs.get(i);
            assertEquals(msg.getContent(), "Test Message" + (i+1));
        }
    }

}
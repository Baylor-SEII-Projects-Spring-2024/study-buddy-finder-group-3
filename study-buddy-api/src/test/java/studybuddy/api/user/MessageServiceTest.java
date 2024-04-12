package studybuddy.api.user;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import studybuddy.api.endpoint.UserEndpoint;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest
@ActiveProfiles("testdb")  // make these tests use the H2 in-memory DB instead of your actual DB
@Transactional             // make these tests revert their DB changes after the test is complete
public class MessageServiceTest {

    @Autowired
    private messageService messageService;

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private UserService userService;

    @Test
    public void testSendMessage() {
        // Create a dummy chat room for testing
        Chat chatRoom = new Chat();
        chatRoom.setName("Test Chat Room");
        chatRepository.save(chatRoom);

        // Assuming you have a valid instance of User and a non-empty messageContent
        User newUser = new User();
        newUser.emailAddress = "example@example.com";
        newUser.password = "password";

        User savedUser = userService.saveUser(newUser);

        String messageContent = "Hello, this is a test message!";

        // Call the sendMessage method and assert that no exceptions are thrown
        messageService.sendMessage(savedUser, chatRoom, messageContent);
        Optional<Messages> foundMessageOpt = messageService.findMessage(savedUser.id);
        assertTrue(foundMessageOpt.isPresent());
        Messages foundMsg = foundMessageOpt.get();

//        assertEquals(fo);

        System.out.println(messageContent);
    }

    @Test
    void testMessageFind() {
        Optional<Messages> msg1 = messageService.findMessage(1L);
        assertTrue(msg1.isEmpty());
    }
}

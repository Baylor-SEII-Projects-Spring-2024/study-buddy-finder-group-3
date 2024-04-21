package studybuddy.api.user;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class messageService {

    @Autowired
    private UserService userService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    public UserRepository userRepository;

    public void sendMessage(User senderUser, User receiver, String messageContent) {
        // Find the recipient user by their username
        User sender = userRepository.findByUsername(senderUser.username)
                .orElseThrow(() -> new RuntimeException("User not found"));


        // Create a new message object
        Messages message = new Messages(messageContent, sender, receiver);
        //message.setTimestamp();

        // Save the message
        // Your message repository and save logic would be implemented here
        // messageRepository.save(message);
        messageRepository.save(message);
        System.out.println("Message sent: " + message);
    }


    public List<Messages> findMessageByUsers(Long senderId, Long receiverId) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        List<Messages> messages = new ArrayList<>();
        String sql = "SELECT * FROM messages WHERE (to_user_id = ? AND from_user_id = ?) OR (to_user_id = ? AND from_user_id = ?)";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, senderId, receiverId, receiverId, senderId);

        for (Map<String, Object> row : rows) {
            Messages message = new Messages();
            message.setUser(userService.findUser((Long) row.get("to_user_id")).orElse(null));
            message.setReceiver(userService.findUser((Long) row.get("from_user_id")).orElse(null));
            message.setContent((String) row.get("content"));
            messages.add(message);
        }

        return messages;
    }
}

package studybuddy.api.user;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class messageService {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    public UserRepository userRepository;

    public void sendMessage(User senderUser, Chat chatRoom, String messageContent) {
        // Find the recipient user by their username
        User sender = userRepository.findByUsername(senderUser.username)
                .orElseThrow(() -> new RuntimeException("User not found"));


        // Create a new message object
        Messages message = new Messages(0, messageContent, sender, chatRoom);
        //message.setTimestamp();

        // Save the message
        // Your message repository and save logic would be implemented here
        // messageRepository.save(message);
        messageRepository.save(message);
        System.out.println("Message sent: " + message);
    }

    public Optional<Messages> findMessage(Long messageId) {
        return messageRepository.findById(messageId);
    }

}

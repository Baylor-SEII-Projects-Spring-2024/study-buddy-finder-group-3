package studybuddy.api.user;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class messageService {
    @Autowired
    private UserService userService;

    @Autowired
    public UserRepository userRepository;

    private Chat chat;

    public void sendMessage(String senderUsername, String recipientUsername, String messageContent) {
        // Find the recipient user by their username
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User recipient = userService.findByUsername(recipientUsername)
                .orElseThrow(() -> new IllegalArgumentException("Recipient not found"));

        // Create a new message object
        Message message = new Message();
        message.setSender(sender);
        message.setChat(chat);
        message.setContent(messageContent);

        // Save the message
        // Your message repository and save logic would be implemented here
        // messageRepository.save(message);
        System.out.println("Message sent: " + message);
    }
}

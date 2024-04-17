package studybuddy.api.user;

import org.springframework.http.ResponseEntity;
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

//    public ResponseEntity<?> findMessageByUser(User senderUser, User receiverUser) {
//        User sender = userRepository.findByUsername(senderUser.username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        User receiver = userRepository.findByUsername(receiverUser.username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        return messageRepository.getByUser_idAndReceiver(senderUser.id, receiver.id);
//    }
}

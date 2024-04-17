package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.Messages;
import studybuddy.api.user.User;

@RestController
@RequestMapping("/chat")
public class ChatEndpoint {

    @Autowired
    private studybuddy.api.user.messageService messageService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Messages message) {
        try {
            // Perform any necessary validation
            if (message.getContent() == null || message.getContent().isEmpty()) {
                return ResponseEntity.badRequest().body("Message content is missing");
            }

            // Save the message to the database
            messageService.sendMessage(message.getUser_id(), message.getReceiver(), message.getContent());

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send message");
        }
    }

//    @GetMapping("/getChat")
//    public ResponseEntity<?> getChat() {
//        return messageService.findMessageByUser(User s, User r);
//    }

}

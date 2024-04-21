package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.Messages;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/chat")
public class ChatEndpoint {

    @Autowired
    private studybuddy.api.user.messageService messageService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserService userService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Messages message) {
        try {
            // Perform any necessary validation
            if (message.getContent() == null || message.getContent().isEmpty()) {
                return ResponseEntity.badRequest().body("Message content is missing");
            }

            // Save the message to the database
            messageService.sendMessage(message.getUser(), message.getReceiver(), message.getContent());
            System.out.println("Message sent successfully");

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send message");
        }
    }


    @GetMapping("/getChat")
    public ResponseEntity<List<Messages>> getChat(
            @RequestParam("senderId") Long senderId,
            @RequestParam("receiverId") Long receiverId
    ) {
        try {
            var sender = userService.findUser(senderId).orElse(null);
            var receiver = userService.findUser(receiverId).orElse(null);

            List<Messages> messages = messageService.findMessageByUsers(sender.getId(), receiver.getId());

            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



}

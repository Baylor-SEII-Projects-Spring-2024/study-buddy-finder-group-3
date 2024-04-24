package studybuddy.api.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import studybuddy.api.user.MailRequest;
import studybuddy.api.user.MailService;

@RestController
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody MailRequest request) {
        boolean success = mailService.sendEmail(request.getTo(), request.getSubject(), request.getText());
        if (!success)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to send email");
        }
        return ResponseEntity.ok().build();
    }
}

package studybuddy.api.endpoint;

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
    public void sendEmail(@RequestBody MailRequest request) {
        mailService.sendEmail(request.getTo(), request.getSubject(), request.getText());
    }
}

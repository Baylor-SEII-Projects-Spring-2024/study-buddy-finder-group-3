package studybuddy.api.user;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class MailRequest {

    private String to;
    private String subject;
    private String text;

    // getters and setters


}

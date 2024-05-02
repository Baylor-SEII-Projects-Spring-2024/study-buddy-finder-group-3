package studybuddy.api.user;

import lombok.Data;

@Data
public class MailRequest {

    private String to;
    private String subject;
    private String text;

}

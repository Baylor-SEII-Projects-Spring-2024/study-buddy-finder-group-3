package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;

@Data
@Entity
@Table(name = Messages.TABLE_NAME)
public class Messages {
    public static final String TABLE_NAME = "MESSAGES";

    public Messages() {

    }

    public Messages(long id, String content, User user_id, Chat chat_id) {
        this.id = id;
        this.content = content;
        this.user_id = user_id;
        this.chat_id = chat_id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MESSAGE_ID")
    Long id;

    @Column(name = "TIMESTAMP")
    Time timestamp;

    @Column(name = "CONTENT")
    String content;

    @ManyToOne //User that sent the message
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_FROM_USER_ID"))
    User user_id;

    @ManyToOne //Chat message was sent too
    @JoinColumn(name = "CHAT_ID", referencedColumnName = "CHAT_ID", foreignKey = @ForeignKey(name = "FK_TO_CHAT_ID"))
    Chat chat_id;
}

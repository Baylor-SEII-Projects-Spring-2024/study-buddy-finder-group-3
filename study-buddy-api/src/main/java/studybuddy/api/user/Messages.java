package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
@Entity
@Table(name = Messages.TABLE_NAME)
public class Messages {
    public static final String TABLE_NAME = "MESSAGES";

    public Messages() {

    }

    public Messages(String content, User user_id, User receiver) {
        this.content = content;
        this.user = user_id;
        this.receiver = receiver;
    }
    public Messages(long id, String content, User user_id, User receiver) {
        this.id = id;
        this.content = content;
        this.user = user_id;
        this.receiver = receiver;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MESSAGE_ID")
    Long id;

    @Column(name = "IS_READ")
    Boolean isRead;

    @Column(name = "CONTENT")
    String content;

    @ManyToOne
    @JoinColumn(name = "FROM_USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_FROM_USER_ID"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "TO_USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_TO_USER_ID"))
    private User receiver;
}

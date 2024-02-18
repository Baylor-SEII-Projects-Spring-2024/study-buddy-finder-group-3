package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = UserMeeting.TABLE_NAME)
public class UserMeeting {
    public static final String TABLE_NAME = "USER_MEETING";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_MEETING_ID")
    Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_MEETING_USER_ID"))
    User user_id;

    @ManyToOne //User in the chat
    @JoinColumn(name = "MEETING_ID", referencedColumnName = "MEETING_ID", foreignKey = @ForeignKey(name = "FK_MEETING_ID"))
    Meeting meeting_id;
}

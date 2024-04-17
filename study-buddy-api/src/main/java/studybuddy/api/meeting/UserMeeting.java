package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.user.User;

@Data
@Entity
@Table(name = UserMeeting.TABLE_NAME)
public class UserMeeting {
    public static final String TABLE_NAME = "USER_MEETING";

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_MEETING_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_MEETING_USER_ID"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "MEETING_ID", referencedColumnName = "MEETING_ID", foreignKey = @ForeignKey(name = "FK_MEETING_ID"))
    private Meeting meeting;

    @Getter
    @Column(name = "invite_status")
    private String inviteStatus;

    public void setInviteStatus(String inviteStatus) {
        this.inviteStatus = inviteStatus;
    }


}
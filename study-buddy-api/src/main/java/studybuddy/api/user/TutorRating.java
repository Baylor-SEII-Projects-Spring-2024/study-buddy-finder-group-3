package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.user.User;

@Data
@Entity
@Table(name = TutorRating.TABLE_NAME)
public class TutorRating {
    public static final String TABLE_NAME = "TUTOR_RATING";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TUTOR_RATING_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_TUTOR_RATING_USER_ID"))
    private User user;

    @Column(name = "RATING")
    int rating;
}
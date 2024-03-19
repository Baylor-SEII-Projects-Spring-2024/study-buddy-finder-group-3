package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = Meeting.TABLE_NAME)
public class Meeting {
    public static final String TABLE_NAME = "MEETING";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEETING_ID")
    Long id;

    @Transient
    private String creatorUsername;

    @Transient
    private List<Long> invitedUserIds;


    @Transient
    private List<Long> attendeeUserIds;

    @Column(name = "DESCRIPTION")
    String description;

    @Column(name = "MEETING_TITLE")
    private String title;

    @Column(name = "MEETING_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(name = "MEETING_LINK")
    private String link;

    @Column(name = "MEETING_LOCATION")
    private String location;

}

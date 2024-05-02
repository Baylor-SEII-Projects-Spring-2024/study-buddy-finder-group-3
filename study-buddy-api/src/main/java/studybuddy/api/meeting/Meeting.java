package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Data;
import studybuddy.api.courses.Courses;
import studybuddy.api.user.User;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = Meeting.TABLE_NAME)


//TODO
// add coursename/id, *area of study
// select course in frontned
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

    @Transient
    private String courseName;

    @Transient
    private String areaOfStudy;

    @Transient
    private boolean blockedUser = false;

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

    //TUTOR THAT IS HOSTING THE MEETING
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_HOST_MEETING_USER_ID"))
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "COURSE_ID", referencedColumnName = "COURSE_ID", foreignKey = @ForeignKey(name = "FK_MEETING_COURSE_ID"))
    private Courses course;

    @Column(name = "IS_PRIVATE")
    private boolean isPrivate;

    public Meeting(){

    }

    public Meeting(Long id, Date date, String description, String link, String location, String title, User user, Courses course){
        this.id = id;
        this.date = date;
        this.description = description;
        this.link = link;
        this.location = location;
        this.title = title;
        this.user = user;
        this.course = course;
    }


    public Meeting(long meetingId, Timestamp meetingDate, String description, String meetingLink, String meetingLocation, String meetingTitle, Courses courseId) {
        this.id = meetingId;
        this.date = meetingDate;
        this.description = description;
        this.link = meetingLink;
        this.location = meetingLocation;
        this.title = meetingTitle;
        this.course = courseId;

    }
}
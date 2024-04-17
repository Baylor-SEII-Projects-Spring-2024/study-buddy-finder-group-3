package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {

    public static final String TABLE_NAME = "USERS";

    public User(Long id, String username, String emailAddress, String password, boolean userType, String nameFirst, String nameLast, String areaOfStudy) {
        this.id = id;
        this.username = username;
        this.emailAddress = emailAddress;
        this.password = password;
        this.userType = userType;
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.areaOfStudy = areaOfStudy;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    Long id;

    @Column(name = "USERNAME")
    String username;

    @Column(name = "EMAIL_ADDRESS")
    String emailAddress;

    @Column(name = "PASSWORD")
    String password;

    @Column(name = "ISTUTOR")
    boolean userType;

    @Column(name = "NAMEFIRST")
    String nameFirst;

    @Column(name = "NAMELAST")
    String nameLast;

    @Column(name = "AREAOFSTUDY")
    String areaOfStudy;

    @Lob
    @Column(name = "PROFILEPIC",  columnDefinition = "BLOB")
    byte[] profilePic;

    @Column(name = "PREF_TIME")
    String prefTime;

    @Column(name = "PREF_MEETING_TYPE")
    String prefMeetingType;

    public boolean getIsTutor() {
        return userType;
    }

    public void setIsTutor(boolean isTutor) {
        this.userType = isTutor;
    }


    public User() {

    }

    public User(Long id, String username, String emailAddress, String password, boolean userType, String nameFirst, String nameLast, String areaOfStudy, String prefTime, String prefMeet) {
        this.id = id;
        this.username = username;
        this.emailAddress = emailAddress;
        this.password = password;
        this.userType = userType;
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.areaOfStudy = areaOfStudy;
        this.prefTime = prefTime;
        this.prefMeetingType = prefMeet;
    }

    public User(User other){
        this.id = other.id;
        this.username = other.username;
        this.emailAddress = other.emailAddress;
        this.password = other.password;
        this.userType = other.userType;
        this.nameFirst = other.nameFirst;
        this.nameLast = other.nameLast;
        this.areaOfStudy = other.areaOfStudy;
        this.prefTime = other.prefTime;
        this.prefMeetingType = other.prefMeetingType;
    }
}
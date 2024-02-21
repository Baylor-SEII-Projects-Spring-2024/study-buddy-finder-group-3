package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {

    public static final String TABLE_NAME = "USERS";

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

    public User() {

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

    }
}

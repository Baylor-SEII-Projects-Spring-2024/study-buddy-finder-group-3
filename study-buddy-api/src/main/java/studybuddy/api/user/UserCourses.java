package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = UserCourses.TABLE_NAME)
public class UserCourses {

    public static final String TABLE_NAME = "USERCOURSES";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USERCOURSES_ID")
    Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_USER_ID"))
    User user_id;

    @ManyToOne
    @JoinColumn(name = "COURSE_ID", referencedColumnName = "COURSE_ID", foreignKey = @ForeignKey(name = "FK_COURSE_ID"))
    Courses course_id;

}

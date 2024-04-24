package studybuddy.api.courses;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = Courses.TABLE_NAME)
public class Courses {
    public static final String TABLE_NAME = "COURSES";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COURSE_ID")
    Long id;

    @Column(name = "C_NAME")
    String name;

    @Column(name = "C_DESCRIPTION")
    String description;

    @Column(name = "SUBJECT_AREA")
    String subjectArea;

}

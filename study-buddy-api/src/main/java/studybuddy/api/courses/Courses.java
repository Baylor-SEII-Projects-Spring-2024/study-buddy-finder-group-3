package studybuddy.api.courses;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Optional;

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

    public Courses(Courses other){
        this.id = other.id;
        this.name = other.name;
        this.description = other.description;
        this.subjectArea = other.subjectArea;
    }

    public Courses(){

    }

    public Courses(Optional<Courses> course) {
        this.description = course.get().description;
        this.name = course.get().name;
        this.subjectArea = course.get().subjectArea;



    }
}

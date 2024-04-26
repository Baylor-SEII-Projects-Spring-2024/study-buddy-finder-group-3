package studybuddy.api.courses;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Data
@Entity
@Table(name = Courses.TABLE_NAME)
public class Courses {
    public static final String TABLE_NAME = "COURSES";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COURSE_ID")
    @Getter
    Long id;

    @Column(name = "C_NAME")
    @Getter @Setter
    String name;

    @Column(name = "C_DESCRIPTION")
    @Getter @Setter
    String description;

    @Column(name = "SUBJECT_AREA")
    @Getter @Setter
    String subjectArea;

    public Courses(Courses other){
        this.id = other.id;
        this.name = other.name;
        this.description = other.description;
        this.subjectArea = other.subjectArea;
    }

    public Courses(){

    }

    public Courses(Long id, String name, String description, String subjectArea){
        this.id = id;
        this.name = name;
        this.description = description;
        this.subjectArea = subjectArea;
    }

    public Courses(Optional<Courses> course) {
        this.description = course.get().description;
        this.name = course.get().name;
        this.subjectArea = course.get().subjectArea;



    }
}

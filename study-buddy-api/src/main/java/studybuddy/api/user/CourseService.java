package studybuddy.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.courses.Courses;
import studybuddy.api.courses.CoursesRepository;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CoursesRepository coursesRepository;

    public Optional<Courses> findCourse(Long courseId) {
        return coursesRepository.findById(courseId);
    }
}

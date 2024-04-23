package studybuddy.api.courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursesService {
    @Autowired
    private CoursesRepository coursesRepository;

    public List<Courses> getAllCourses() {
        return coursesRepository.getAllCourses();
    }

    public List<Courses> getCoursesContaining(String searchTerm) {
        return coursesRepository.findCoursesContaining(searchTerm);
    }

}

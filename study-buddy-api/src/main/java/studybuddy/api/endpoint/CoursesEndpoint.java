package studybuddy.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.courses.Courses;
import studybuddy.api.courses.CoursesService;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/courses")
public class CoursesEndpoint {
    @Autowired
    private CoursesService coursesService;

    @GetMapping("/names")
    public ResponseEntity<List<Courses>> getCoursesBySearchTerm(@RequestParam(required = false) String search) {
        log.info("Search term received: '{}'", search);
        List<Courses> courses;
        if (search == null || search.isEmpty()) {
            courses = coursesService.getAllCourses();
            log.info("Returning all courses.");
        } else {
            courses = coursesService.getCoursesContaining(search);
            log.info("Returning filtered courses.");
        }
        log.info("Number of courses found: {}", courses.size());
        return ResponseEntity.ok(courses);
    }
}

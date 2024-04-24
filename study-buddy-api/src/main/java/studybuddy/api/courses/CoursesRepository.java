package studybuddy.api.courses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CoursesRepository extends JpaRepository<Courses, Long> {
    @Query("SELECT c FROM Courses c")
    List<Courses> getAllCourses();

    @Query("SELECT c FROM Courses c WHERE c.name LIKE %:searchTerm%")
    List<Courses> findCoursesContaining(@Param("searchTerm") String searchTerm);

    Courses findAllById(Long id);

}


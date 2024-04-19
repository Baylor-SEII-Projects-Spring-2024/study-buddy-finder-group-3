package studybuddy.api.endpoint;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.user.Courses;

import java.util.ArrayList;
import java.util.List;


import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingReccomendations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import studybuddy.api.user.User;
import studybuddy.api.user.Courses;
import studybuddy.api.user.UserCourses;
import studybuddy.api.user.UserRecommendations;
import studybuddy.api.utils.JwtUtil;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;


@RestController
@RequestMapping("/courses")
public class CourseEndpoint {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/user/{userId}/courses")
    public ResponseEntity<List<Courses>> getCoursesByUserId(@PathVariable Long userId) {
        List<Courses> courses = new ArrayList<>();
        /*List<Courses> courses = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) ->
                        new Courses(
                                rs.getLong("course_id"),
                                rs.getString("c_name"),
                                rs.getString("description"),
                                rs.getString("subject_area")
                        )
        );*/

        /*
        List<Courses> courses = jdbcTemplate.query(sql, new Object[]{userId}, new CourseRowMapper());

        for(Courses c: courses) {
            System.out.println(c.getName());
        }

        return new ResponseEntity<>(courses, HttpStatus.OK);
*/

        try {
           // List<Courses> courses = new ArrayList<>();
            String sql = "SELECT * FROM courses " +
                    " NATURAL JOIN usercourses " +
                    " WHERE usercourses.user_id = ? ";
            courses = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) ->
                    new Courses(
                            rs.getLong("course_id"),
                            rs.getString("c_name"),
                            rs.getString("c_description"),
                            rs.getString("subject_area")
                    )
            );
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get courses for user");
            return ResponseEntity.ok(courses);
        }
    }
public class CourseRowMapper implements RowMapper<Courses> {
    @Override
    public Courses mapRow(ResultSet rs, int rowNum) throws SQLException {
        Courses course = new Courses(
                rs.getLong("course_id"),
                rs.getString("name"),
                rs.getString("description"),
                rs.getString("subject_area"));

        return course;
    }
}


}

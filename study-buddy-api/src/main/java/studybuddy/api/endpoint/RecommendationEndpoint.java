package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingReccomendations;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRecommendations;
import studybuddy.api.utils.JwtUtil;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@RestController
@RequestMapping("/recommendations")
public class RecommendationEndpoint {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/meetings/{userId}")
    public ResponseEntity<List<Meeting>> getReccomendationList(@PathVariable Long userId)
    {
        List<Meeting> meetings = new ArrayList<>();

        // Get all meetings that the user is not already a part of
        String sql = "SELECT * FROM meeting " +
                "WHERE meeting_id NOT IN " +
                "(SELECT meeting_id FROM meeting JOIN user_meeting USING(meeting_id)" +
                "WHERE user_meeting.user_id = ?)";

        List<MeetingReccomendations> recList = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) ->
                new MeetingReccomendations(
                        new Meeting(
                                rs.getLong("meeting_id"),
                                rs.getTimestamp("meeting_date"),
                                rs.getString("description"),
                                rs.getString("meeting_link"),
                                rs.getString("meeting_location"),
                                rs.getString("meeting_title")
                        )
                )
        );

        for(MeetingReccomendations mr : recList){
            Long meetingId = mr.getMeeting().getId();
            // Implementation for course
            // Gets meeting course ID
            sql = "SELECT course_id FROM meeting WHERE meeting_id = ?";
            Long meetingCourse = jdbcTemplate.queryForObject(sql, new Object[]{meetingId}, Long.class);
            System.out.println(meetingCourse);
            // Gets user course IDs
            sql = "SELECT course_id FROM courses JOIN usercourses USING(course_id)"
                    + " WHERE user_id = ?";
            List<Long> userCourses = jdbcTemplate.query(sql, new Object[]{userId}, new RowMapper<Long>() {
                public Long mapRow(ResultSet rs, int rowNum) throws SQLException {
                    return rs.getLong("course_id");
                }
            });

            for(Long l : userCourses){
                if(l != null){
                    if(meetingCourse.equals(l)){
                        mr.addCoursePts();
                        break;
                    }
                }
            }

            // Implementation for areaOfStudy
            // Get subject area for course of meeting
            sql = "SELECT subject_area FROM meeting JOIN courses USING(course_id) "
                    + "WHERE meeting_id = ?";
            String meetingSubject = null;

            try {
                meetingSubject = jdbcTemplate.queryForObject(sql, new Object[]{meetingId}, String.class);
                System.out.println("Meeting subject area: " + meetingSubject);
            } catch (EmptyResultDataAccessException e) {
                System.out.println("No subject area found for meeting ID: " + meetingId);
            } catch (DataAccessException e) {
                e.printStackTrace();
            }

            // Get subject of user
            sql = "SELECT areaofstudy FROM users WHERE user_id = ?";
            String userSubjectCsv = jdbcTemplate.queryForObject(sql, new Object[]{userId}, String.class);

            if(userSubjectCsv != null) {
                String[] userSubjectList = userSubjectCsv.split(",");
                for (String s : userSubjectList) {
                    if (s.equalsIgnoreCase(meetingSubject)) {
                        mr.addAreaOfStudyPts();
                    }
                }
            }
            else{
                System.out.println("THIS HAD NO ROWS");
            }

            // TODO: Implementation for blocked users

            // Gets time of meeting and checks to see if it is within the user's time preference
            Date date = mr.getMeeting().getDate();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            int hourOfDay = calendar.get(Calendar.HOUR_OF_DAY);

            sql = "SELECT pref_time FROM users WHERE user_id = ?";
            String userTime = jdbcTemplate.query(sql, new Object[]{userId}, (rs) -> {
                if(rs.next()){
                    return rs.getString("pref_time");
                }
                else{
                    return "none";
                }
            });

            if (userTime == null){
                userTime = "none";
            }

            if(userTime.equals("morning")){
                if(hourOfDay >= 7 && hourOfDay <= 12){
                    mr.addTimePts();
                }
            }
            else if(userTime.equals("afternoon")){
                if(hourOfDay >= 12 && hourOfDay <= 17){
                    mr.addTimePts();
                }
            }
            else if(userTime.equals("evening")){
                if(hourOfDay >= 17 && hourOfDay <= 21){
                    mr.addTimePts();
                }
            }
            else if(userTime.equals("night")){
                if(hourOfDay >= 21 || hourOfDay <= 7){
                    mr.addTimePts();
                }
            }

            // Get friends list and see if their friend is participating in the meeting
            // Should get the friend ids that are involved in this meeting
            sql = "SELECT user_id FROM user_meeting " +
                    "WHERE meeting_id = ? AND user_id = " +
                    "(SELECT u.user_id FROM users u " +
                    "JOIN friends f ON u.user_id = f.user2_id OR u.user_id = f.user1_id " +
                    "WHERE (f.user1_id = ? OR f.user2_id = ?) AND u.user_id != ?)";

            List<Long> friendIds = jdbcTemplate.query(sql, new Object[]{meetingId, userId, userId, userId}, (rs, rowNum) ->
                    rs.getLong("user_id")
            );

            if(!friendIds.isEmpty()){
                mr.addFriendPts();
            }

            // Get tutor rating
            sql = "SELECT COUNT(*) as count, SUM(rating) as ratingSum FROM tutor_rating " +
                    "WHERE user_id = " +
                    "(SELECT user_id FROM meeting WHERE meeting_id = ?)" +
                    " GROUP BY user_id";

            Double rating = jdbcTemplate.query(sql, new Object[]{meetingId}, (rs) -> {
                if (rs.next()) {
                    long count = rs.getLong("count");
                    int ratingSum = rs.getInt("ratingSum");

                    //Checks to see if there are ratings
                    if (count != 0) {
                        return (double) ratingSum / count;
                    } else {
                        return 0.0;
                    }
                } else {
                    return 0.0;
                }
            });

            // Checks to see if rating exists
            if(rating == null){
                rating = 0.0;
            }
            mr.addTutorRatingPts(rating);

            mr.totalPoints();
        }


        // Sorts by total points then returns a list of six Meetings
        recList.sort(Comparator.comparing(MeetingReccomendations::getTotalPts).reversed());
        int count = 0;
        for(MeetingReccomendations r : recList){
            if(count >= 6){
                break;
            }
            meetings.add(r.getMeeting());
            count++;
        }

        /*for(Meeting m : meetings){
            System.out.println(m.getId());
        }*/

        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<User>> getRecUserList(@PathVariable Long userId)
    {
        List<User> users = new ArrayList<>();
        // Get all users besides current user
        String sql = "SELECT * FROM users " +
                "WHERE user_id NOT IN " +
                "(SELECT DISTINCT user1_id FROM friends" +
                " UNION" +
                " SELECT DISTINCT user2_id FROM friends)";

        List<UserRecommendations> recList = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) ->
                new UserRecommendations(
                        new User(
                                rs.getLong("user_id"),
                                rs.getString("username"),
                                rs.getString("email_address"),
                                rs.getString("password"),
                                rs.getBoolean("istutor"),
                                rs.getString("nameFirst"),
                                rs.getString("nameLast"),
                                rs.getString("areaofstudy"),
                                rs.getString("pref_time"),
                                rs.getString("pre_meeting_type")
                        )
                )
        );

        for(UserRecommendations ur : recList){
            Long user2Id = ur.getUser().getId();

            // Gets other user's course IDs

            sql = "SELECT course_id FROM courses JOIN usercourses USING(course_id)"
                    + " WHERE user_id = ?";
            List<Long> otherUserCourses = jdbcTemplate.query(sql, new Object[]{user2Id}, new RowMapper<Long>() {
                public Long mapRow(ResultSet rs, int rowNum) throws SQLException {
                    return rs.getLong("course_id");
                }
            });

            // Gets user course IDs
            sql = "SELECT course_id FROM courses JOIN usercourses USING(course_id)"
                    + " WHERE user_id = ?";
            List<Long> userCourses = jdbcTemplate.query(sql, new Object[]{userId}, new RowMapper<Long>() {
                public Long mapRow(ResultSet rs, int rowNum) throws SQLException {
                    return rs.getLong("course_id");
                }
            });

            // For this one, if they have multiple of the same course, it will stack
            for(Long l1 : otherUserCourses){
                for(Long l2 : userCourses){
                    if(l1 != null && l2 != null){
                        if(l1.equals(l2)){
                            ur.addCoursePts();
                        }
                    }

                }
            }

            // Area of Study
            // Gets other user's area of study
            sql = "SELECT areaofstudy FROM users WHERE user_id = ?";
            String otherUserSubjectCsv = jdbcTemplate.queryForObject(sql, new Object[]{user2Id}, String.class);

            // Gets our user's area of study
            sql = "SELECT areaofstudy FROM users WHERE user_id = ?";
            String userSubjectCsv = jdbcTemplate.queryForObject(sql, new Object[]{userId}, String.class);

            // Stacks as well
            if(userSubjectCsv != null && otherUserSubjectCsv != null) {
                String[] otherUserSubjectList = otherUserSubjectCsv.split(",");
                String[] userSubjectList = userSubjectCsv.split(",");
                for (String s1 : userSubjectList) {
                    for(String s2 : otherUserSubjectList){
                        if (s1.equalsIgnoreCase(s2)) {
                            ur.addAreaOfStudyPts();
                        }
                    }

                }
            }
            else{
                System.out.println("THIS HAD NO ROWS");
            }

            String otherUserTime = ur.getUser().getPrefTime();
            sql = "SELECT pref_time FROM users WHERE user_id = ?";
            String userTime = jdbcTemplate.query(sql, new Object[]{user2Id}, (rs) -> {
                if(rs.next()){
                    return rs.getString("pref_time");
                }
                else{
                    return "none";
                }
            });

            if (!(userTime == null || otherUserTime == null)){
                if(userTime.equals("morning")){
                    if(userTime.equalsIgnoreCase(otherUserTime)){
                        ur.addTimePts();
                    }
                }
            }

            // Tutor Rating
            if(ur.getUser().isUserType()){
                sql = "SELECT COUNT(*) as count, SUM(rating) as ratingSum FROM tutor_rating " +
                        "WHERE user_id = ? GROUP BY user_id";

                Double rating = jdbcTemplate.query(sql, new Object[]{user2Id}, (rs) -> {
                    if (rs.next()) {
                        long count = rs.getLong("count");
                        int ratingSum = rs.getInt("ratingSum");

                        //Checks to see if there are ratings
                        if (count != 0) {
                            return (double) ratingSum / count;
                        } else {
                            return 0.0;
                        }
                    } else {
                        return 0.0;
                    }
                });

                // Checks to see if rating exists
                if(rating == null){
                    rating = 0.0;
                }
                ur.addTutorRatingPts(rating);
            }
            ur.totalPoints();

        }
        recList.sort(Comparator.comparing(UserRecommendations::getTotalPts).reversed());
        int count = 0;
        for(UserRecommendations u : recList){
            if(count >= 6){
                break;
            }
            users.add(u.getUser());
            count++;
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    }


}

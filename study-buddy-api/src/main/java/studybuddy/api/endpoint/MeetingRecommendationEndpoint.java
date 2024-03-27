package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingReccomendations;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import studybuddy.api.utils.JwtUtil;

import java.util.*;

@RestController
@RequestMapping("/meetingRec")
public class MeetingRecommendationEndpoint {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Meeting>> getReccomendationList(@PathVariable Long userId)
    {
        List<Meeting> meetings = new ArrayList<>();

        // Get all meetings that the user is not already a part of
        String sql = "SELECT * FROM meeting " +
                "WHERE meeting_id != " +
                "(SELECT meeting_id FROM meeting JOIN user_meeting USING(meeting_id)" +
                "WHERE user_id = ?)";

        List<MeetingReccomendations> recList = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) ->
                new MeetingReccomendations(
                        new Meeting(
                                rs.getLong("meeting_id"),
                                rs.getDate("meeting_date"),
                                rs.getString("meeting_description"),
                                rs.getString("meeting_link"),
                                rs.getString("meeting_location"),
                                rs.getString("meeting_title")
                        )
                )
        );

        // Get friends list and see if their friend is participating in the meeting
        for(MeetingReccomendations mr : recList){
            Long meetingId = mr.getMeeting().getId();
            //Should get the friend ids that are involved in this meeting
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
        }

        // Sorts by total points then returns a list of six Meetings
        recList.sort(Comparator.comparing(MeetingReccomendations::getTotalPts).reversed());
        for(int i = 0; i < 6; ++i){
            meetings.add(recList.get(i).getMeeting());
        }

        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }


}

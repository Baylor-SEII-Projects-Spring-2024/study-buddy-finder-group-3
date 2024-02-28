package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.Meeting;

import java.util.List;

@RestController
@RequestMapping("/meeting")
@CrossOrigin(origins = "http://localhost:3000")
public class MeetingEndpoint {

    @Autowired
    public studybuddy.api.meeting.meetingService meetingService;

    @PostMapping("/createMeeting")
    public ResponseEntity<?> createMeeting(@RequestBody Meeting meeting) {
        try {
            String creatorUsername = meeting.getCreatorUsername();
            if (creatorUsername == null || creatorUsername.isEmpty()) {
                return ResponseEntity.badRequest().body("Creator username is missing");
            }
            meetingService.createMeeting(meeting, creatorUsername);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create meeting");
        }
    }

    @GetMapping("/user/{userId}/meetings")
    public ResponseEntity<?> getMeetingsByUserId(@PathVariable Long userId) {
        try {
            List<Meeting> meetings = meetingService.getMeetingsByUserId(userId);
            return ResponseEntity.ok(meetings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get meetings for user");
        }
    }

}

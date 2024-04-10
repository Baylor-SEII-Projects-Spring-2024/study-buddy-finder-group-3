package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.Meeting;

import java.util.List;

@RestController
@RequestMapping("/meeting")
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
            List<Meeting> meetings = meetingService.getAcceptedMeetingsByUserId(userId);
            return ResponseEntity.ok(meetings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get meetings for user");
        }
    }

    @PatchMapping("/{meetingId}")
    public ResponseEntity<Meeting> updateMeeting(@PathVariable Long meetingId, @RequestBody Meeting meetingDetails) {
        Meeting updatedMeeting = meetingService.updateMeeting(meetingId, meetingDetails);
        return ResponseEntity.ok(updatedMeeting);
    }

    @DeleteMapping("/{meetingId}")
    public ResponseEntity<?> deleteMeeting(@PathVariable Long meetingId) {
        try {
            meetingService.deleteMeeting(meetingId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete meeting");
        }
    }

    @PatchMapping("/{meetingId}/updateStatus/{userid}")
    public ResponseEntity<?> updateMeetingStatus(@PathVariable Long meetingId, @RequestParam String status, @PathVariable Long userid) {
        try {

            meetingService.updateMeetingStatus(meetingId, userid, status);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update meeting status");
        }
    }

    @GetMapping("/user/{userId}/pending-invitations")
    public ResponseEntity<?> getPendingInvitations(@PathVariable Long userId) {
        try {
            List<Meeting> pendingInvitations = meetingService.getPendingInvitations(userId);
            return ResponseEntity.ok(pendingInvitations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get pending invitations");
        }
    }





}


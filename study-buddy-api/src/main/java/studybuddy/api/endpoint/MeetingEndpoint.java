package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingService;

import java.util.List;

import static studybuddy.api.meeting.MeetingService.log;

@RestController
@RequestMapping("/meeting")
public class MeetingEndpoint {

    @Autowired
    public MeetingService meetingService;

    @PostMapping("/createMeeting")
    public ResponseEntity<?> createMeeting(@RequestBody Meeting meeting) {
        log.info("Creating meeting: {}", meeting);
        try {
            String creatorUsername = meeting.getCreatorUsername();
            log.info("Creator username: {}", creatorUsername);
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






    public class MeetingWithAttendeesDTO {
        private Meeting meeting;
        private List<AttendeeDTO> attendees;

        public Meeting getMeeting() {
            return meeting;
        }

        public void setMeeting(Meeting meeting) {
            this.meeting = meeting;
        }

        public List<AttendeeDTO> getAttendees() {
            return attendees;
        }

        public void setAttendees(List<AttendeeDTO> attendees) {
            this.attendees = attendees;
        }
    }

    public class AttendeeDTO {
        private Long userId;
        private String inviteStatus;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getInviteStatus() {
            return inviteStatus;
        }

        public void setInviteStatus(String inviteStatus) {
            this.inviteStatus = inviteStatus;
        }
    }





}

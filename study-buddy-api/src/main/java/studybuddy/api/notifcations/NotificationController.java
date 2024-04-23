package studybuddy.api.notifcations;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class NotificationController {

    private final MeetingService meetingService;
    private final UserService userService;

    public NotificationController(MeetingService meetingService, UserService userService) {
        this.meetingService = meetingService;
        this.userService = userService;
    }

    //TODO: Add chat notifs
    @GetMapping("/user/{userId}/notifications")
    public ResponseEntity<?> getNotifications(@PathVariable Long userId) {
        try {
            List<Meeting> pendingInvitations = meetingService.getPendingInvitations(userId);
            List<User> friendRequests = userService.getFriendRequests(userId);
            // map to store notifications
            Map<String, Object> notifications = new HashMap<>();
            notifications.put("pendingInvitations", pendingInvitations);
            notifications.put("friendRequests", friendRequests);

            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get notifications");
        }
    }
}

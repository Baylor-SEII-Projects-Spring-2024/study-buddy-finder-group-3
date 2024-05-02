package studybuddy.api.meeting;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("testdb")
public class MeetingTests {

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Test
    @DisplayName("Testing create meeting...")
    void testCreateMeeting() {
        // Setup - create a user
        User creator = new User();
        creator.setUsername("creator");
        creator = userRepository.save(creator);

        // Create a meeting
        Meeting meeting = new Meeting();
        meeting.setTitle("Test Meeting");
        meeting.setDescription("This is a test meeting");
        meeting.setDate(new Date());
        meeting.setLocation("Virtual");
        meeting.setCreatorUsername(creator.getUsername());
        meeting.setInvitedUserIds(Collections.singletonList(creator.getId()));

        meetingService.createMeeting(meeting, creator.getUsername());

        // Verify the meeting was created and linked to the user
        List<Meeting> meetings = meetingService.getMeetingsByUserId(creator.getId());
        assertFalse(meetings.isEmpty());
        assertEquals("Test Meeting", meetings.get(0).getTitle());
    }


    @Test
    @DisplayName("Testing delete meeting by creator...")
    void testDeleteMeeting() {
        // Setup - create a user
        User creator = new User();
        creator.setUsername("creator");
        creator = userRepository.save(creator);

        // Create a meeting
        Meeting meeting = new Meeting();
        meeting.setTitle("Delete Test Meeting");
        meeting.setDescription("This is a test meeting for deletion");
        meeting.setDate(new Date());
        meeting.setLocation("Virtual");
        meeting.setCreatorUsername(creator.getUsername());
        meeting.setInvitedUserIds(Collections.singletonList(creator.getId()));

        // Persist the meeting
        meetingService.createMeeting(meeting, creator.getUsername());
        Meeting createdMeeting = meetingRepository.findMeetingsByUserId(creator.getId()).get(0);

        // Delete the meeting
        meetingService.deleteMeeting(createdMeeting.getId(), creator.getId());
        Long creatorId = creator.getId();

        // Verify the meeting is deleted
        Exception exception = assertThrows(RuntimeException.class, () -> {
            meetingService.getMeetingsByUserId(creatorId);
        });
        assertTrue(exception.getMessage().contains("Meeting not found"));
    }
}


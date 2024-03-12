package studybuddy.api.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.List;

@Service
public class meetingService {

    @Autowired
    public MeetingRepository meetingRepository;

    @Autowired
    public UserMeetingRepository userMeetingRepository;

    @Autowired
    public UserRepository userRepository;

    @Transactional
    public void createMeeting(Meeting meeting, String creatorUsername) {
        User creator = userRepository.findByUsername(creatorUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Meeting newMeeting = meetingRepository.save(meeting);

        // meeting creator entry
        UserMeeting creatorMeeting = new UserMeeting();
        creatorMeeting.setUser(creator);
        creatorMeeting.setMeeting(newMeeting);
        userMeetingRepository.save(creatorMeeting);

        // create link for each invited
        for (Long userId : meeting.getInvitedUserIds()) {
            User invitedUser = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found: " + userId));

            UserMeeting invitedUserMeeting = new UserMeeting();
            invitedUserMeeting.setUser(invitedUser);
            invitedUserMeeting.setMeeting(newMeeting);
            userMeetingRepository.save(invitedUserMeeting);
        }
    }

    public List<Meeting> getMeetingsByUserId(Long userId) {
        return meetingRepository.findMeetingsByUserId(userId);
    }

}
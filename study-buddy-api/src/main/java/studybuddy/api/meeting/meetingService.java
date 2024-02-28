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

        UserMeeting userMeeting = new UserMeeting();
        userMeeting.setUser(creator);
        userMeeting.setMeeting(newMeeting);
        userMeetingRepository.save(userMeeting);
    }

    public List<Meeting> getMeetingsByUserId(Long userId) {
        return meetingRepository.findMeetingsByUserId(userId);
    }

}
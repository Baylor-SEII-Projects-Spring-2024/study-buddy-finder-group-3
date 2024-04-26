package studybuddy.api.meeting;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studybuddy.api.endpoint.AuthEndpoint;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    @Autowired
    public MeetingRepository meetingRepository;

    @Autowired
    public UserMeetingRepository userMeetingRepository;

    @Autowired
    public UserRepository userRepository;
    public static final Logger log = LoggerFactory.getLogger(AuthEndpoint.class);

    @Transactional
    public void createMeeting(Meeting meeting, String creatorUsername) {
        User creator = userRepository.findByUsername(creatorUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        log.info("Creating meeting: {}", meeting);
        meeting.setUser(creator);
        Meeting newMeeting = meetingRepository.save(meeting);

        // meeting creator entry
        UserMeeting creatorMeeting = new UserMeeting();
        creatorMeeting.setUser(creator);
        creatorMeeting.setMeeting(newMeeting);
        creatorMeeting.setInviteStatus("Accepted");
        // creatorMeeting.setHost(true);
        userMeetingRepository.save(creatorMeeting);

        // create link for each invited
        for (Long userId : meeting.getInvitedUserIds()) {
            User invitedUser = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found: " + userId));

            UserMeeting invitedUserMeeting = new UserMeeting();
            invitedUserMeeting.setUser(invitedUser);
            invitedUserMeeting.setMeeting(newMeeting);
            invitedUserMeeting.setInviteStatus("Pending");
            //invitedUserMeeting.setHost(false);
            userMeetingRepository.save(invitedUserMeeting);
        }
    }

    public List<Meeting> getMeetingsByUserId(Long userId) {
        List<Meeting> meetings = meetingRepository.findMeetingsByUserId(userId);
        meetings.forEach(meeting -> {
            List<UserMeeting> userMeetings = userMeetingRepository.findByMeetingId(meeting.getId());

            List<Long> attendeeUserIds = userMeetings.stream()
                    .map(um -> um.getUser().getId())
                    .collect(Collectors.toList());
            meeting.setAttendeeUserIds(attendeeUserIds);
        });
        return meetings;
    }

    @Transactional
    public Meeting updateMeeting(Long meetingId, Meeting updatedMeetingDetails) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found: " + meetingId));

        if (updatedMeetingDetails.getTitle() != null) {
            meeting.setTitle(updatedMeetingDetails.getTitle());
        }
        if (updatedMeetingDetails.getDescription() != null) {
            meeting.setDescription(updatedMeetingDetails.getDescription());
        }
        if (updatedMeetingDetails.getDate() != null) {
            meeting.setDate(updatedMeetingDetails.getDate());
        }
        if (updatedMeetingDetails.getLocation() != null) {
            meeting.setLocation(updatedMeetingDetails.getLocation());
        }
        if (updatedMeetingDetails.getLink() != null) {
            meeting.setLink(updatedMeetingDetails.getLink());
        }

        return meetingRepository.save(meeting);
    }

    @Transactional
    public void deleteMeeting(Long meetingId) {
        List<UserMeeting> userMeetings = userMeetingRepository.findByMeetingId(meetingId);
        userMeetingRepository.deleteAll(userMeetings);

        meetingRepository.deleteById(meetingId);
    }

    public void updateMeetingStatus(Long meetingId, Long userId, String status) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));

        Optional<User> user = userRepository.findById(userId);
        UserMeeting userMeeting = userMeetingRepository.findByMeetingAndUser(meeting, user);

        userMeeting.setInviteStatus(status);
        userMeetingRepository.save(userMeeting);
    }

    public List<Meeting> getPendingInvitations(Long userId) {
        List<Meeting> pendingInvitations = new ArrayList<>();
        List<UserMeeting> userMeetings = userMeetingRepository.findByUserIdAndInviteStatus(userId, "Pending");

        for (UserMeeting userMeeting : userMeetings) {
            pendingInvitations.add(userMeeting.getMeeting());
        }

        return pendingInvitations;
    }


    public List<Meeting> getAcceptedMeetingsByUserId(Long userId) {
        List<UserMeeting> acceptedUserMeetings = userMeetingRepository.findByUserIdAndInviteStatus(userId, "Accepted");

        // convert and remove dupes
        List<Meeting> meetings = acceptedUserMeetings.stream()
                .map(UserMeeting::getMeeting) // extract meeting
                .distinct()
                .collect(Collectors.toList());

        // for each attach attending
        meetings.forEach(meeting -> {
            List<UserMeeting> userMeetings = userMeetingRepository.findByMeetingId(meeting.getId());
            List<Long> attendeeUserIds = userMeetings.stream()
                    .map(um -> um.getUser().getId()) // get id from user meetingobj
                    .collect(Collectors.toList());
            meeting.setAttendeeUserIds(attendeeUserIds);
        });

        return meetings;
    }
}
package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studybuddy.api.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserMeetingRepository extends JpaRepository<UserMeeting, Long> {
    List<UserMeeting> findByMeetingId(Long meetingId);

    List<UserMeeting> findByMeeting(Meeting meeting);

    List<UserMeeting> findByUserIdAndInviteStatus(Long userId, String pending);

    UserMeeting findByMeetingAndUser(Meeting meeting, Optional<User> user);

    List<UserMeeting> findByUserId(Long userId);
}
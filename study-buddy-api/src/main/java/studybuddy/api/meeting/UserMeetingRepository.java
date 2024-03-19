package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserMeetingRepository extends JpaRepository<UserMeeting, Long> {
    List<UserMeeting> findByMeetingId(Long meetingId);
}
package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMeetingRepository extends JpaRepository<UserMeeting, Long> {
}

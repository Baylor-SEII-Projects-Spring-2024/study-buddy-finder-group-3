package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    @Query("SELECT um.meeting FROM UserMeeting um WHERE um.user.id = :userId")
    List<Meeting> findMeetingsByUserId(@Param("userId") Long userId);
}

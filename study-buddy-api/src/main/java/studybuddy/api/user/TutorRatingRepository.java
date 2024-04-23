package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TutorRatingRepository extends JpaRepository<TutorRating, Long> {
    @Query("SELECT tr.comment, tr.rating FROM TutorRating tr WHERE tr.user.id = ?1")
    List<String> findByUserId(Long user_id);
}
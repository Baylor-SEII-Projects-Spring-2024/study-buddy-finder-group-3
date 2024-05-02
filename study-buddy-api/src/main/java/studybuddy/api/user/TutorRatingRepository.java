package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TutorRatingRepository extends JpaRepository<TutorRating, Long> {
    @Query("SELECT tr.comment, tr.rating FROM TutorRating tr WHERE tr.user.id = ?1")
    List<String> findByUserId(Long user_id);

    @Query("SELECT tr.comment, tr.rating FROM TutorRating tr WHERE tr.tutor.id = ?1")
    List<String> findByTutorId(Long user_id);

    @Query("SELECT tr FROM TutorRating tr WHERE tr.user.id = ?1 AND tr.tutor.id = ?2")
    Optional<TutorRating> findByUserIdAndTutorId(Long user_id, Long tutor_id);
}
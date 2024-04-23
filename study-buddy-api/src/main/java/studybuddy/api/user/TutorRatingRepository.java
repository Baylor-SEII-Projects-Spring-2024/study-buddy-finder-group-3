package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TutorRatingRepository extends JpaRepository<TutorRating, Long> {
    Optional<List<TutorRating>> findByUserId(Long userId);
}
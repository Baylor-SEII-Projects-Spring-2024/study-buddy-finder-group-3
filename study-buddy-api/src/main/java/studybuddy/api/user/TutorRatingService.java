package studybuddy.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorRatingService {
    @Autowired
    private TutorRatingRepository tutorRatingRepository;

    public List<String> getTutorRatingByUserId(Long userid) {
        return tutorRatingRepository.findByUserId(userid);
    }
}

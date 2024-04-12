package studybuddy.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // bcrypt import >:)


import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TutorRatingRepository tutorRatingRepository;

    //TODO: hash password with bcrypt when user created
    //public User encryptPassword(User user) {
    public String encryptPassword(String pass) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(pass);
        return hashedPassword;
        //String hashedPassword = encoder.encode(user.getPassword());
        //user.setPassword(hashedPassword);
        //return userRepository.save(user);
    }



    public Optional<User> findUser(Long userId) {
        return userRepository.findById(userId);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmailAddress(email);
    }

    public boolean addTutorReview(Long tutorId, Long userId, int rating, String comment) {
        try {
            // make sure marked as tutor
            Optional<User> tutorOptional = userRepository.findById(tutorId);
            if (!tutorOptional.isPresent() || !tutorOptional.get().getIsTutor()) {
                throw new IllegalArgumentException("Invalid tutor ID or user is not a tutor");
            }

            //  user exists
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                throw new IllegalArgumentException("Invalid user ID");
            }

            // save rating
            TutorRating tutorRating = new TutorRating();
            tutorRating.setUser(userOptional.get());
            tutorRating.setRating(rating);
            tutorRating.setComment(comment);

            tutorRatingRepository.save(tutorRating);
            return true;
        } catch (Exception e) {
            // TODO: log error
            return false;
        }

    }

}

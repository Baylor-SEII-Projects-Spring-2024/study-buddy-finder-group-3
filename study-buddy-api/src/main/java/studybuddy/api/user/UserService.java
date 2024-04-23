package studybuddy.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import studybuddy.api.endpoint.GetFriendsEndpoint;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TutorRatingRepository tutorRatingRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> getFriendRequests(Long userId) {
        String sql = "SELECT u.* FROM users u JOIN friends_request fr ON u.user_id = fr.userfrom_id WHERE fr.userto_id = ?";
        return jdbcTemplate.query(sql, new GetFriendsEndpoint.UserRowMapper(), userId);
    }

    public static class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();

            user.setId(rs.getLong("user_id"));
            user.setAreaOfStudy(rs.getString("areaofstudy"));
            user.setEmailAddress(rs.getString("email_address"));
            user.setNameFirst(rs.getString("namefirst"));
            user.setNameLast(rs.getString("namelast"));
            user.setPassword(rs.getString("password"));
            user.setUserType(rs.getBoolean("istutor"));
            user.setUsername(rs.getString("username"));
            user.setProfilePic(rs.getBytes("profilepic"));
            user.setAboutMe(rs.getString("about_me"));

            return user;
        }
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
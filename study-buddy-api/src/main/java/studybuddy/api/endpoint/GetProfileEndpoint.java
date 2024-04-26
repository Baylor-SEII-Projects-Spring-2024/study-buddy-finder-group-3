package studybuddy.api.endpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import studybuddy.api.user.TutorRating;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

import java.io.IOException;
import java.sql.Types;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
public class GetProfileEndpoint {

    private static final Logger log = LoggerFactory.getLogger(AuthEndpoint.class);
    @Autowired
    private UserService userService;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    public GetProfileEndpoint(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long userId) {
        return userService.findUser(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/updateProfile/{userId}")
    public boolean updateProfile(@PathVariable Long userId, @RequestBody AuthEndpoint.UserReq userRequest) {
        //BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        //String hashedPassword = encoder.encode(userRequest.getPassword());

        log.info("Update user using: {}", userRequest);
        log.info("Updating user profile with userId={}, areaofstudy={}, email={}, firstName={}, lastName={}, username={}",
                userId, userRequest.getAreaOfStudy(), userRequest.getEmail(), userRequest.getFirstName(),
                userRequest.getLastName(), userRequest.getUsername());



        jdbcTemplate.update("UPDATE users SET " +
                        "email_address = ?, " +
                        //"password = ?, " +
                        "areaofstudy = ?, " +
                        "namefirst = ?, " +
                        "namelast = ?, " +
                        //"istutor = ?, " +
                        "username = ?, " +
                        "pref_meeting_type = ?, " +
                        "pref_time = ?, " +
                        "about_me = ? " +
                        "WHERE user_id = ?",
                userRequest.getEmail(),
                //hashedPassword,
                userRequest.getAreaOfStudy(),
                userRequest.getFirstName(),
                userRequest.getLastName(),
                //userRequest.getIsTutor(),
                userRequest.getUsername(),
                userRequest.getPrefMeetingType(),
                userRequest.getPrefTime(),
                userRequest.getAboutMe(),
                userId);

        return true;
    }

    @PutMapping("/updateProfilePhoto/{userId}")
    public boolean updateProfilePhoto(@PathVariable Long userId, @RequestParam("photo") MultipartFile photo) {
        try {
            log.info("Updating profile photo for user with ID: {}", userId);

            // Check if the photo is not empty and meets the size requirement
            if (photo != null && !photo.isEmpty() && photo.getSize() <= 16777216) {
                // Convert MultipartFile to byte array
                byte[] photoBytes = photo.getBytes();

                log.info("Uploaded photo size: {} bytes", photo.getSize());

                // Update the user's profile photo in the database
                jdbcTemplate.update("UPDATE users SET profilepic = ? WHERE user_id = ?",
                        new Object[]{photoBytes, userId},
                        new int[]{Types.BLOB, Types.INTEGER});

                log.info("Profile photo updated successfully for user with ID: {}", userId);


                return true;
            } else {
                log.info("Invalid or missing photo for user with ID: {}", userId);
                return false; // Photo is either empty or exceeds the size limit
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false; // Error occurred while processing the photo
        }
    }
}

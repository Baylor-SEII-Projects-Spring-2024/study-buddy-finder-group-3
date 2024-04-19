package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.UserService;
import studybuddy.api.user.TutorRating;
import studybuddy.api.user.User;

@RestController
@RequestMapping("/tutor")
public class TutorEndpoint {

    @Autowired
    private UserService userService;

    @PostMapping("/{tutorId}/review")
    public ResponseEntity<?> submitReview(@PathVariable Long tutorId, @RequestBody ReviewRequest reviewRequest) {
        // TODO: validate the incoming data

        boolean success = userService.addTutorReview(tutorId, reviewRequest.getUserId(), reviewRequest.getRating(), reviewRequest.getComment());

        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Could not submit the review");
        }
    }

    // get req body
    static class ReviewRequest {
        private Long userId;
        private int rating;
        private String comment;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public int getRating() {
            return rating;
        }

        public void setRating(int rating) {
            this.rating = rating;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }

    }
}

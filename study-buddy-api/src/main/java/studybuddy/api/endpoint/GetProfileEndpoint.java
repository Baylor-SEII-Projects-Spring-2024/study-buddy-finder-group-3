package studybuddy.api.endpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

@RestController
@RequestMapping("/profile")
public class GetProfileEndpoint {

    private final UserService userService;

    @Autowired
    public GetProfileEndpoint(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> getUserProfile(@PathVariable Long userId) {
        return userService.findUser(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

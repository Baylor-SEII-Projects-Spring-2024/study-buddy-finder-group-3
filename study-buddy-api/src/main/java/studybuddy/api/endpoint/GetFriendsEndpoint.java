package studybuddy.api.endpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/friends")
public class GetFriendsEndpoint {

    private final UserService userService;

    @Autowired
    public GetFriendsEndpoint(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<User>> getUserProfile(@PathVariable Long userId) {



        return null;
    }
}

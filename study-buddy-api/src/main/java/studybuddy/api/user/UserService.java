package studybuddy.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // bcrypt import >:)


import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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
}

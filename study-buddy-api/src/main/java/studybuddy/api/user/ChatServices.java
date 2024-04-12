package studybuddy.api.user;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.endpoint.AuthEndpoint;
import studybuddy.api.meeting.Meeting;

import java.util.Optional;

@Service
public class ChatServices {
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    public UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(ChatServices.class);

    @Transactional
    public void createChat(Chat chat, String creatorUsername) {
        User creator = userRepository.findByUsername(creatorUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        chatRepository.save(chat);
    }

    public Optional<Chat> findChat(Long chatId) {
        return chatRepository.findById(chatId);
    }


    public Chat saveChat(Chat chat) {
        return chatRepository.save(chat);
    }

    public void deleteChat(Long chatId) {
        chatRepository.deleteById(chatId);
    }
}

package studybuddy.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatServices {
    @Autowired
    private ChatRepository chatRepository;
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

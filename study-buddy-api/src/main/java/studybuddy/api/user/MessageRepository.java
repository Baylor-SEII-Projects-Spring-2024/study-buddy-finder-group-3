package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderId(Long senderId);

    List<Message> findByRecipientId(Long recipientId);

    Optional<Message> findByIdAndSenderId(Long id, Long senderId);

    Optional<Message> findByIdAndRecipientId(Long id, Long recipientId);
}
package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Messages, Long> {
//    List<Messages> findBySenderId(Long senderId);
//
//    List<Messages> findByRecipientId(Long recipientId);
//
//    Optional<Messages> findByIdAndSenderId(Long id, Long senderId);
//
//    Optional<Messages> findByIdAndRecipientId(Long id, Long recipientId);
}
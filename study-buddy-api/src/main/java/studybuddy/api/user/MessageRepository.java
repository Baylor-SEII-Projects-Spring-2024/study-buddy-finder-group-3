package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Messages, Long> {

//    List<Messages> findByChatId(Long chat_id);

//    ResponseEntity<?> getByUser_idAndReceiver(Long s_id, Long r_id);

//    List<Messages> findBySenderId(Long senderId);
//
//    List<Messages> findByRecipientId(Long recipientId);
//
//    Optional<Messages> findByIdAndSenderId(Long id, Long senderId);
//
//    Optional<Messages> findByIdAndRecipientId(Long id, Long recipientId);
}
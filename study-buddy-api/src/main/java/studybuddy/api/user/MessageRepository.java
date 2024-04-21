package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Messages, Long> {

//    List<Messages> findAllByUserIdOrReceiverId(Long userId, Long receiverId);

}
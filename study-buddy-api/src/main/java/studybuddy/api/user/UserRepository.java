package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import studybuddy.api.courses.Courses;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmailAddress(String email);

//    User findAllById(Long user_id);

    @Query("SELECT u FROM User u WHERE u.username LIKE %:searchTerm%")
    List<User> findUsersContainingUsername(@Param("searchTerm") String searchTerm);

}

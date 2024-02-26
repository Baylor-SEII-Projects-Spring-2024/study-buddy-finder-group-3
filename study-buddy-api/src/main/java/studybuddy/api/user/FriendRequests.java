package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = FriendRequests.TABLE_NAME)
public class FriendRequests {
    public static final String TABLE_NAME = "FRIENDS_REQUEST";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REQUESTS_ID")
    Long id;

    @ManyToOne
    @JoinColumn(name = "USERTO_ID", referencedColumnName = "USER_ID" ,foreignKey = @ForeignKey(name = "FK_USERTO_ID"))
    User userTo_id;

    @ManyToOne
    @JoinColumn(name = "USERFROM_ID", referencedColumnName = "USER_ID" ,foreignKey = @ForeignKey(name = "FK_USERFROM_ID"))
    User userFrom_id;
}

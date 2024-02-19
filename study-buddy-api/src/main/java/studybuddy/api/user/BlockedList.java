package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = BlockedList.TABLE_NAME)
public class BlockedList {
    public static final String TABLE_NAME = "BLOCKEDLIST";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BLOCKEDLIST_ID")
    Long id;

    @ManyToOne
    @JoinColumn(name = "BLOCKER_ID", referencedColumnName = "USER_ID" ,foreignKey = @ForeignKey(name = "FK_BLOCKER_ID"))
    User blocker_id;

    @ManyToOne
    @JoinColumn(name = "BLOCKED_ID", referencedColumnName = "USER_ID" ,foreignKey = @ForeignKey(name = "FK_BLOCKED_ID"))
    User blocked_id;
}

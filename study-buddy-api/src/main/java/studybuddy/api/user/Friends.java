package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = Friends.TABLE_NAME)
public class Friends {
    public static final String TABLE_NAME = "FRIENDS";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FRIENDS_ID")
    Long id;

    @ManyToOne
    @JoinColumn(name = "USER1_ID", referencedColumnName = "USER_ID" ,foreignKey = @ForeignKey(name = "FK_USER1_ID"))
    User user1_id;

    @ManyToOne
    @JoinColumn(name = "USER2_ID", referencedColumnName = "USER_ID" ,foreignKey = @ForeignKey(name = "FK_USER2_ID"))
    User user2_id;
}

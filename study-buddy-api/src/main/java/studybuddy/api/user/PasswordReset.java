package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = PasswordReset.TABLE_NAME)
public class PasswordReset {
    public static final String TABLE_NAME = "password_reset";

    public PasswordReset() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RESET_ID")
    Long id;

    @ManyToOne
    @JoinColumn(name = "RESET_USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_RESET_USER_ID"))
    User user;

    @Column(name = "TOKEN")
    String token;

}

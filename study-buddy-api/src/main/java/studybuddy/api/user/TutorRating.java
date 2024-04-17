package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = TutorRating.TABLE_NAME)
public class TutorRating {
    public static final String TABLE_NAME = "TUTOR_RATING";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TUTOR_RATING_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_TUTOR_RATING_USER_ID"))
    private User user;

    @Column(name = "RATING")
    private int rating;

    @Column(name = "COMMENT", length = 500)
    private String comment;

    public void setRating(int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        this.rating = rating;
    }
}
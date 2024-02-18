package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = Meeting.TABLE_NAME)
public class Meeting {
    public static final String TABLE_NAME = "MEETING";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEETING_ID")
    Long id;

    @Column(name = "DESCRIPTION")
    String description;

    @Column(name = "MEETING_LOCATION")
    String location;
}

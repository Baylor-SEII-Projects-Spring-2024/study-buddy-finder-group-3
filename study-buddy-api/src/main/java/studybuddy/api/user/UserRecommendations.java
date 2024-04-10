package studybuddy.api.user;

import lombok.Getter;
import lombok.Setter;
import studybuddy.api.meeting.Meeting;

@Getter
public class UserRecommendations {
    @Setter
    private int coursePts;
    @Getter @Setter
    private int timePts;
    @Getter @Setter
    private int tutorRatingPts;
    @Getter @Setter
    private int meetingTypePts;
    @Getter @Setter
    private int areaOfStudyPts;
    @Getter
    private int totalPts;
    @Getter
    private User user;

    public UserRecommendations(User u){
        coursePts = 0;
        areaOfStudyPts = 0;
        timePts = 0;
        tutorRatingPts = 0;
        meetingTypePts = 0;
        totalPts = 0;
        user = u;
    }

    public void addCoursePts(){
        this.coursePts += 5;
    }
    public void addAreaOfStudyPts() {
        this.areaOfStudyPts += 4;
    }

    public void addTimePts(){
        this.timePts += 3;
    }

    public void addTutorRatingPts(double rating){
        if(rating >= 4.0){
            this.tutorRatingPts += 3;
        }
        else if(rating >= 3.0){
            this.tutorRatingPts += 2;
        }
        else if(rating >= 2.0){
            this.tutorRatingPts += 1;
        }
    }

    public void addMeetingTypePts(){
        this.meetingTypePts += 2;
    }

    public int totalPoints(){
        totalPts = coursePts + areaOfStudyPts + timePts + tutorRatingPts + meetingTypePts;
        return totalPts;
    }
}

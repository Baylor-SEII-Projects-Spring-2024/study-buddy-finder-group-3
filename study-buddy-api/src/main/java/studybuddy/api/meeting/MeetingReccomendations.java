package studybuddy.api.meeting;

import lombok.Getter;
import lombok.Setter;
import studybuddy.api.user.User;

import java.util.ArrayList;
import java.util.List;

public class MeetingReccomendations {
    @Getter @Setter
    private int subjectPts;
    @Getter @Setter
    private int timePts;
    @Getter @Setter
    private int tutorRatingPts;
    @Getter @Setter
    private int meetingTypePts;
    @Getter @Setter
    private int friendPts;
    @Getter
    private int totalPts;
    @Getter
    private Meeting meeting;

    public MeetingReccomendations(Meeting m){
        subjectPts = 0;
        timePts = 0;
        tutorRatingPts = 0;
        meetingTypePts = 0;
        friendPts = 0;
        totalPts = 0;
        meeting = m;
    }

    public void addSubjectPts(){
        this.subjectPts += 5;
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

    public void addFriendPts(){
        this.friendPts += 2;
    }

    public int totalPoints(){
        totalPts = subjectPts + timePts + tutorRatingPts + meetingTypePts + friendPts;
        return totalPts;
    }
}

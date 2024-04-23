package studybuddy.api.meeting;

import lombok.Getter;
import lombok.Setter;
import studybuddy.api.user.User;

import java.util.ArrayList;
import java.util.List;

public class MeetingReccomendations {
    @Getter @Setter
    private int coursePts;
    @Getter @Setter
    private int timePts;
    @Getter @Setter
    private int tutorRatingPts;
    @Getter @Setter
    private int meetingTypePts;
    @Getter @Setter
    private int friendPts;
    @Getter @Setter
    private int areaOfStudyPts;
    @Getter @Setter
    private int blockedPts;
    @Getter
    private int totalPts;
    @Getter
    private Meeting meeting;

    public MeetingReccomendations(Meeting m){
        coursePts = 0;
        areaOfStudyPts = 0;
        timePts = 0;
        tutorRatingPts = 0;
        meetingTypePts = 0;
        friendPts = 0;
        totalPts = 0;
        blockedPts = 0;
        meeting = m;
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

    public void addBlockedPts(){
        this.blockedPts -= 3;
    }

    public void addMeetingTypePts(){
        this.meetingTypePts += 2;
    }

    public void addFriendPts(){
        this.friendPts += 2;
    }

    public int totalPoints(){
        totalPts = coursePts + areaOfStudyPts + timePts + tutorRatingPts + meetingTypePts + friendPts;
        System.out.println("Total Points: " + totalPts + " - " + meeting.getTitle());
        return totalPts;
    }
}

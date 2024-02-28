import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/utils/authSlice.js"
import axios from "axios";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function DisplayMeetings() {
  const user = useSelector(selectUser);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetchMeetings(user.id);
    }
  }, [user]);

  const fetchMeetings = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/meeting/user/${userId}/meetings`);
      setMeetings(response.data);
    } catch (error) {
      console.error("Failed to fetch meetings", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Meetings
      </Typography>
      <List>
        {meetings.map((meeting) => (
          <ListItem key={meeting.id}>
            <ListItemText primary={meeting.title} secondary={new Date(meeting.date).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DisplayMeetings;

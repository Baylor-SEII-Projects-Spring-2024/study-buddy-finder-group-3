import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/utils/authSlice.js"
import { fetchMeetingsByUserId } from "../utils/meetingsSlice.js"
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Grid,
  Link,
} from "@mui/material"

function DisplayMeetings() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const meetings = useSelector((state) => state.meetings.meetings)
  const meetingsStatus = useSelector((state) => state.meetings.status)

  useEffect(() => {
    if (user && user.id && meetingsStatus === "idle") {
      dispatch(fetchMeetingsByUserId(user.id))
    }
  }, [dispatch, user, meetingsStatus])

  if (meetingsStatus === "loading") {
    return (
      <Typography variant="h6" gutterBottom>
        Loading meetings...
      </Typography>
    )
  }

  if (meetingsStatus === "failed") {
    return (
      <Typography variant="h6" gutterBottom>
        Error loading meetings.
      </Typography>
    )
  }

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Meetings
      </Typography>
      <List>
        {meetings.map((meeting) => (
          <ListItem key={meeting.id} divider>
            <Paper style={{ padding: "20px", width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">{meeting.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">{meeting.description}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    {meeting.link ? (
                      <Link
                        href={
                          meeting.link.startsWith("http://") ||
                          meeting.link.startsWith("https://")
                            ? meeting.link
                            : `https://${meeting.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Online Meeting
                      </Link>
                    ) : (
                      `Location: ${meeting.location || "Not specified"}`
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="overline">
                    Date: {new Date(meeting.date).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default DisplayMeetings

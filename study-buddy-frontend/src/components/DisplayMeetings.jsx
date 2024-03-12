import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/utils/authSlice.js"
import { fetchMeetingsByUserId } from "../utils/meetingsSlice.js"
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Container,
  Box,
  CircularProgress,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import VideocamIcon from "@mui/icons-material/Videocam"
import axios from "axios";
import MeetingModal from "./MeetingModal.jsx"

function DisplayMeetings() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const meetings = useSelector((state) => state.meetings.meetings)
  const meetingsStatus = useSelector((state) => state.meetings.status)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (user && user.id && meetingsStatus === "idle") {
      dispatch(fetchMeetingsByUserId(user.id))
    }
  }, [dispatch, user, meetingsStatus])

  const handleOpenModal = async (meeting) => {
    const attendeeProfiles = await Promise.all(
      meeting.attendeeUserIds
        .filter(id => id !== user.id) 
        .map(async (userId) => {
          try {
            const response = await axios.get(`http://localhost:8080/profile/${userId}`);
            console.log("profile res", response)
            return response.data; 
          } catch (error) {
            console.error("Error fetching attendee info:", error);
            return null;
          }
        })
    );
  
    setSelectedMeeting({
      ...meeting,
      attendeeProfiles: attendeeProfiles.filter(profile => profile !== null), 
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  if (meetingsStatus === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (meetingsStatus === "failed") {
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          Error loading meetings.
        </Typography>
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Meetings
      </Typography>
      <List>
        {meetings.map((meeting) => (
          <ListItem
            key={meeting.id}
            divider
            onClick={() => handleOpenModal(meeting)}
            sx={{ cursor: "pointer" }}
          >
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {meeting.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {meeting.description}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
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
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <VideocamIcon />
                        Join Online Meeting
                      </Link>
                    ) : (
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon />
                        <Typography variant="body2">
                          Location: {meeting.location || "Not specified"}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  <Grid item ml="auto">
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon />
                      <Typography variant="body2">
                        Date: {new Date(meeting.date).toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      {selectedMeeting && (
        <MeetingModal
          meeting={selectedMeeting}
          open={modalOpen}
          handleClose={handleCloseModal}
        />
      )}
    </Container>
  )
}

export default DisplayMeetings

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
  IconButton,
  Paper,
  Avatar,
  CardActionArea,
  CardMedia,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import VideocamIcon from "@mui/icons-material/Videocam"
import axios from "axios"
import MeetingModal from "./MeetingModal.jsx"
import DeleteIcon from "@mui/icons-material/Delete"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
import { toast } from "react-toastify"
import { API_URL } from "@/utils/config"
import Header from "./Header.jsx"
import CreateMeeting from "./CreateMeeting.jsx"

function DisplayMeetings() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const meetings = useSelector((state) => state.meetings.meetings)
  const meetingsStatus = useSelector((state) => state.meetings.status)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [meetingToDelete, setMeetingToDelete] = useState(null)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [recommendedMeetings, setRecommendedMeetings] = useState()
  const [createMeetingOpen, setCreateMeetingOpen] = useState(false)

  useEffect(() => {
    // need to do this
    setUnreadNotifications(3) //temp for display
  }, [])

  const handleOpenDeleteDialog = (meeting) => {
    setMeetingToDelete(meeting)
    setOpenDeleteDialog(true)
  }

  const updateMeetingInState = () => {
    dispatch(fetchMeetingsByUserId(user.id))
  }

  const handleOpenCreateMeeting = () => {
    setCreateMeetingOpen(true)
  }

  const handleCloseCreateMeeting = () => {
    setCreateMeetingOpen(false)
  }

  const handleDeleteMeeting = async () => {
    try {
      await axios.delete(`${API_URL}/meeting/${meetingToDelete.id}`)
      setOpenDeleteDialog(false)
      dispatch(fetchMeetingsByUserId(user.id))
      toast.success("Meeting successfully deleted")
    } catch (error) {
      console.error("Failed to delete meeting:", error)
    }

    setOpenDeleteDialog(false)
  }

  useEffect(() => {
    if (user && user.id && meetingsStatus === "idle") {
      dispatch(fetchMeetingsByUserId(user.id))
    }
  }, [dispatch, user, meetingsStatus])

  const handleOpenModal = async (meeting) => {
    const attendeeProfiles = await Promise.all(
      meeting.attendeeUserIds
        .filter((id) => id !== user.id)
        .map(async (userId) => {
          try {
            const response = await axios.get(`${API_URL}/profile/${userId}`)
            console.log("profile res", response)
            return response.data
          } catch (error) {
            console.error("Error fetching attendee info:", error)
            return null
          }
        })
    )

    setSelectedMeeting({
      ...meeting,
      attendeeProfiles: attendeeProfiles.filter((profile) => profile !== null),
    })
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedMeeting(null)
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
      <Header />
      <Box
        id="home-section"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: 2,
          boxSizing: "border-box",
          backgroundImage: "url(path-to-your-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Welcome {user && user.username ? user.username : ""}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ color: "text.secondary" }}
        >
          You have {unreadNotifications} unread notifications
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            "& > *": {
              margin: 1,
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCreateMeeting}
          >
            Create
          </Button>
          <Button variant="outlined" color="primary">
            Join
          </Button>
        </Box>
      </Box>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Your Meetings
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        blah blah blah
      </Typography>
      <Box id="meetings-section">
      {/* need ot add fitlers  */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {meetings.map((meeting) => (
          <Grid item xs={12} sm={6} md={4} key={meeting.id}>
            <Card>
              <CardActionArea onClick={() => handleOpenModal(meeting)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/path-to-meeting-image.jpg" // need to replace with random image idk what yet
                  alt={meeting.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {meeting.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {meeting.description}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Date: {new Date(meeting.date).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Location: {meeting.location || "Not specified"}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
      {/* beginning of rec meetings */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Recommended Meetings
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          align="center"
        >
          Meetings we thought may interest you based on your preferences.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {recommendedMeetings?.map((meeting) => (
            <Grid item xs={12} sm={6} md={4} key={meeting.id}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {meeting.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {meeting.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {meeting.areaOfStudy} - {meeting.course} - {meeting.mode}
                  </Typography>
                  <Button endIcon={<ArrowForwardIosIcon />} sx={{ mt: 2 }}>
                    View Meeting
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={2}>
          <Button>View All</Button>
        </Box>
      </Box>
      {/* end of recc meetings */}

      {selectedMeeting && (
        <MeetingModal
          meeting={selectedMeeting}
          open={modalOpen}
          handleClose={handleCloseModal}
          updateMeetingInParent={updateMeetingInState}
        />
      )}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this meeting?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteMeeting} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <CreateMeeting
        open={createMeetingOpen}
        onClose={handleCloseCreateMeeting}
      />
    </Container>
  )
}

export default DisplayMeetings

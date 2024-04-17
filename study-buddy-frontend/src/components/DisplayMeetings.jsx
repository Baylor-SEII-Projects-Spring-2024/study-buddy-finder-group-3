import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
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

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

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
  const [tutorId, setTutorId] = useState(null)
  const router = useRouter()

  const handleInviteClick = () => {
    router.push("/friends")
  }

  useEffect(() => {
    // need to do this
    setUnreadNotifications(3) //temp for display
  }, [])

  const [hoveredMeetingId, setHoveredMeetingId] = useState(null)
  // ref to keep track of the current timeout without causing re-renders
  const hoverTimeoutRef = useRef(null)

  const handleMouseEnter = (meetingId) => {
    // clear exissting timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    // new timeout
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMeetingId(meetingId)
    }, 1000)
  }

  const handleMouseLeave = () => {
    // clear the timeout if the mouse leaves the card
    clearTimeout(hoverTimeoutRef.current)
    setHoveredMeetingId(null)
  }

  // cleanup timeout when the component unmounts or when metting id changes
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [hoveredMeetingId])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    const offset = 64

    const position =
      section.getBoundingClientRect().top + window.pageYOffset - offset

    window.scrollTo({
      top: position,
      behavior: "smooth",
    })
  }

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

  useEffect(() => {
    const fetchRecommendedMeetings = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/recommendations/meetings/${user.id}`
        )
        setRecommendedMeetings(response.data)
      } catch (error) {
        console.error("Error fetching recommended meetings:", error)
      }
    }

    fetchRecommendedMeetings() // Call the function to fetch recommended meetings
  }, [user])

  const handleDeleteMeeting = async () => {
    try {
      await axios.delete(`${API_URL}/meeting/${meetingToDelete.id}`)
      setOpenDeleteDialog(false)
      dispatch(fetchMeetingsByUserId(user.id))
      toast.success("Meeting successfully deleted")
    } catch (error) {
      console.error("Failed to delete meeting:", error)
    }
    setTimeout(() => {
      scrollToSection("meetings-section")
    }, 100)
    setOpenDeleteDialog(false)
  }

  useEffect(() => {
    if (user && user.id && meetingsStatus === "idle") {
      dispatch(fetchMeetingsByUserId(user.id))
    }
  }, [dispatch, user, meetingsStatus])

  const handleOpenModal = async (meeting) => {
    //  attendeeUserIds is an array before proceeding
    console.log('meeting ob', meeting);
    const attendeeUserIds = meeting?.attendeeUserIds || [];
  
    const attendeeProfiles = await Promise.all(
      attendeeUserIds
        .filter((id) => id !== user.id) 
        .map(async (userId) => {
          try {
            const [profileResponse, isTutorResponse] = await Promise.all([
              axios.get(`${API_URL}/profile/${userId}`),
              axios.get(`${API_URL}/users/${userId}/is-tutor`)
            ]);
            if (isTutorResponse.data == true) {
              setTutorId(userId);
            }
            console.log("isTutorResponse",isTutorResponse);
            // if (isTutorResponse.data.isTutor) {
            //   response.data.isTutor = true;
            // }
            console.log("profile res", profileResponse);
            return profileResponse.data;
          } catch (error) {
            console.error("Error fetching attendee info:", error);
            return null; // null for errors fix later
          }
        })
    );
  
    // filter out any null profiles resulting from errors
    const validAttendeeProfiles = attendeeProfiles.filter((profile) => profile !== null);
  
    setSelectedMeeting({
      ...meeting,
      attendeeProfiles: validAttendeeProfiles,
    });
  
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setTutorId(null);
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
          alignItems: "flex-start",
          justifyContent: "center",
          height: "50vh",
          padding: 2,
          boxSizing: "border-box",
          backgroundImage: "url('/home-gradient.webp')",
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
              marginRight: 1,
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => scrollToSection("recommended-meetings")}
          >
            View Recommended Meetings
          </Button>
        </Box>
      </Box>
      <Box id="meetings-section" sx={{ height: "100vh", pt: "64px" }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Your Meetings
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Here are your upcoming meetings
        </Typography>
        {/* need ot add fitlers  */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {meetings.map((meeting) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={meeting.id}
              onMouseEnter={() => handleMouseEnter(meeting.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Card style={{ position: "relative" }}>
                {" "}
                <CardActionArea onClick={() => handleOpenModal(meeting)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/StudyBuddyLogo Background Removed.png" // need to replace with random image idk what yet
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
                {hoveredMeetingId === meeting.id && (
                  <IconButton
                    onClick={() => handleOpenDeleteDialog(meeting)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "red",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* beginning of rec meetings */}
      <Box id="recommended-meetings" sx={{ height: "100vh" }}>
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

      <Box
        id="friends-section"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Box sx={{ width: "60%" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Expand Your Network with Study Buddy
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Invite friends or peers to join Study Buddy and enhance your study
            experience.
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "start" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mx: 1 }}
              onClick={handleInviteClick}
            >
              Invite
            </Button>
            <Button variant="outlined" color="primary" sx={{ mx: 1 }}>
              View Requests
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "40%",
            height: 200,
            bgcolor: "grey.300",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" display="block" gutterBottom>
            add image eventually
          </Typography>
        </Box>
      </Box>

      {selectedMeeting && (
        <MeetingModal
          meeting={selectedMeeting}
          open={modalOpen}
          handleClose={handleCloseModal}
          updateMeetingInParent={updateMeetingInState}
          tutorId={tutorId}
        />
      )}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this meeting?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
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
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "@/utils/authSlice.js"
import { fetchMeetingsByUserId } from "../utils/meetingsSlice.js"
import { Box, Card, CardContent, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material"
import { Parallax } from "react-parallax"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import axios from "axios"
import MeetingModal from "./MeetingModal.jsx"
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
import { useTheme } from "@mui/material/styles"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useActivePage } from "@/utils/activePageContext"
import MeetingGrid from "./MeetingGrid.jsx"
import AllMeetingsModal from "./AllMeetingsModal.jsx"

//TODO: NEED TO REDUX THE RECOMMENDED MEETINGS ACCEPT

function DisplayMeetings() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const user = useSelector(selectUser)
  console.log("user", user)
  const meetings = useSelector((state) => state.meetings.meetings)
  const meetingsStatus = useSelector((state) => state.meetings.status)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [meetingToDelete, setMeetingToDelete] = useState(null)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)
  const [recommendedMeetings, setRecommendedMeetings] = useState()
  const [createMeetingOpen, setCreateMeetingOpen] = useState(false)
  // const [tutors, setTutorId] = useState(null)
  const [tutorIds, setTutorIds] = useState([]) 
  const router = useRouter()
  const unreadNotifications = useSelector(
    (state) => state.notifications.notificationCount
  )
  const { setActivePage } = useActivePage()
  const [creatorId, setCreatorId] = useState(null)
  const [isAllMeetingsModalOpen, setAllMeetingsModalOpen] = useState(false)

  const handleOpenAllMeetingsModal = () => {
    setAllMeetingsModalOpen(true)
  }

  const handleCloseAllMeetingsModal = () => {
    setAllMeetingsModalOpen(false)
  }

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting)
    setModalOpen(true)
    handleCloseAllMeetingsModal()
    setCreatorId(meeting?.user?.id)
  }

  const handleDeleteMeetingFromModal = (meeting) => {
    setMeetingToDelete(meeting)
    handleCloseAllMeetingsModal()
    setOpenDeleteDialog(true)
  }

  const handleInviteClick = () => {
    router.push("/friends")
  }

  const handleRequestNavigate = () => {
    setActivePage("requests")
    router.push("/friends")
  }

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
    })
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

  useEffect(() => {
    fetchRecommendedMeetings() // Call the function to fetch recommended meetings
  }, [user])

  const handleDeleteMeeting = async () => {
    try {
      await axios.delete(`${API_URL}/meeting/${meetingToDelete.id}/${user.id}`)
      setOpenDeleteDialog(false)
      dispatch(fetchMeetingsByUserId(user.id))
      toast.success("Meeting successfully deleted")
      fetchRecommendedMeetings()
    } catch (error) {
      console.error("Failed to delete meeting:", error)
    }
    setTimeout(() => {
      scrollToSection("meetings-section")
    }, 500)
    setOpenDeleteDialog(false)
  }

  useEffect(() => {
    if (user && user.id && meetingsStatus === "idle") {
      dispatch(fetchMeetingsByUserId(user.id))
    }
  }, [dispatch, user, meetingsStatus])

  const handleOpenModal = async (meeting, isJoinable) => {
    setCreatorId(meeting?.user?.id);
    const attendeeUserIds = meeting?.attendeeUserIds || [];
    let localTutorIds = []; 
    console.log("attendeeUserIds", attendeeUserIds)
    const attendeeProfiles = await Promise.all(
      attendeeUserIds
        .filter(id => id !== user.id)
        .map(async (userId) => {
          try {
            const [profileResponse, isTutorResponse] = await Promise.all([
              axios.get(`${API_URL}/profile/${userId}`),
              axios.get(`${API_URL}/users/${userId}/is-tutor`)
            ]);
            console.log("profileResponse", profileResponse.data)
            console.log("isTutorResponse", isTutorResponse.data)
            if (isTutorResponse.data === true) {
              console.log("is tutor in t")
              console.log("tutor is ", userId)
              localTutorIds.push(userId);
            }
            
            return profileResponse.data;
          } catch (error) {
            console.error("Error fetching attendee info:", error);
            return null;
          }
        })
    );

    console.log("localTutorIds", localTutorIds)
    const validAttendeeProfiles = attendeeProfiles.filter(profile => profile !== null);
  
    setSelectedMeeting({
      ...meeting,
      attendeeProfiles: validAttendeeProfiles,
      isJoinable: isJoinable,
      tutorIds: localTutorIds || []
    });

    
    setTutorIds(localTutorIds);
    setModalOpen(true);
  }

  
  const handleCloseModal = () => {
    tutorIds.length = 0; // Clear the tutor IDs array
    setModalOpen(false)
    setSelectedMeeting(null)
    fetchRecommendedMeetings()
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
    <>
        <Header />
        <Parallax bgImage={"./unlock-potential.png"} strength={300}>
        <Box
          id="home-section"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "30vh",
            marginTop: "64px",
            padding: 2,
            boxSizing: "border-box",
            backgroundColor: "rgba(255, 255, 255, 0)", // semi-transparent white background
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1,
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "text.primary", marginLeft: 15}}
          >
            Welcome {user && user.username ? user.username : ""}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "text.secondary", marginLeft: 15 }}
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
              marginLeft: 15
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
        </Parallax>
        <Box
          id="meetings-section"
          sx={{ minHeight: "100vh", pt: "64px", marginBottom: "64px", paddingLeft: 20, paddingRight: 20}}
        >
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Your Meetings
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Here are your upcoming meetings
          </Typography>
          <MeetingGrid
            meetings={meetings}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleOpenModal={handleOpenModal}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
            hoveredMeetingId={hoveredMeetingId}
            handleOpenAllMeetingsModal={handleOpenAllMeetingsModal}
          />
        </Box>
        {/* beginning of rec meetings */}
        <Parallax bgImage={"./unlock-potential.png"} strength={300}>
        <Box id="recommended-meetings" sx={{ height: "100vh", pt: "64px", padding: 20 ,backdropFilter: "blur(10px)"}}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Recommended Meetings
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
            align="center"
            paddingBottom={2}
          >
            Meetings we thought may interest you based on your preferences.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {recommendedMeetings && recommendedMeetings.length > 0 ? (
              recommendedMeetings.map((meeting) => (
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
                        {meeting.areaOfStudy} - {meeting.courseName}
                      </Typography>
                      <Button
                        endIcon={<ArrowForwardIosIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => handleOpenModal(meeting, true)}
                      >
                        View Meeting
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", 
                  justifyContent: "center", 
                  height: "30vh", 
                }}
              >
                <Typography variant="subtitle1">
                  There doesn't seem to be any meetings that you might be
                  interested in at the moment.
                </Typography>
                <SentimentDissatisfiedIcon sx={{ fontSize: 40 }} />
              </Box>
            )}
          </Grid>
        </Box>
        </Parallax>
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
          <Box sx={{ width: "60%", padding: 20}}>
            <Typography variant="h4" component="h2" gutterBottom>
              Expand Your Network
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Invite friends or peers as buddies and enhance your study
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
              <Button
                variant="outlined"
                color="primary"
                sx={{ mx: 1 }}
                onClick={handleRequestNavigate}
              >
                View Requests
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "40%",
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" display="block" gutterBottom>
              <Paper
                elevation={0}
                sx={{
                  marginRight: 10,
                  height: 300,
                  // width: "100%",
                  // display: "flex",
                  // alignItems: "center",
                  // justifyContent: "center",
                  // backgroundColor: "#fff",
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <img
                  src="/friends.png"
                  alt="friends"
                  style={{ width: "100%", height: "100%" }}
                />
              </Paper>
            </Typography>
          </Box>
        </Box>

        {selectedMeeting && (
          <MeetingModal
            meeting={selectedMeeting}
            open={modalOpen}
            handleClose={handleCloseModal}
            updateMeetingInParent={updateMeetingInState}
            tutors={tutorIds} // Ensure it defaults to an empty array if undefined
            creatorId={creatorId}
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
        <AllMeetingsModal
          open={isAllMeetingsModalOpen}
          handleClose={handleCloseAllMeetingsModal}
          meetings={meetings} // Pass all meetings to the modal
          onMeetingClick={handleMeetingClick}
          onDeleteMeeting={handleDeleteMeetingFromModal}
        />
      {/* </Container> */}
    </>
  )
}

export default DisplayMeetings

import FriendProfile from "./FriendsPage/FriendProfile"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/utils/authSlice.js"

import {
  List,
  ListItem,
  Typography,
  Link,
  Box,
  Modal,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Rating,
} from "@mui/material"
import { API_URL } from "@/utils/config"
import axios from "axios"
import { toast } from "react-toastify"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import isValid from "date-fns/isValid"
import VideocamIcon from "@mui/icons-material/Videocam"
import UserProfileModal from "./UserProfileModal"

function MeetingModal({
  meeting,
  open,
  handleClose,
  updateMeetingInParent,
  isInvitation = false,
  onMeetingAccepted,
  creatorId,
}) {
  console.log("meeting", meeting)
  const [friendProfileOpen, setFriendProfileOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedTitle, setEditedTitle] = useState(meeting?.title || "")
  const [editedDescription, setEditedDescription] = useState(
    meeting?.description || ""
  )
  const [editedLocation, setEditedLocation] = useState(meeting?.location || "")
  const [editedDate, setEditedDate] = useState(
    isValid(new Date(meeting?.date || "")) ? new Date(meeting.date) : new Date()
  )
  const [editedLink, setEditedLink] = useState(meeting?.link || "")
  const user = useSelector(selectUser)
  const [showReviewFields, setShowReviewFields] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const hasMeetingStarted = new Date() > new Date(meeting?.date)
  const [isCreator, setIsCreator] = useState(false)
  const [hasAlreadyReviewed, setHasAlreadyReviewed] = useState(false)
  const [selectedTutorIdForReview, setSelectedTutorIdForReview] = useState(null)
  const [unreviewedTutors, setUnreviewedTutors] = useState([])
  const [tutorIds, setTutorIds] = useState([])
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    if (!open) {
      setEditMode(false)
      setEditedTitle(meeting?.title)
      setEditedDescription(meeting?.description)
      setEditedLocation(meeting?.location)
      setEditedDate(meeting?.date)
    }
    setIsCreator(creatorId === user?.id)

    console.log("creatorId", creatorId, "user.id", user?.id)
    console.log(isCreator)
  }, [open, meeting])

  useEffect(() => {
    console.log("meeting", meeting)
    if (open) {
      console.log("check if already reviewied!!!!")
      checkIfAlreadyReviewed(meeting.tutorIds)
      setTutorIds(meeting.tutorIds)
    }
  }, [meeting, open])

  useEffect(() => {
    unreviewedTutors.forEach((tutorId) => {
      if (!userDetails[tutorId]) {
        fetch(`${API_URL}/users/${tutorId}`)
          .then((response) => response.json())
          .then((data) => {
            setUserDetails((prevDetails) => ({
              ...prevDetails,
              [tutorId]: data.username,
            }))
          })
          .catch((error) => console.error("Failed to fetch data: ", error))
      }
    })
  }, [unreviewedTutors])

  const handleDateChange = (newDate) => {
    setEditedDate(newDate)
  }

  const handleOpenFriendProfile = (user) => {
    setSelectedUser(user)
    setFriendProfileOpen(true)
  }

  const handleCloseFriendProfile = () => {
    setFriendProfileOpen(false)
  }

  const handleEdit = async () => {
    if (editMode) {
      const updatedMeeting = {
        title: editedTitle,
        description: editedDescription,
        date: editedDate,
      }

      if (editedLink) {
        updatedMeeting.link = editedLink
      } else {
        updatedMeeting.location = editedLocation
      }

      try {
        const response = await axios.patch(
          `${API_URL}/meeting/${meeting.id}`,
          updatedMeeting,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const savedMeeting = response.data
        updateMeetingInParent(savedMeeting)

        setEditedTitle(savedMeeting?.title || "")
        setEditedDescription(savedMeeting?.description || "")
        setEditedLocation(savedMeeting?.location || "")
        setEditedLink(savedMeeting?.link || "")
        setEditedDate(savedMeeting?.date || new Date(savedMeeting.date))

        toast.success("Meeting updated successfully")
        handleClose()

        console.log("Meeting updated successfully:", savedMeeting)
      } catch (error) {
        handleClose()

        console.error("Failed to update meeting:", error)
      }
    }
    setEditMode(!editMode)
  }
  // console.log("meeting", meeting)`

  const checkIfAlreadyReviewed = async (tutorIds) => {
    console.log("DO i make it?????")
    if (!Array.isArray(tutorIds)) {
      console.error("Invalid tutors data:", tutorIds)
      return // Exit if tutors is not an array
    }

    try {
      const responses = await Promise.all(
        tutorIds.map((tutorId) =>
          axios.get(
            `${API_URL}/tutor/${user.id}/has-already-reviewed/${tutorId}`
          )
        )
      )
      console.log("Is reviewed responses", responses)
      // Filter out tutors whose reviews do not exist based on the API response
      const newUnreviewedTutors = tutorIds.filter((tutorId, index) => {
        const response = responses[index]
        console.log("response", response.data, " for tutorId", tutorId)
        return response && response.data === false
      })

      console.log("new unreviewed tutors", newUnreviewedTutors)

      // Update state with tutors that have not been reviewed yet
      setUnreviewedTutors(newUnreviewedTutors)
      setHasAlreadyReviewed(newUnreviewedTutors.length !== tutorIds.length) // Update whether any reviews were found
    } catch (error) {
      console.error("Failed to check if user has already reviewed:", error)
    }
  }

  const submitReview = async (tutorId) => {
    if (user.id === tutorId) {
      toast.error("Cannot review yourself")
      return
    }

    try {
      const response = await axios.post(`${API_URL}/tutor/${tutorId}/review`, {
        userId: user.id,
        rating: rating,
        comment: comment,
      })

      toast.success("Review submitted successfully")
      // Re-check and update tutors list after submitting a review

      checkIfAlreadyReviewed(unreviewedTutors)

      setShowReviewFields(false) // Hide review fields after submission
      // Clear rating and comment fields after submission
      setRating(0)
      setComment("")
    } catch (error) {
      toast.error("Failed to submit review")
      console.error("Failed to submit review:", error)
    }
  }

  const handleAccept = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/meeting/${meeting.id}/updateStatus/${user.id}?status=Accepted`,
        { status: "Accepted" }
      )

      const updatedMeeting = response.data
      updateMeetingInParent(updatedMeeting)
      handleClose()
      toast.success("Meeting accepted successfully")
      onMeetingAccepted()
    } catch (error) {
      console.error("Failed to accept meeting:", error)
    }
  }

  const handleReject = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/meeting/${meeting.id}/updateStatus/${user.id}?status=Rejected`,
        { status: "Rejected" }
      )

      const updatedMeeting = response.data
      updateMeetingInParent(updatedMeeting)
      handleClose()
      toast.success("Meeting rejected successfully")
    } catch (error) {
      console.error("Failed to reject meeting:", error)
    }
  }

  const joinMeeting = async (meetingId) => {
    if (!meetingId || !user.id) {
      console.error("Meeting ID or User ID is undefined")
      return
    }

    try {
      console.log("Joining meeting", meetingId, user.id)
      const response = await axios.post(
        `${API_URL}/meeting/join/${meetingId}/${user?.id}`,
        {}
      )
      if (response.status === 200) {
        toast.success("Joined meeting successfully")
        updateMeetingInParent()
      }
    } catch (error) {
      console.error("Error joining meeting:", error)
      toast.error("Failed to join meeting")
    }
    handleClose()
  }

  const handleOpenReviewFields = (tutorId) => {
    setSelectedTutorIdForReview(tutorId)
    setShowReviewFields(true)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {editMode ? (
          <>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              sx={{ mb: 2, mt: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            {editedLink ? (
              <TextField
                fullWidth
                label="Link"
                variant="outlined"
                value={editedLink}
                onChange={(e) => setEditedLink(e.target.value)}
                sx={{ mb: 2 }}
              />
            ) : (
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Start Time"
                value={editedDate}
                minDateTime={new Date()}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: "100%", mt: 2 }}
              />
            </LocalizationProvider>
          </>
        ) : (
          <>
            <Typography variant="h6" component="h2">
              {meeting?.title || "No title"}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {meeting?.description || "No Description"}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {meeting?.link ? (
                <Link
                  href={
                    meeting?.link.startsWith("http://") ||
                    meeting?.link.startsWith("https://")
                      ? meeting?.link
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
                `Location: ${meeting?.location}`
              )}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Date: {new Date(meeting?.date).toLocaleString()}
            </Typography>
          </>
        )}

        {!isInvitation && isCreator && (
          <IconButton
            aria-label={editMode ? "save" : "edit"}
            onClick={handleEdit}
            sx={{ position: "absolute", right: 48, top: 8 }}
          >
            {editMode ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        )}

        {isInvitation && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleAccept} variant="contained" color="primary">
              Accept
            </Button>
            <Button onClick={handleReject} variant="outlined" color="secondary">
              Reject
            </Button>
          </Box>
        )}

        <List sx={{ maxHeight: 200, overflow: "auto" }}>
          {meeting?.attendeeProfiles &&
            meeting.attendeeProfiles.map((profile) => (
              <ListItem
                key={profile.username}
                button
                onClick={() => handleOpenFriendProfile(profile)}
              >
                <Typography variant="body2">
                  {profile.nameFirst} {profile.nameLast} ({profile.username})
                </Typography>
              </ListItem>
            ))}
        </List>
        {selectedUser && (
          <UserProfileModal
            open={friendProfileOpen}
            onClose={handleCloseFriendProfile}
            user={selectedUser}
          />
        )}
        {hasMeetingStarted &&
          unreviewedTutors.map(
            (tutorId) =>
              user.id !== tutorId &&
              userDetails[tutorId] && (
                <Button
                  key={tutorId}
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenReviewFields(tutorId)}
                >
                  Leave a Review for {userDetails[tutorId]}
                </Button>
              )
          )}

        {selectedTutorIdForReview && showReviewFields && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Leave a Review
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <TextField
              fullWidth
              label="Comment"
              multiline
              rows={4}
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            {showReviewFields && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => submitReview(selectedTutorIdForReview)}
              >
                Submit Review
              </Button>
            )}
          </Box>
        )}
        {meeting?.isJoinable && (
          <Button onClick={() => joinMeeting(meeting.id)}>Join Meeting</Button>
        )}
      </Box>
    </Modal>
  )
}

export default MeetingModal

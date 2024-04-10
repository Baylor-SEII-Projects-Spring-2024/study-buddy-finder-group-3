import FriendProfile from "./FriendsPage/FriendProfile"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import React, { useState, useEffect } from "react"
import {
  List,
  ListItem,
  Typography,
  Link,
  Box,
  Modal,
  IconButton,
  TextField,
} from "@mui/material"
import { API_URL } from "@/utils/config"
import axios from "axios"
import { toast } from "react-toastify"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import isValid from "date-fns/isValid"
import VideocamIcon from "@mui/icons-material/Videocam"

function MeetingModal({ meeting, open, handleClose, updateMeetingInParent }) {
  const [friendProfileOpen, setFriendProfileOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedTitle, setEditedTitle] = useState(meeting?.title || '');
  const [editedDescription, setEditedDescription] = useState(
    meeting?.description || ''
  )
  const [editedLocation, setEditedLocation] = useState(meeting?.location || '')
  const [editedDate, setEditedDate] = useState(
    isValid(new Date(meeting?.date || '')) ? new Date(meeting.date) : new Date()
  )
  const [editedLink, setEditedLink] = useState(meeting?.link || '')

  useEffect(() => {
    if (!open) {
      setEditMode(false)
      setEditedTitle(meeting?.title)
      setEditedDescription(meeting?.description)
      setEditedLocation(meeting?.location)
      setEditedDate(meeting?.date)
    }
  }, [open, meeting])

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

        setEditedTitle(savedMeeting?.title || '')
        setEditedDescription(savedMeeting?.description || '')
        setEditedLocation(savedMeeting?.location || '')
        setEditedLink(savedMeeting?.link || '')
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
            <Typography sx={{ mt: 2 }}>{meeting?.description || "No Description"}</Typography>
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

        <IconButton
          aria-label={editMode ? "save" : "edit"}
          onClick={handleEdit}
          sx={{ position: "absolute", right: 48, top: 8 }}
        >
          {editMode ? <SaveIcon /> : <EditIcon />}
        </IconButton>

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
          <FriendProfile
            open={friendProfileOpen}
            onClose={handleCloseFriendProfile}
            user={selectedUser}
          />
        )}
      </Box>
    </Modal>
  )
}

export default MeetingModal

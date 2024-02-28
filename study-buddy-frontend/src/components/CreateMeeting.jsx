import React, { useState } from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useSelector } from "react-redux"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

function CreateMeeting({ open, onClose }) {
  const user = useSelector(selectUser)
  const [meetingDate, setMeetingDate] = useState(new Date())
  const [meetingTitle, setMeetingTitle] = useState("")
  const [meetingDescription, setMeetingDescription] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [isOnlineMeeting, setIsOnlineMeeting] = useState(false)
  const [meetingLocation, setMeetingLocation] = useState()

  const handleOnlineMeetingChange = (event) => {
    setIsOnlineMeeting(event.target.checked)
    if (event.target.checked) {
      setMeetingLink("")
    } else {
      setMeetingLocation("")
    }
  }

  const handleDateChange = (event) => {
    setMeetingDate(event.target.value)
  }

  const handleTitleChange = (event) => {
    setMeetingTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setMeetingDescription(event.target.value)
  }

  const handleLinkChange = (event) => {
    setMeetingLink(event.target.value)
  }

  const handleLocationChange = (event) => {
    setMeetingLocation(event.target.value)
  }
  const handleSaveMeeting = async () => {
    if (!meetingTitle) {
      toast.error("Title cannot be empty")
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/meeting/createMeeting`,
        {
          title: meetingTitle,
          description: meetingDescription,
          date: meetingDate,
          link: meetingLink,
          location: meetingLocation,
          creatorUsername: user.username,
        }
      )

      if (response.status === 200) {
        toast.success("Meeting created successfully!")
        onClose()
      } else {
        toast.error("Failed to create meeting")
        console.error("Failed to create meeting", response)
      }
    } catch (error) {
      toast.error("Failed to create meeting")
      console.error("Error:", error)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-meeting-modal"
      aria-describedby="create-meeting-modal-description"
    >
      <Box sx={style}>
        <TextField
          margin="dense"
          id="meetingTitle"
          label="Add Title"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onChange={handleTitleChange}
        />
        <Box display="flex" alignItems="center">
          <TextField
            margin="dense"
            id="meetingLocation"
            label={isOnlineMeeting ? "Add link" : "Add location"}
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mt: 2, flex: 1 }}
            onChange={isOnlineMeeting ? handleLinkChange : handleLocationChange}
            value={isOnlineMeeting ? meetingLink : meetingLocation}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isOnlineMeeting}
                onChange={handleOnlineMeetingChange}
              />
            }
            label="Online Meeting"
            sx={{ ml: 2 }}
          />
        </Box>

        <TextField
          margin="dense"
          id="meetingDescription"
          label="Add description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mt: 2 }}
          onChange={handleDescriptionChange}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            sx={{ mt: 2, mr: 4 }}
            label="Start Time"
            value={meetingDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "200%", mt: 2, mr: 2 }} />
            )}
          />
          <DateTimePicker
            sx={{ mt: 2, ml: 5 }}
            label="End Time"
            value={meetingDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ ...datePickerStyle, mt: 2, ml: 2 }}
              />
            )}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleSaveMeeting}
          sx={{ mt: 2, float: "right" }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onClose}
          sx={{ mt: 2, float: "right" }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  )
}

export default CreateMeeting

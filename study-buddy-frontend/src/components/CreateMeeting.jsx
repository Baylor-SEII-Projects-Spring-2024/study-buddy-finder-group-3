import React, { useState, useEffect } from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import axios from "axios"
import { toast } from "react-toastify"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { selectUser } from "@/utils/authSlice.js"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { fetchMeetingsByUserId } from "../utils/meetingsSlice.js"
import { List, ListItem, ListItemText, Typography } from "@mui/material"
import { API_URL } from "@/utils/config"
import { isFuture } from "date-fns"

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
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [meetingDate, setMeetingDate] = useState(new Date())
  const [meetingTitle, setMeetingTitle] = useState("")
  const [meetingDescription, setMeetingDescription] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [isOnlineMeeting, setIsOnlineMeeting] = useState(false)
  const [meetingLocation, setMeetingLocation] = useState()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedInvites, setSelectedInvites] = useState([])
  const [courseSearchTerm, setCourseSearchTerm] = useState("")
  const [courseResults, setCourseResults] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isPrivateMeetings, setIsPrivateMeetings] = useState(true)
  const [isBadDate, setIsBadDate] = useState(false)

  const handleSearchChange = async (event) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    if (newSearchTerm.length > 1) {
      try {
        const response = await axios.get(
          `${API_URL}/users/${user.id}/search/${newSearchTerm}`
        )
        setSearchResults(response.data)
        console.log("response", response)
        console.log("searchResults", searchResults)
      } catch (error) {
        console.error("Failed to search users", error)
        setSearchResults([])
      }
    } else {
      setSearchResults([]) // clear if too shirt
    }
  }
  const handleCourseSearchChange = async (event) => {
    const newSearchTerm = event.target.value
    setCourseSearchTerm(newSearchTerm)
    console.log(newSearchTerm)
    if (newSearchTerm.length > 1) {
      try {
        const response = await axios.get(`${API_URL}/courses/names`, {
          params: { search: newSearchTerm },
        })
        console.log("response", response)
        setCourseResults(response.data)
        console.log("courseResults", courseResults)
      } catch (error) {
        console.error("Failed to fetch courses", error)
        setCourseResults([]) // clear results on error
      }
    } else {
      setCourseResults([]) // clear results if search term is too short
    }
  }

  const handleOnlineMeetingChange = (event) => {
    setIsOnlineMeeting(event.target.checked)
    if (event.target.checked) {
      setMeetingLink("")
    } else {
      setMeetingLocation("")
    }
  }

  const handleIsPrivateMeetingsChange = (event) => {
    setIsPrivateMeetings(event.target.checked)
  }
  const handleDateChange = (newValue) => {
    const now = new Date()
    if (isFuture(newValue)) {
      setMeetingDate(newValue)
    } else {
      toast.error("Please select a future date and time.", {
        toastId: "meetingDate",
      })
      setIsBadDate(true)
    }
  }

  const handleTitleChange = (event) => {
    const title = event.target.value
    if (title.length <= 100) {
      // lim
      setMeetingTitle(title)
    }
  }

  const handleDescriptionChange = (event) => {
    const description = event.target.value
    if (description.length <= 255) {
      // lim
      setMeetingDescription(description)
    }
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
    if (isBadDate) {
      toast.error("Please select a future date and time.", {
        toastId: "meetingDate",
      })
      return
    }

    try {
      const invitedUserIds = selectedInvites.map((invite) => invite.id)
      console.log("is private", isPrivateMeetings)
      const response = await axios.post(`${API_URL}/meeting/createMeeting`, {
        title: meetingTitle,
        description: meetingDescription,
        date: meetingDate,
        link: meetingLink,
        location: meetingLocation,
        creatorUsername: user.username,
        course: { id: selectedCourse?.id },
        private: isPrivateMeetings,
        userId: user.id,
        invitedUserIds,
      })

      if (response.status === 200) {
        toast.success("Meeting created successfully!")
        dispatch(fetchMeetingsByUserId(user.id))
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

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    setCourseSearchTerm(course.name)
    setCourseResults([])
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
          label="Add Title"
          variant="outlined"
          value={meetingTitle}
          onChange={handleTitleChange}
          fullWidth
          helperText={`${meetingTitle.length}/100`}
          FormHelperTextProps={{ style: { textAlign: "right" } }}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isPrivateMeetings}
              onChange={handleIsPrivateMeetingsChange}
            />
          }
          label="Private Meeting"
          sx={{ mt: 2 }}
        />

        <TextField
          label="Search Courses"
          type="text"
          fullWidth
          value={courseSearchTerm}
          onChange={handleCourseSearchChange}
          sx={{ mt: 2 }}
        />
        <List dense>
          {courseResults.map((course) => (
            <ListItem
              key={course.id}
              button
              onClick={() => handleCourseSelect(course)}
            >
              <ListItemText primary={course.name} />
            </ListItem>
          ))}
        </List>

        <TextField
          label="Add Description"
          variant="outlined"
          multiline
          rows={4}
          value={meetingDescription}
          onChange={handleDescriptionChange}
          fullWidth
          helperText={`${meetingDescription.length}/255`}
          FormHelperTextProps={{ style: { textAlign: "right" } }}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            sx={{ mt: 2, mr: 4 }}
            label="Start Time"
            value={meetingDate}
            onChange={handleDateChange}
            minDateTime={new Date()}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "200%", mt: 2, mr: 2 }} />
            )}
          />
        </LocalizationProvider>
        <TextField
          margin="dense"
          label="Invite Users"
          type="text"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mt: 2 }}
        />
        <List dense>
          {searchResults.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => setSelectedInvites([...selectedInvites, user])}
            >
              <ListItemText primary={user.username} />
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1">Selected Invites:</Typography>
        <List dense>
          {selectedInvites.map((invite) => (
            <ListItem key={invite.id}>
              <ListItemText primary={invite.username} />
              <Button
                onClick={() =>
                  setSelectedInvites(
                    selectedInvites.filter((i) => i.id !== invite.id)
                  )
                }
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>

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

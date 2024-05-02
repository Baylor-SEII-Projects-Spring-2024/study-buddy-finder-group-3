import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, Divider, FormControlLabel, MenuItem, Select, Switch, Typography } from "@mui/material"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import { API_URL } from "@/utils/config"
import ChangePassword from "@/components/ChangePassword"
import { toast } from "react-toastify"

function SettingsMain() {
  const [receiveEmails, setReceiveEmails] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [profile, setProfile] = useState("")
  const [userId, setUserId] = useState("")
  const [userIsTutor, setUserIsTutor] = useState(false)
  const [selectedAccountType, setSelectedAccountType] = useState("Student")
  //const [newAccountType, setNewAccountType] = useState("Student");

  const [theme, setTheme] = useState("light") // State to track selected theme
  const [notifications, setNotifications] = useState(false)
  const [emails, setEmailUpdates] = useState(false)
  const [newUserTypeIsTutor, setNewUserTypeIsTutor] = useState(false) // change to current type
  const [openChangePasswordModal, setChangePasswordModal] = useState(false)

  // useEffect(() => {
  //   if (!token || !user) {
  //     router.push("/")
  //   }
  // }, [token, router])

  useEffect(() => {
    // if (!token || !user) {
      // router.push("/")
    // } else {
      setUserId(user?.id)
      fetchProfileInfo(user?.id)
      fetchUserAccountType(user?.id)
    // }
  }, [ user])

  const fetchProfileInfo = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/profile/${userId}`)

      // Log the entire response data object
      console.log("Response data:", response.data);

      setProfile(response.data)

      // Extract courses from the areaOfStudy field
      let coursesArray = []
      if (response.data.areaOfStudy) {
        if (typeof response.data.areaOfStudy === "string") {
          // If areaOfStudy is a string, split it into an array
          coursesArray = response.data.areaOfStudy
            .split(",")
            .map((course) => course.trim())
        } else if (Array.isArray(response.data.areaOfStudy)) {
          // If areaOfStudy is already an array, use it directly
          coursesArray = response.data.areaOfStudy
        }
      }

      setSelectedCourses(coursesArray)
      console.log("User's initial courses are: ", response.data.areaOfStudy)
      console.log(
        `Fetched user profile with userId=${userId}, areaofstudy=${profile.areaOfStudy}, email=${profile.emailAddress}, firstName=${profile.nameFirst}, lastName=${profile.nameLast}, username=${profile.username}`
      )
    } catch (error) {
      console.error("Error fetching profile info:", error)
    }
  }

  const fetchUserAccountType = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}/is-tutor`)
      const isTutor = response.data
      setUserIsTutor(isTutor)
      setSelectedAccountType(isTutor ? "Tutor" : "Student")
    } catch (error) {
      console.error("Error fetching user account type:", error)
    }
  }

  // Handler for changing settings
  const handleEmailsChange = () => {
    setReceiveEmails(!receiveEmails)
  }

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode)
  }
  const handleThemeChange = (event) => {
    setTheme(event.target.value)
    // add logic here to switch the theme
  }

  const handleNotificationsChange = (event) => {
    setNotifications(event.target.checked)
    //  add logic here to handle notifications setting change
  }
  const handleEmailUpdatesChange = (event) => {
    setEmailUpdates(event.target.checked)
    //  add logic here to handle email updates setting change
  }

  const handleOpenChangePasswordModal = () => {
    setChangePasswordModal(true)
  }

  const handleCloseChangePasswordModal = () => {
    setChangePasswordModal(false)
  }
  /*
    const handleNewAccountTypeChange = (event) => {
        setNewAccountType(event.target.value);
    };*/
  const handleNewAccountTypeChange = (event) => {
    const newAccountType = event.target.value
    setUserIsTutor(newAccountType === "Tutor")
    setSelectedAccountType(newAccountType)
  }

  const handleSubmit = async () => {

    try {
      const data = {
      isTutor: selectedAccountType === "Tutor" ? true : false,
    }
      const response = await axios.put(`${API_URL}/users/${userId}/changeAccountType`, data)
      ;

      console.log("Response data:", response.data)

      toast.success("Acoount type changed successfully");



    } catch (error) {
      console.error("Error fetching profile info:", error)
    }
  }
  /*
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile/${userId}`)
      const data = {
        isTutor: selectedAccountType === "Tutor" ? true : false,
      } /*
        const data = {
            isTutor: newAccountType === "Tutor" ? true : false,
        };*//*

      setProfile(response.data)

      // Extract courses from the areaOfStudy field
      let coursesArray = []
      if (response.data.areaOfStudy) {
        if (typeof response.data.areaOfStudy === "string") {
          // If areaOfStudy is a string, split it into an array
          coursesArray = response.data.areaOfStudy
            .split(",")
            .map((course) => course.trim())
        } else if (Array.isArray(response.data.areaOfStudy)) {
          // If areaOfStudy is already an array, use it directly
          coursesArray = response.data.areaOfStudy
        }
      }

      setSelectedCourses(coursesArray)
      console.log("User's initial courses are: ", response.data.areaOfStudy)
      console.log(
        `Fetched user profile with userId=${userId}, areaofstudy=${profile.areaOfStudy}, email=${profile.emailAddress}, firstName=${profile.nameFirst}, lastName=${profile.nameLast}, username=${profile.username}`
      )
    } catch (error) {
      console.error("Error fetching profile info:", error)
    }
  }*/

  return (
    <Box
      id="home-section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: "25vw",
        height: "auto",
        padding: 2,
        overflow: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box
        border={1}
        borderColor="primary.main"
        borderRadius={8}
        padding={2}
        display="flex"
        flexDirection="column"
        width={"50vw"}
      >
        <Typography variant="h8" gutterBottom>
          Personal Information
        </Typography>
        <Divider />
        {/*
                <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                    <Avatar alt="Profile Picture" src={profile.profilePictureUrl}
                            style={{marginTop: '10px', marginBottom: '10px', marginLeft: '25px',  width: '100px', height: '100px'}}/>
                    <div style={{textAlign: 'right', marginRight: '25px'}}>
                        <Typography id="profile-container-title" variant="h4" component={"h2"}
                                    style={{marginTop: '10px', marginBottom: '10px'}}>
                            {profile.nameFirst} {profile.nameLast}
                        </Typography>
                        <Typography id="profile-container-title" variant="h5" component={"h2"}>
                            {profile.username}
                        </Typography>
                    </div>
                </div>*/}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {profile && profile.profilePictureUrl && (
            <Avatar
              alt="Profile Picture"
              src={profile.profilePictureUrl}
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "25px",
                width: "100px",
                height: "100px",
              }}
            />
          )}
          <div style={{ textAlign: "right", marginRight: "25px", flex: 1 }}>
            <Typography
              id="profile-container-title"
              variant="h4"
              component={"h2"}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {profile && `${profile.nameFirst} ${profile.nameLast}`}
            </Typography>
            <Typography
              id="profile-container-title"
              variant="h5"
              component={"h2"}
            >
              {profile && profile.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userIsTutor ? "Tutor" : "Student"}
            </Typography>
          </div>
        </div>
      </Box>
      <br />

      {/* Appearance  section */}
      {/* <Box
        border={1}
        borderColor="primary.main"
        borderRadius={8}
        padding={2}
        display="flex"
        flexDirection="column"
        width={"50vw"}
      >
        <Typography variant="h8" gutterBottom>
          Appearance
        </Typography>
        <Divider />
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h8" gutterBottom style={{ marginLeft: "5vh" }}>
            Theme
          </Typography>
          <Select
            value={theme}
            onChange={handleThemeChange}
            style={{ width: "150px", marginRight: "5vh" }}
          >
            label="Receive Email Updates"
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </div>
      </Box> */}

      {/* Notifications section */}
      <Box
        border={1}
        borderColor="primary.main"
        borderRadius={8}
        padding={2}
        display="flex"
        flexDirection="column"
        width={"50vw"}
      >
        <Typography variant="h8" gutterBottom>
          Notifications
        </Typography>
        <Divider />
        {/* <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={handleNotificationsChange}
            />
          }
          label="Receive notifications"
          labelPlacement="start"
          style={{ justifyContent: "space-between", paddingRight: "20px" }}
        /> */}
        <FormControlLabel
          control={
            <Switch checked={emails} onChange={handleEmailUpdatesChange} />
          }
          label="Receive Email Updates"
          labelPlacement="start"
          style={{ justifyContent: "space-between", paddingRight: "20px" }}
        />
      </Box>
      <br />

      {/* Account/Privacy section */}
      <Box
        border={1}
        borderColor="primary.main"
        borderRadius={8}
        padding={2}
        display="flex"
        flexDirection="column"
        width={"50vw"}
      >
        <Typography variant="h8" gutterBottom>
          Account and Security
        </Typography>
        <Divider />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h8" gutterBottom style={{ marginLeft: "5vh" }}>
            Change Password
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "5vh" }}
            onClick={handleOpenChangePasswordModal}
          >
            Edit
          </Button>
        </div>
        <ChangePassword
          open={openChangePasswordModal}
          onClose={handleCloseChangePasswordModal}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h8" gutterBottom style={{ marginLeft: "5vh" }}>
            Account type
          </Typography>
          <Select
            value={userIsTutor ? "Tutor" : "Student"}
            onChange={handleNewAccountTypeChange}
            style={{ width: "150px", marginRight: "5vh" }}
          >
            <MenuItem value="Tutor">Tutor</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </Select>
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsMain

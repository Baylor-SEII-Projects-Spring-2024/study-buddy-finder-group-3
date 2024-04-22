import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/utils/authSlice.js"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Divider,
} from "@mui/material"
import axios from "axios"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useRouter } from "next/router"
import { logout } from "@/utils/authSlice.js"
import { API_URL } from "@/utils/config"
import MeetingModal from "./MeetingModal"

const sections = [
  { title: "Home", id: "home-section" },
  { title: "Friends", id: "friends-section" },
]

function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null)
  const [meetingsAnchorEl, setMeetingsAnchorEl] = useState(null)

  const [pendingInvitations, setPendingInvitations] = useState([])
  const user = useSelector(selectUser)
  const [selectedMeeting, setSelectedMeeting] = useState(null)

  useEffect(() => {
    fetchPendingInvitations()
  }, [])

  const fetchPendingInvitations = async () => {
    try {
      // Fetch pending invitations from backend API
      const response = await fetch(
        `${API_URL}/meeting/user/${user.id}/pending-invitations`
      )
      const data = await response.json()
      setPendingInvitations(data)
    } catch (error) {
      console.error("Error fetching pending invitations:", error)
    }
  }

  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget)
  }

  const handleCloseSettingsMenu = () => {
    setSettingsAnchorEl(null)
  }

  const handleMeetingsClick = (event) => {
    setMeetingsAnchorEl(event.currentTarget)
  }

  const handleCloseMeetingsMenu = () => {
    setMeetingsAnchorEl(null)
  }

  const navigateToSetting = (settingPath) => {
    router.push(settingPath)
    handleCloseSettingsMenu() // close the menu after navigation
  }

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        await axios.post(`${API_URL}/auth/invalidateToken`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem("token");
        dispatch(logout());
        router.push("/");
    }
};


  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)

    if (section) {
      handleCloseMeetingsMenu()
      handleCloseSettingsMenu()
      const offset = 64
      const position =
        section.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({
        top: position,
        behavior: "smooth",
      })
    } else {
      router.push("/home").then(() => {
        window.requestAnimationFrame(() => {
          const section = document.getElementById(sectionId)
          if (section) {
            const offset = 64
            const position =
              section.getBoundingClientRect().top + window.pageYOffset - offset
            window.scrollTo({
              top: position,
              behavior: "smooth",
            })
          }
        })
      })
    }
  }

  const handleNotificationClick = (event, meeting) => {
    setAnchorEl(event.currentTarget)
    setSelectedMeeting(meeting)
  }

  const handleCloseNotificationMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar position="fixed" style={{ zIndex: 1201 }} color="primary">
        <Toolbar style={{ position: "relative" }}>
          <Box
            style={{ display: "flex", justifyContent: "flex-start", flex: 1 }}
          >
            {sections.map((section) => (
              <Button
                key={section.title}
                color="inherit"
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </Button>
            ))}
            <Button
              color="inherit"
              aria-controls="meetings-menu"
              aria-haspopup="true"
              onClick={handleMeetingsClick}
            >
              Meetings
            </Button>
            <Menu
              id="meetings-menu"
              anchorEl={meetingsAnchorEl}
              open={Boolean(meetingsAnchorEl)}
              onClose={handleCloseMeetingsMenu}
              PaperProps={{
                style: {
                  backgroundColor: "#628dbd", 
                  color: "white", 
                },
              }}
            >
              <MenuItem
                onClick={() => scrollToSection("meetings-section")}
                sx={{ padding: "10px 20px" }}
              >
                <Typography variant="inherit">Upcoming Meetings</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("recommended-meetings")}
                sx={{ padding: "10px 20px" }}
              >
                <Typography variant="inherit">Recommended Meetings</Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => console.log("Navigate to settings/courses")}
                sx={{ padding: "10px 20px" }}
              >
                <Typography variant="inherit">View All Meetings</Typography>
              </MenuItem>
            </Menu>
            <Button
              color="inherit"
              aria-controls="settings-menu"
              aria-haspopup="true"
              onClick={handleSettingsClick}
            >
              Settings
            </Button>
            <Menu
              id="settings-menu"
              anchorEl={settingsAnchorEl}
              keepMounted
              open={Boolean(settingsAnchorEl)}
              onClose={handleCloseSettingsMenu}
              PaperProps={{
                style: {
                  backgroundColor: "#628dbd", 
                  color: "white", 
                },
              }}
            >
              <MenuItem onClick={() => navigateToSetting("/profile")}>
                Account
              </MenuItem>
              <MenuItem onClick={() => navigateToSetting("/settings/courses")}>
                Courses
              </MenuItem>
              <MenuItem onClick={() => navigateToSetting("/settings/privacy")}>
                Privacy
              </MenuItem>
              <MenuItem onClick={() => navigateToSetting("/settings/help")}>
                Help
              </MenuItem>
            </Menu>
          </Box>

          <Box
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="/StudyBuddyLogo Background Removed.png"
              alt="Logo"
              style={{ maxHeight: "50px", cursor: "pointer" }}
              onClick={() => scrollToSection("home-section")}
            />
          </Box>

          <Box style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
            <IconButton
              color="inherit"
              aria-controls="notification-menu"
              aria-haspopup="true"
              onClick={handleNotificationClick}
            >
              <Badge badgeContent={pendingInvitations.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseNotificationMenu}
        >
          {pendingInvitations.length > 0 ? (
            pendingInvitations.map((invitation) => (
              <MenuItem
                key={invitation.id}
                onClick={(event) => handleNotificationClick(event, invitation)}
              >
                Meeting invite for meeting: {invitation.title}
              </MenuItem>
            ))
          ) : (
            <MenuItem>No pending invitations</MenuItem>
          )}
        </Menu>
      </AppBar>
      <MeetingModal
        meeting={selectedMeeting}
        open={Boolean(selectedMeeting)}
        handleClose={() => setSelectedMeeting(null)}
      />
    </>
  )
}

export default Header

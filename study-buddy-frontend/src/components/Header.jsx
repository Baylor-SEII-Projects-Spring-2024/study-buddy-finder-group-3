import React, { useState } from "react"
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
} from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { logout } from "@/utils/authSlice.js"

const sections = [
  { title: "Home", id: "home-section" },
  { title: "Meetings", id: "meetings-section" },
  { title: "Friends", id: "friends-section" },
]

function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)

  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null)

  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget)
  }

  const handleCloseSettingsMenu = () => {
    setSettingsAnchorEl(null)
  }

  const navigateToSetting = (settingPath) => {
    router.push(settingPath)
    handleCloseSettingsMenu() // close the menu after navigation
  }

  const handleLogout = async () => {
    localStorage.removeItem("token")
    dispatch(logout())
    router.push("/")
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)

    if (section) {
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

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseNotificationMenu = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar style={{ position: "relative" }}>
        <Box style={{ display: "flex", justifyContent: "flex-start", flex: 1 }}>
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
          >
            <MenuItem onClick={() => navigateToSetting("/settings/account")}>
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
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

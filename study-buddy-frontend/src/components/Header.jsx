import React, { useState, useEffect } from "react"
import axios from "axios"
import Login from "./Login"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { selectToken, setToken, logout } from "@/utils/authSlice.js"
import CreateMeeting from "./CreateMeeting"
import { API_URL } from "@/utils/config";

const sections = [
  { title: "Home", id: "home-section" },
  { title: "Meetings", id: "meetings-section" },
  { title: "Settings", id: "settings-section" },
]

function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
   
  const handleLogout = async () => {
    localStorage.removeItem("token")
    dispatch(logout());
    router.push("/")
  }

  const scrollToSection = (sectionId) => {
  }
  return (
    <AppBar position="fixed" color="primary">
    <Toolbar style={{ justifyContent: "space-between" }}>
      {/* Sections on the left */}
      <Box style={{ display: "flex", flexGrow: 1 }}>
        {/* map sections to appbar */}
        {sections.map((section) => (
          <Button
            key={section.title}
            color="inherit"
            onClick={() => scrollToSection(section.id)}
          >
            {section.title}
          </Button>
        ))}
      </Box>
      <Box>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Box>
    </Toolbar>
  </AppBar>
)
}

export default Header

import * as React from "react"
import axios from "axios"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { selectToken, setToken, logout } from "@/utils/authSlice.js"

export default function FriendsHeader() {
  const router = useRouter()
  const dispatch = useDispatch()

  const navigateToProfile = () => {
    router.push("/profile")
  }

  const navigateFriends = () => {
    router.push("/friends")
  }

  const navigateHome = () => {
    router.push("/home")
  }

  const handleLogout = async () => {
    localStorage.removeItem("token")
    dispatch(logout())
    router.push("/")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{
          boxShadow: "none",
          borderBottom: "1px solid black",
          backgroundColor: "#f7f0fa",
        }}
      >
        <Toolbar>
          <Button onClick={navigateHome}>Home</Button>

          <Button>Meetings</Button>

          <Button>Settings</Button>

          <Typography sx={{ flexGrow: 1, color: "black", textAlign: "center" }}>
            Logo
          </Typography>

          <Button onClick={handleLogout} variant="contained">
            Menu
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

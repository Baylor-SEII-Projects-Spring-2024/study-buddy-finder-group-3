import React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import FriendsList from "./FriendsPage/FriendsBar";


function Sidebar() {
  const router = useRouter();
  const navigateToProfile = () => {
    router.push("/profile")
  }

  const navigateFriends = () => {
    router.push("/friends")
  }

  const navigateHome = () => {
    router.push("/home")
  }

  const navigateSettings = () => {
    router.push("/settings")
  }
  return (
    <Box
      sx={{ width: "250px", minHeight: "100vh", borderRight: "1px solid #ddd" }}
    >
      <Button  onClick={navigateHome} fullWidth>Home</Button>
      <Button onClick={navigateToProfile} fullWidth>Profile</Button>
      <Button onClick={navigateFriends} fullWidth>Friends</Button>
      <Button onClick={navigateSettings} fullWidth>Settings</Button>
    </Box>
  )
}

export default Sidebar

import React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/router"

function Sidebar() {
  const router = useRouter();
  const navigateToProfile = () => {
    router.push("/profiles")
  }
  return (
    <Box
      sx={{ width: "250px", minHeight: "100vh", borderRight: "1px solid #ddd" }}
    >
      <Button fullWidth>Home</Button>
      <Button onClick={navigateToProfile} fullWidth>Profile</Button>
      <Button fullWidth>Friends</Button>
    </Box>
  )
}

export default Sidebar

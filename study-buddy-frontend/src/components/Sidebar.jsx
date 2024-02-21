import React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

function Sidebar() {
  return (
    <Box
      sx={{ width: "250px", minHeight: "100vh", borderRight: "1px solid #ddd" }}
    >
      <Button fullWidth>Home</Button>
      <Button fullWidth>Profile</Button>
      <Button fullWidth>Friends</Button>
    </Box>
  )
}

export default Sidebar

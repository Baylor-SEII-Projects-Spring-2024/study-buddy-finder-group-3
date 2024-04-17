import React from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import SettingsMain from "@/components/SettingsMain"
import ProfileDisplay from "@/components/ProfileDisplay"
import landingstyles from "@/styles/landing.module.css"
import Box from "@mui/material/Box"

function settings() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
        <SettingsMain />
      </Box>
        <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
        <ProfileDisplay/>
      </Box>
    </Box>
  )
}

export default settings

import React, { useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import SettingsMain from "@/components/SettingsMain"
import landingstyles from "@/styles/landing.module.css"
import Box from "@mui/material/Box"
import AuthProgress from "@/components/AuthProgress"

function settings() {
  const [authComplete, setAuthComplete] = useState(false)

  return (
    <>
      {!authComplete ? (
        <AuthProgress onAuthComplete={() => setAuthComplete(true)} />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <Header />
          <Box sx={{ display: "flex", flexGrow: 1, marginTop: "80px" }}>
            <SettingsMain />
          </Box>
        </Box>
      )}
    </>
  )
}

export default settings

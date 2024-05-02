import React, { useEffect, useState } from "react"
import Header from "@/components/Header.jsx"
import Sidebar from "@/components/Sidebar.jsx"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import DisplayMeetings from "@/components/DisplayMeetings"
import Box from "@mui/material/Box"
import { useAuth } from "@/utils/useAuth"
import AuthProgress from "@/components/AuthProgress"

function home() {
  const [authComplete, setAuthComplete] = useState(false)
  
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* <Box sx={{ display: "flex", flexGrow: 1 }}> */}
          {!authComplete ? (
            <AuthProgress onAuthComplete={() => setAuthComplete(true)} />
          ) : (
            <DisplayMeetings />
          )}
        {/* </Box> */}
      </Box>
    </>
  )
}

export default home

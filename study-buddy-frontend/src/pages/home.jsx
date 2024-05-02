import React, { useState } from "react"
import DisplayMeetings from "@/components/DisplayMeetings"
import Box from "@mui/material/Box"
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

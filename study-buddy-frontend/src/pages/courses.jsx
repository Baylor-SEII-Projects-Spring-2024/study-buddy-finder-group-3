import React, { useState } from "react"
import Header from "@/components/Header"
import Box from "@mui/material/Box"
import DisplayCourses from "@/components/DisplayCourses"
import AuthProgress from "@/components/AuthProgress"
function courses() {
  const [authComplete, setAuthComplete] = useState(false)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {!authComplete ? (
        <AuthProgress onAuthComplete={() => setAuthComplete(true)} />
      ) : (
        <>
          <Header />
          <DisplayCourses />
        </>
      )}
    </Box>
  )
}

export default courses

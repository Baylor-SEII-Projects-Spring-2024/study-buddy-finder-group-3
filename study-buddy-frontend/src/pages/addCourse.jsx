import React, { useState } from "react"
import UserCourses from "@/components/UserCourses"
import Box from "@mui/material/Box"
import AuthProgress from "@/components/AuthProgress"

function addCourse() {
  const [authComplete, setAuthComplete] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {!authComplete ? (
            <AuthProgress onAuthComplete={() => setAuthComplete(true)} />
          ) : (
            <UserCourses />
          )}
      </Box>
    </>
  )
}

export default addCourse

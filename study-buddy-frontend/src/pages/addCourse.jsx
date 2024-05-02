import React, { useState} from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import UserCourses from "@/components/UserCourses"
import ProfileDisplay from "@/components/ProfileDisplay"
import landingstyles from "@/styles/landing.module.css"
import Box from "@mui/material/Box"
import styles from "@/styles/settings.module.css"
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

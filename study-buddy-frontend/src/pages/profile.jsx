import React, { useEffect } from "react"
import ProfileDisplay from "@/components/ProfileDisplay"
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import { useTheme } from "@mui/material/styles"
import TutorInfo from "@/components/TutorInfo";


function profiles() {
  const theme = useTheme()
  const token = useSelector(selectToken)
  const router = useRouter()
    const user = useSelector(selectUser)

    useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  return (
    <Box sx={{ pt:"64px", display: "flex", justifyContent: "center", marginRight: "500px" }}>
      <Header />
      <Box sx={{
          pt:"64px",
          marginTop: "15px",
          marginLeft: "80px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          minWidth: "30vw",
          width: "fit-content",
          maxWidth: "50vw",
          height: "fit-content",
          // maxHeight: "90vh",
          display: "inline-block",
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.primary.main,
          alignItems: "center"
      }}>
        {/*<Sidebar />*/}
          <ProfileDisplay />
          <TutorInfo />
      </Box>
    </Box>
  )
}

export default profiles

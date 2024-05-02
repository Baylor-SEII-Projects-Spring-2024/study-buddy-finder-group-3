import React, { useEffect, useState } from "react"
import ProfileDisplay from "@/components/ProfileDisplay"
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import Header from "@/components/Header"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import { useTheme } from "@mui/material/styles"
import TutorInfo from "@/components/TutorInfo"
import axios from "axios"
import { API_URL } from "@/utils/config"
import AuthProgress from "@/components/AuthProgress"

function profiles() {
  const theme = useTheme()
  const token = useSelector(selectToken)
  const router = useRouter()
  const user = useSelector(selectUser)
  const [profile, setProfile] = useState("")
  const [userId, setUserId] = useState("")
  const [authComplete, setAuthComplete] = useState(false)

  useEffect(() => {
    if (user) {
      setUserId(user.id)
      fetchProfileInfo(user.id)
    }
  }, [user])

  const fetchProfileInfo = async (userId) => {
    try {
      // console.log("API_URL: ", API_URL);
      const response = await axios.get(`${API_URL}/profile/${userId}`)
      setProfile(response.data)
      // console.log("USER:", response.data)

      console.log("Tutor Status: ", response.data.userType)
      console.log("Is Tutor: ", profile.userType)
    } catch (error) {
      console.error("Error fetching profile info:", error)
    }
  }

  return (
    <>
      {/* <Parallax bgImage={"./unlock-potential.png"} strength={300}> */}

      {!authComplete ? (
        <AuthProgress onAuthComplete={() => setAuthComplete(true)} />
      ) : (
        <Box
          sx={{
            pt: "64px",
            display: "flex",
            justifyContent: "center",
            marginRight: "500px",
            marginLeft: "500px",
          }}
        >
          <Header />
          <Box
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              position: "absolute", // or "fixed" if needed
              top: 50,
              // left: "30%",
              width: "100vw",
              height: "300px",
              backgroundColor: theme.palette.secondary.main,
              border: "1px solid",
              borderColor: theme.palette.primary.main,
              zIndex: -1, // Set lower zIndex to appear behind other elements
            }}
          ></Box>

          <Box
            sx={{
              pt: "64px",
              marginTop: "15px",
              marginLeft: "80px",
              // marginLeft: "10%",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              height: "fit-content",
              // maxHeight: "90vh",
              // display: "inline-block",
              width: "fit-content",
              maxWidth: "50vw",

              display: "flex",
              backgroundColor: theme.palette.background.default,
              borderColor: theme.palette.primary.main,
              alignItems: "center",
            }}
          >
            {/*<Sidebar />*/}
            <ProfileDisplay />
          </Box>
          {profile.userType && (
            <Box
              sx={{
                pt: "64px",
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
                // display: "inline-block",
                display: "flex",
                backgroundColor: theme.palette.background.default,
                borderColor: theme.palette.primary.main,
                alignItems: "center",
              }}
            >
              <TutorInfo />
            </Box>
          )}
        </Box>
      )}
    </>
  )
}

export default profiles

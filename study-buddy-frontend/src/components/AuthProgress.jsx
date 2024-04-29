import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { setUser, logout } from "@/utils/authSlice"
import { API_URL } from "@/utils/config"
import { useTheme } from "@emotion/react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
function AuthProgress({ onAuthComplete }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  useEffect(() => {
    let timer

    const validateToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/validateToken`, {
          withCredentials: true,
        })
        console.log("Server token validation response:", response)
        dispatch(setUser(response.data));
        setProgress(100)
        onAuthComplete()
      } catch (error) {
        console.log("do i be catching the invalid token:", error)
        dispatch(logout())
        setProgress(100)
        router.push("/")

        onAuthComplete()
      }
    }

    // init progress bar
    setProgress(0)
    timer = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 10
        if (nextProgress >= 100) {
          clearInterval(timer)
        }
        return nextProgress
      })
    }, 100)

    validateToken()

    // cleanup interval on unmount
    return () => clearInterval(timer)
  }, [dispatch, onAuthComplete])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
      }}
    >
      <Typography variant="h6" style={{ marginBottom: theme.spacing(2) }}>
        Checking authentication...
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: "100%",
          height: 8,
          borderRadius: 5,
          backgroundColor: theme.palette.grey[300],
        }}
      />
    </Box>
  )
}

export default AuthProgress

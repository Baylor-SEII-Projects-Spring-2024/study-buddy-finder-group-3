import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { AppBar, Box, Button, Toolbar } from "@mui/material"
import styles from "@/styles/landing.module.css"
import { useState } from "react"
import { Parallax } from "react-parallax"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { toast } from "react-toastify"
import axios from "axios"
import { API_URL } from "@/utils/config";

const sections = [
  { title: "Home", id: "home-section" },
  //{ title: "About", id: "about-us-section" },
  //{ title: "Potential", id: "unlock-potential-section" },
  //{ title: "Customers", id: "customers-section" },
]

export default function resetPassword() {
  const router = useRouter()
  const { token } = router.query
  const [isHovered, setIsHovered] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userId, setUserId] = useState("")

  const scrollToSection = (id) => {}

  const scrollToTop = () => {}

  const handleOpenCreateAccount = () => {}

  const handleOpenLogin = () => {}

  const returnHome = () => {
    router.push("/")
  }

  useEffect(() => {
    if (token) {
        validateToken()
    }
    }, [token])

  const validateToken = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/auth/validateResetToken/${token}`
      )

      setUserId(response.data.id)
    } catch (error) {
      console.error("Error validating token:", error)
      returnHome()
    }
  }

  const invalidateToken = async () => {
    try {
        const response = await axios.delete(
            `${API_URL}/auth/invalidateResetToken/${token}`
        )
    } catch (error) {
        console.error("Error invalidating token:", error)
    }
    }

  const changePassword = async () => {
    if (!password) {
      toast.error("Password cannot be empty")
      return
    }
    const numberRegex = /\d/
    if (!numberRegex.test(password)) {
      toast.error("Password must contain at least one number")
      return
    }
    const uppercaseRegex = /[A-Z]/
    if (!uppercaseRegex.test(password)) {
      toast.error("Password must contain at least one uppercase character")
      return
    }
    const lowercaseRegex = /[a-z]/
    if (!lowercaseRegex.test(password)) {
      toast.error("Password must contain at least one lowercase character")
      return
    }
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (!specialCharRegex.test(password)) {
      toast.error("Password must contain at least one special character")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      const response = await axios.post(
        `${API_URL}/auth/${userId}/changePassword`,
        { password: password }
      )
      toast.success("Password reset successfully")

      
    } catch (error) {
      console.error("Error resetting password:", error)
      toast.error("Error resetting password")
    } finally {
      invalidateToken()
      router.push("/")
    }
  }

  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar style={{ justifyContent: "center", alignItems: "center" }}>
          {/* left section */}
          <Box
            style={{ display: "flex", justifyContent: "flex-start", flex: "1" }}
          >
            {sections.map((section) => (
              <Button
                onMouseEnter={() => {
                  setIsHovered(true)
                }}
                onMouseLeave={() => {
                  setIsHovered(false)
                }}
                key={section.title}
                color="inherit"
                className={styles.buttonUnderlineCenter}
                onClick={() => returnHome()}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    // cursor: 'none',
                    "@media (hover: none)": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              >
                {section.title}
              </Button>
            ))}
          </Box>

          {/* center section */}
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              flex: "0 1 auto",
            }}
          >
            <img
              src="/StudyBuddyLogo Background Removed.png"
              alt="Logo"
              style={{ maxHeight: "50px", cursor: "pointer" }}
              onClick={() => returnHome()}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Parallax bgImage={"./unlock-potential.png"} strength={300}>
        <Box
          id="home-section"
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            p: 4,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0)", // semi-transparent white background
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)", // slight blur
              padding: "2rem",
            }}
          >
            <Box>
              <Typography variant="h2">Reset Password</Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                Enter your new password below
              </Typography>
            </Box>
            <Box>
              <TextField
                required
                margin="dense"
                id="password"
                name="password"
                label="New Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
            </Box>
            <Box>
              <TextField
                required
                margin="dense"
                id="password"
                name="password"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(event) => {
                  setConfirmPassword(event.target.value)
                }}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={() => changePassword()}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Parallax>
    </div>
  )
}

import React, { useState } from "react"
import axios from "axios"
import { Box, Button, Divider, Link, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { toast } from "react-toastify"
import { API_URL } from "@/utils/config"

const Itemspacing = 20
const textSpacing = 2
const textAllign = "left"

const mailRequest = {
  to: "",
  subject: "Welcome to StudyBuddy!",
  text: "Thank you for subscribing to StudyBuddy!",
}

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleClick = () => {
    toast.success("Subscribed!")
  }

  const handleChange = (event) => {
    setEmail(event.target.value)
    mailRequest.to = event.target.value
  }

  const sendEmail = async () => {
    try {
      const response = await axios.post(`${API_URL}/send-email`, mailRequest)
      toast.success("Subscribed!")
    } catch (error) {
      toast.error("Invalid email")
    }
  }

  return (
    <>
      <Divider />

      <Box sx={{ flexGrow: 1, padding: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flexStart",
            justifyContent: "flex-start",
            marginBottom: 10,
          }}
        >
          <Box marginRight={Itemspacing}>
            <img
              src="/StudyBuddyLogo Background Removed.png"
              alt="Logo"
              style={{ maxHeight: "70px" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end", // Aligns children horizontally to the end (right)
              justifyContent: "flex-start", // Aligns children vertically to the start (top)
              width: "100%", // Takes full width to ensure right alignment in a flex container
                        //center
            }}
          >
            <Box paddingBottom={textSpacing}>
              <Typography variant="h7" align={textAllign} fontWeight={"bold"}>
                Subscribe
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Join our community to stay up to date on new features and
                releases.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: textSpacing,
              }}
            >
              <TextField
                id="subscribe-field"
                label="Enter your email"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                sx={{ width: "20vw" }}
              />
              <Button
                style={{ marginLeft: 20, color: "black" }}
                onClick={() => {
                  sendEmail()
                }}
              >
                Subscribe
              </Button>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginTop: 3,
          }}
        >
          <Typography variant="subtitle1" align="center" marginRight={10}>
            © 2024 StudyBuddy. All rights reserved.
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            marginRight={3}
            sx={{ textDecoration: "underline" }}
          >
            <Link href="privacyPolicy">Privacy Policy</Link>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            marginRight={3}
            sx={{ textDecoration: "underline" }}
          >
            <Link href="terms">Terms of Service</Link>
          </Typography>
        </Box>
      </Box>
    </>
  )
}

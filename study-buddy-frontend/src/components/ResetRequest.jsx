import React, { useState } from 'react';
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import axios from "axios"
import { toast } from "react-toastify"
import { API_URL } from "@/utils/config";

export default function ResetRequest({ open, onClose }) {
  const [email, setEmail] = useState("")

  const mailRequest = {
    to: "",
    subject: "Reset Password",
    text: "500: Internal Server Error",
  }

  const handleClose = () => {
    onClose()
    }

  const sendEmail = async () => {
    try {
      const response = await axios.post(`${API_URL}/send-email`, mailRequest)
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  const genrateResetLink = async (email) => {
    try {
      const response = await axios.get(
        `${API_URL}/auth/generateResetToken/${email}`
      )

      mailRequest.to = email
      mailRequest.text = `<p>To reset your password, please click on the following link:</p>
      <a href="http://localhost:3000/${response.data}">studybudy.com/resetPassword</a>`

      sendEmail()

      toast.success("Reset link sent to your email")
    } catch (error) {
      console.error("Error generating reset link:", error)
      toast.error("Error generating reset link")
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries(formData.entries())
            const email = formJson.email
            console.log(email)
            handleClose()
          },
        }}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here. We
            will send you an email with a link to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setEmail(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button type="submit" onClick={() => genrateResetLink(email)}>Send Link</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

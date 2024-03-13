import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "@/styles/login-create.module.css";
import { toast } from 'react-toastify';
import { useRouter } from "next/router"
import axios from "axios"
import Checkbox from "@mui/material/Checkbox"
import {FormControlLabel, FormGroup} from "@mui/material";
import { API_URL } from "@/utils/config";

function CreateAccount({ open, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isTutor, setIsTutor] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIsTutorChange = (event)=> {
    setIsTutor(event.target.checked);
    isTutor
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClose = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setUsername("")
    setPassword("")
    onClose()
  }

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!firstName) {
      toast.error("First Name cannot be empty");
      return;
    }
    if (!lastName) {
      toast.error("Last Name cannot be empty");
      return;
    }
    if (!email) {
      toast.error("Email cannot be empty");
      return;
    }
    if (!username) {
      toast.error("Username cannot be empty");
      return;
    }
    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailRegex.test(email)){
      toast.error("Invalid email address format");
      return;
    }
    try {
      const usernameCheckResponse = await axios.get(`${API_URL}/auth/checkUsername/${username}`);
      if (!usernameCheckResponse.data) {
        console.log(username + " already in database");
        toast.error(username + " already belongs to another account");
        return;
      }

      const emailCheckResponse = await axios.get(`${API_URL}/auth/checkEmail/${email}`);
      if (!emailCheckResponse.data) {
        console.log(email + " already in database");
        toast.error(email + " already belongs to another account");
        return;
      }

      const response = await axios.post(`${API_URL}/auth/createAccount`, {
        username,
        password,
        firstName,
        lastName,
        email,
        isTutor
      })
      console.log(response)
      if (response.status === 200){
        toast.success("Account created successfully!")
        router.push('/home')
      } else {
        toast.error("Failed to create account")
        console.log("Failed to create account")
      }

    } catch (error){
      toast.error("Failed to create account")
      console.error(error)
    }

  };

  return (
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="create-account-modal-title"
      >
        <Box className={styles.loginCreate}>
          <Typography
              id="create-account-modal-title"
              variant="h6"
              component="h2"
              style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}
          >
            Create Account
          </Typography>
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleCreateAccount}>
            <TextField
                margin="normal"
                fullWidth
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                onChange={handleFirstNameChange}
                value={firstName}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                onChange={handleLastNameChange}
                value={lastName}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
                value={email}
            />

            <TextField
                margin="normal"
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleUsernameChange}
                value={username}
            />
            <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={handlePasswordChange}
                value={password}
            />
            <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={<Checkbox checked={isTutor} onChange={handleIsTutorChange} />}
                label="Are you a tutor?"
                labelPlacement="start"
              />
            </FormGroup>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "blue", // Change color if needed
                  "&:hover": {
                    backgroundColor: "darkblue", // Change color if needed
                  },
                }}
            >
              Create Account
            </Button>
            <Button fullWidth variant="text" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
  );
}
export default CreateAccount;

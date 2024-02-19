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


function Login({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClose = () => {
    setUsername("")
    setPassword("")
    onClose()
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("Username cannot be empty");
      return;
    }
    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/auth/login`, {
        username,
        password
      })
      console.log(response)
      if (response.status === 200){
        //authenticate token

        router.push('/home')

      } else {
        toast.error("Invalid username or password")
        console.log("Invalid username or password")
      }

    } catch (error){
      toast.error("Invalid username or password")
      console.error(error)
    }

  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
    >
      <Box className={styles.loginCreate}>
        <Typography id="login-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleLogin}>
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
            autoComplete="current-password"
            onChange={handlePasswordChange}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Sign In
          </Button>
          <Button fullWidth variant="text" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Login;

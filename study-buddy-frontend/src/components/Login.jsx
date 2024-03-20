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
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '@/utils/authSlice.js';
import { API_URL } from "@/utils/config";

function Login({ open, onClose }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  let customId = "";


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
      customId="user-is-empty"
      toast.error("Username cannot be empty", {
        position: "bottom-right",
        toastId: customId
      });
      return;
    }
    if (!password) {
      customId="password-is-empty"
      toast.error("Password cannot be empty", {
        position: "bottom-right",
        toastId: customId
      });
      return;
    }

    try {
      customId="logging-in"
      toast.loading("Logging in...", {
        position: "bottom-right",
        toastId: customId
      })
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      })
      console.log(response)
      if (response.status === 200){
        dispatch(setToken(response.data.token))
        dispatch(setUser(response.data.user))
        console.log('user', response.data.user)
        //authenticate token

        router.push('/home')
        toast.dismiss();
      } else {
        toast.dismiss();
        customId="invalid-user-or-pass"
        toast.error("Invalid username or password",{
          position: "bottom-right",
          toastId: customId
        })
        console.log("Invalid username or password")
      }

    } catch (error){
      toast.dismiss();
      customId="invalid-user-or-pass"
      toast.error("Invalid username or password",{
        position: "bottom-right",
        toastId: customId
      })
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
              backgroundColor: "bluegrey",
              "&:hover": {
                backgroundColor: "bluegrey",
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

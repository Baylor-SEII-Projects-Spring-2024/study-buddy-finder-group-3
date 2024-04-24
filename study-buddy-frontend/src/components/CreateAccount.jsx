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
import { useTheme } from "@mui/material/styles"

function CreateAccount({ open, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isTutor, setIsTutor] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [areaOfStudy, setAreaOfStudy] = useState([]);
  const [prefTime, setPrefTime] = useState("");
  const [prefMeetingType, setPrefMeetingType] = useState("");
  const router = useRouter()
  const theme = useTheme();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIsTutorChange = (event) => {
    setIsTutor(event.target.checked);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePrefTimeChange = (event) => {
    const {name, checked} = event.target;
    if (checked) {
      setPrefTime(name);
    } else {
      setPrefTime('');
    }
  };

  const handleMeetingTypeChange = (event) => {
    const {name, checked} = event.target;
    if (checked) {
      setPrefMeetingType(name);
    } else {
      setPrefMeetingType('');
    }
  };

  const handleAreaOfStudyChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setAreaOfStudy((prevSelectedCourses) => [...prevSelectedCourses, name]);
    } else {
      setAreaOfStudy((prevSelectedCourses) => prevSelectedCourses.filter((course) => course !== name));
    }
  };

  const handleClose = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setUsername("")
    setPassword("")
    setPrefMeetingType("")
    setAreaOfStudy([])
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
    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
      toast.error("Password must contain at least one uppercase character");
      return;
    }
    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(password)) {
      toast.error("Password must contain at least one lowercase character");
      return;
    }
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharRegex.test(password)) {
      toast.error("Password must contain at least one special character");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
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

      console.log(areaOfStudy);
      console.log(prefTime);
      console.log(prefMeetingType);
      const response = await axios.post(`${API_URL}/auth/createAccount`, {
        username,
        password,
        firstName,
        lastName,
        email,
        isTutor,
        areaOfStudy: areaOfStudy.join(','),
        prefTime,
        prefMeetingType
      })
      console.log(response)
      if (response.status === 200){
        toast.success("Account created successfully!", { position: "top-center" })
        router.push('/home')
      } else {
        toast.error("Failed to create account", { position: "top-center" })
        console.log("Failed to create account")
      }

    } catch (error){
      toast.error("Failed to create account", { position: "top-center" })
      console.error(error)
    }

  };
  return (
      <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="create-account-modal-title"
          sx={{
            position: "absolute",
            backgroundColor: theme.palette.primary.secondary,
            borderColor: theme.palette.primary.main
          }}
      >
        <Box className={styles.loginCreate}>
          <Typography
              id="create-account-modal-title"
              variant="h6"
              component="h2"
              style={{textAlign: 'center', width: '100%', fontSize: '24px'}}
          >
            Create Account
          </Typography>
          <Box component="form"
               sx={{mt: 1,
               overflowY: "auto",
               maxHeight: "80vh"}}
               onSubmit={handleCreateAccount}>
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
            <FormGroup style={{display: 'flex', alignItems: 'center'}}>
              <FormControlLabel
                  control={<Checkbox checked={isTutor} onChange={handleIsTutorChange}/>}
                  label="Are you a tutor?"
                  labelPlacement="start"
              />
            </FormGroup>
            <Box
                sx={{
                  // flexGrow: 0,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "15px",
                  marginBottom: "15px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  width: "20vw"
                }} >
              <div>
                <Typography variant="subtitle1">Area of Study:</Typography>
                <FormControlLabel
                    control={<Checkbox checked={areaOfStudy.includes("Computer Science")} onChange={handleAreaOfStudyChange} name="Computer Science" />}
                    label="Computer Science"
                    
                />
                <FormControlLabel
                    control={<Checkbox checked={areaOfStudy.includes("Biology")} onChange={handleAreaOfStudyChange} name="Biology" />}
                    label="Biology"
                    
                />
                <FormControlLabel
                    control={<Checkbox checked={areaOfStudy.includes("Physics")} onChange={handleAreaOfStudyChange} name="Physics" />}
                    label="Physics"
                    
                />
                <FormControlLabel
                    control={<Checkbox checked={areaOfStudy.includes("Mathematics")} onChange={handleAreaOfStudyChange} name="Mathematics" />}
                    label="Mathematics"
                    
                />
                <FormControlLabel
                    control={<Checkbox checked={areaOfStudy.includes("Chemistry")} onChange={handleAreaOfStudyChange} name="Chemistry" />}
                    label="Chemistry"
                    
                />
              </div>
            </Box>
            <Box
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "15px",
                  marginBottom: "15px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  width: "20vw"
                }}>
              <div>
                <Typography variant="subtitle1">Time Preference:</Typography>
                <FormControlLabel
                    control={<Checkbox checked={prefTime === "morning"} onChange={handlePrefTimeChange}
                                       name="morning"/>}
                    label="Morning"
                />
                <FormControlLabel
                    control={<Checkbox checked={prefTime === "afternoon"} onChange={handlePrefTimeChange}
                                       name="afternoon"/>}
                    label="Afternoon"
                />
                <FormControlLabel
                    control={<Checkbox checked={prefTime === "evening"} onChange={handlePrefTimeChange}
                                       name="evening"/>}
                    label="Evening"
                />
                <FormControlLabel
                    control={<Checkbox checked={prefTime === "night"} onChange={handlePrefTimeChange}
                                       name="night"/>}
                    label="Night"
                />
              </div>
            </Box>
            <Box
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "15px",
                  marginBottom: "15px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  width: "20vw"
                }}>
              <div>
                <Typography variant="subtitle1">Meeting Type Preference:</Typography>
                <FormControlLabel
                    control={<Checkbox checked={prefMeetingType === "physical"} onChange={handleMeetingTypeChange}
                                       name="physical"/>}
                    label="Physical"
                />
                <FormControlLabel
                    control={<Checkbox checked={prefMeetingType === "virtual"} onChange={handleMeetingTypeChange}
                                       name="virtual"/>}
                    label="Virtual"
                />
              </div>
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "bluegrey", // Change color if needed
                  "&:hover": {
                    backgroundColor: "bluegrey", // Change color if needed
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

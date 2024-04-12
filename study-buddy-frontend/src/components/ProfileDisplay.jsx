// ProfileDisplay.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/utils/authSlice.js";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/config";
import { toast } from "react-toastify";
import styles from "@/styles/ProfileDisplay.module.css";
import { useTheme } from "@mui/material/styles"
import avatarImage from "./StudyBuddyLogo.png"

function ProfileDisplay() {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [profile, setProfile] = useState('');
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const theme = useTheme()
    const imagePath = avatarImage;
    console.log(avatarImage);

    useEffect(() => {
        if (!token || !user) {
            router.push('/');
        }
    }, [token, router]);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            fetchProfileInfo(user.id);
        }
    }, [user]);

    const fetchProfileInfo = async (userId) => {
        try {
            console.log("API_URL: ", API_URL);
            const response = await axios.get(`${API_URL}/profile/${userId}`);
            setProfile(response.data);

            let coursesArray = [];
            if (response.data.areaOfStudy) {
                if (typeof response.data.areaOfStudy === 'string') {
                    coursesArray = response.data.areaOfStudy.split(',').map(course => course.trim());
                } else if (Array.isArray(response.data.areaOfStudy)) {
                    coursesArray = response.data.areaOfStudy;
                }
            }

            setSelectedCourses(coursesArray);
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = async () => {
        try {
            const updatedProfile = {
                email: profile.emailAddress,
                username: profile.username,
                firstName: profile.nameFirst,
                lastName: profile.nameLast,
                courses: selectedCourses.join(', '),
            };

            const response = await axios.put(`${API_URL}/auth/updateProfile/${userId}`, updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success("Account updated successfully!")
            } else {
                toast.error("Failed to update account")
            }
            setEditMode(false);
        } catch (error) {
            console.error("Error saving profile changes:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleCourseChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, name]);
        } else {
            setSelectedCourses((prevSelectedCourses) => prevSelectedCourses.filter((course) => course !== name));
        }
    };

    return (
        <Box className={styles.profileContainer}
             display="flex" flexDirection="column"
             sx={{
                 position: "relative",
                 backgroundColor: theme.palette.primary.secondary,
                 borderColor: theme.palette.primary.main
             }}
        >
            <Box
                sx={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "absolute", // or "fixed" if needed
                    top: -60,
                    left: -50,
                    width: "200%",
                    height: "300px",
                    backgroundColor: theme.palette.secondary.main,
                    border: "1px solid",
                    borderColor: theme.palette.primary.main,
                    zIndex: -1 // Set lower zIndex to appear behind other elements
                }}
            >
            </Box>
            <div className={styles.profileHeader}>
                <Avatar
                    // src={profile.profilePictureUrl}
                    // src={avatarImage}
                    src="/_next/static/media/StudyBuddyLogo.4d4a46a7.png"
                    alt="Profile Picture"
                    className={styles.avatar}
                    sx={{
                        width: "100px",
                        height: "100px",
                        border: "1px solid",
                        borderColor: theme.palette.primary.main,
                    }}
                />
                <Typography variant="h6" component="h2"
                    sx={{
                        display: "inline",
                        flexGrow: 0, // Allow the Typography to grow and shrink as needed
                        overflow: 'hidden', // Hide any overflowing text
                        textOverflow: 'ellipsis', // Add ellipsis for text overflow
                        whiteSpace: 'normal', // Prevent text from wrapping
                        marginLeft: "15px", // Add some space between Avatar and Typography
                        marginRight: "15px",
                        maxWidth: "150px",
                    }}
                >
                    {profile.nameFirst} {profile.nameLast}
                </Typography>
                <Button
                    variant="contained" color="primary"
                    sx={{
                        // marginLeft: "auto",
                        // marginRight: "auto",
                        marginTop: "15px",
                        marginBottom: "15px",
                        padding: "20px",
                        width: "200px",
                        // flexGrow: 1,
                        flexShrink: 0,
                        height: "30px"
                    }}
                >
                    Change Photo
                </Button>
            </div>
            <Box
                sx={{
                    //marginLeft: "10px",
                    // flexGrow: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "15px",
                    marginBottom: "15px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    width: "20vw",
                    '& .MuiInputLabel-root': {
                        color: theme.palette.primary.main, // Change the color of the label
                    },
                    // '& .MuiInputBase-input': {
                    //     color: theme.palette.primary.main, // Change the color of the input text
                    // },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: theme.palette.primary.main, // Change the color of the underline when the input is not focused
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: theme.palette.primary.main, // Change the color of the underline when the input is focused
                    },
                    '& .Mui-disabled': {
                        color: theme.palette.primary.main, // Change the color of the text when disabled
                    },
                }} >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    name="emailAddress"
                    value={profile.emailAddress || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    value={profile.username || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="nameFirst"
                    value={profile.nameFirst || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="nameLast"
                    value={profile.nameLast || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                />
            </Box>
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
                <div className={styles.coursesContainer}>
                    <Typography variant="subtitle1">Area of Study:</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Computer Science")} onChange={handleCourseChange} name="Computer Science" />}
                        label="Computer Science"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Biology")} onChange={handleCourseChange} name="Biology" />}
                        label="Biology"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Physics")} onChange={handleCourseChange} name="Physics" />}
                        label="Physics"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Mathematics")} onChange={handleCourseChange} name="Mathematics" />}
                        label="Mathematics"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Chemistry")} onChange={handleCourseChange} name="Chemistry" />}
                        label="Chemistry"
                        disabled={!editMode}
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
                }} >
                <div className={styles.coursesContainer}>
                    <Typography variant="subtitle1">Time Preference:</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Morning")} onChange={handleCourseChange} name="Morning" />}
                        label="Morning"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Evening")} onChange={handleCourseChange} name="Evening" />}
                        label="Evening"
                        disabled={!editMode}
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
                }} >
                <div className={styles.coursesContainer}>
                    <Typography variant="subtitle1">Meeting Type Preference:</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Physical")} onChange={handleCourseChange} name="Physical" />}
                        label="Physical"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Virtual")} onChange={handleCourseChange} name="Virtual" />}
                        label="Virtual"
                        disabled={!editMode}
                    />
                </div>
            </Box>
            <Button
                sx={{
                    // flexGrow: 0,
                    variant: "contained",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10px",
                    marginBottom: "10px",
                    //padding: "20px",
                    //border: "1px solid #ddd",
                    //borderRadius: "5px",
                    width: "20vw"
                }}
                onClick={editMode ? handleSaveClick : handleEditClick} variant="contained" color="primary"
            >
                {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button>
        </Box>
    );
}

export default ProfileDisplay;


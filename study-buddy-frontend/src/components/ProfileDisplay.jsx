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

function ProfileDisplay() {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [profile, setProfile] = useState('');
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const theme = useTheme()

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
                <Avatar alt="Profile Picture"
                        // src={profile.profilePictureUrl}
                        src="data:image/png;base64,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"
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


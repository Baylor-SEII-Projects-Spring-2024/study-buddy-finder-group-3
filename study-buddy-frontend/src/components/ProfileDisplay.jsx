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

function ProfileDisplay() {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [profile, setProfile] = useState('');
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);

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
        <Box className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <Avatar alt="Profile Picture" src={profile.profilePictureUrl} className={styles.avatar} />
                <Typography variant="h6" component="h2">
                    {profile.nameFirst} {profile.nameLast}
                </Typography>
            </div>
            <Box
                sx={{
                    marginLeft: "10px",
                    marginTop: "15px",
                    marginBottom: "15px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    width: "20vw"
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
            <div className={styles.coursesContainer}>
                <Typography variant="subtitle1">Courses:</Typography>
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
            <Button onClick={editMode ? handleSaveClick : handleEditClick} variant="contained" color="primary">
                {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button>
        </Box>
    );
}

export default ProfileDisplay;


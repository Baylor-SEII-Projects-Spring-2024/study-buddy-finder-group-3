import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "@/styles/ProfileDisplay.module.css";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/utils/authSlice.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
            const response = await axios.get(`http://localhost:8080/profile/${userId}`);

            // Log the entire response data object
            console.log("Response data:", response.data);

            setProfile(response.data);

            // Extract courses from the areaOfStudy field
            let coursesArray = [];
            if (response.data.areaOfStudy) {
                if (typeof response.data.areaOfStudy === 'string') {
                    // If areaOfStudy is a string, split it into an array
                    coursesArray = response.data.areaOfStudy.split(',').map(course => course.trim());
                } else if (Array.isArray(response.data.areaOfStudy)) {
                    // If areaOfStudy is already an array, use it directly
                    coursesArray = response.data.areaOfStudy;
                }
            }

            setSelectedCourses(coursesArray);
            console.log("User's initial courses are: ", response.data.areaOfStudy);
            console.log(`Fetched user profile with userId=${userId}, areaofstudy=${profile.areaOfStudy}, email=${profile.emailAddress}, firstName=${profile.nameFirst}, lastName=${profile.nameLast}, username=${profile.username}`);
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
        console.log(`Fetched user profile with userId=${userId}, areaofstudy=${selectedCourses}, email=${profile.emailAddress}, firstName=${profile.nameFirst}, lastName=${profile.nameLast}, username=${profile.username}`);

    };

    const handleSaveClick = async () => {
        try {
            console.log("Save click selected courses:", selectedCourses);

            // Prepare the updated profile data
            const updatedProfile = {
                email: profile.emailAddress,
                username: profile.username,
                firstName: profile.nameFirst,
                lastName: profile.nameLast,
                courses: selectedCourses.join(', '),
            };

            // Make a PUT request to update the profile
            const response = await axios.put(`http://localhost:8080/auth/updateProfile/${userId}`, updatedProfile, {
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
        <Box className={styles.profileCreate} sx={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar alt="Profile Picture" src={profile.profilePictureUrl} style={{ marginTop: '10px', marginBot: '10px', marginRight: '10px' }} />
                <Typography id="profile-container-title" variant="h6" component={"h2"}>
                    {profile.nameFirst} {profile.nameLast}
                </Typography>
            </div>
            <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="emailAddress"
                value={profile.emailAddress || ''}
                disabled={!editMode}
                sx={{ backgroundColor: '#f0f0f0', width: '300px' }}
                onChange={handleInputChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Username"
                name="username"
                value={profile.username || ''}
                disabled={!editMode}
                sx={{ backgroundColor: '#f0f0f0', width: '300px' }}
                onChange={handleInputChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="First Name"
                name="nameFirst"
                value={profile.nameFirst || ''}
                disabled={!editMode}
                sx={{ backgroundColor: '#f0f0f0', width: '300px' }}
                onChange={handleInputChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Last Name"
                name="nameLast"
                value={profile.nameLast || ''}
                disabled={!editMode}
                sx={{ backgroundColor: '#f0f0f0', width: '300px' }}
                onChange={handleInputChange}
            />
            {/* Checkboxes for courses */}
            <>
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
                {/* Add more courses as needed */}
            </>
            <Button onClick={editMode ? handleSaveClick : handleEditClick} variant="contained" color="primary">
                {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button>
        </Box>
    );
}

export default ProfileDisplay;

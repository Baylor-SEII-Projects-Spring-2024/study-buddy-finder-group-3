import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "@/styles/ProfileDisplay.module.css";
import { TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/utils/authSlice.js";
import { useRouter } from "next/router";
import {toast} from "react-toastify";

function ProfileDisplay() {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [profile, setProfile] = useState('');
    const [userId, setUserid] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!token || !user) {
            router.push('/');
        }
    }, [token, router]);

    useEffect(() => {
        if (user) {
            setUserid(user.id);
        }
        fetchProfileInfo();
    }, [user]);

    const fetchProfileInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/profile/${user.id}`);
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = async () => {
        // Implement logic to save changes to the server
        try {
            // Prepare the updated profile data
            const updatedProfile = {
                email: profile.emailAddress,
                username: profile.username,
                firstName: profile.nameFirst,
                lastName: profile.nameLast,
                // Add other fields as needed
            };
            console.log("Saving profile: {}", updatedProfile);

            // Make a PUT request to update the profile
            const response = await axios.put(`http://localhost:8080/auth/updateProfile/${userId}`, updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token for authentication
                },
            });
            console.log(response)
            if (response.status === 200){
                toast.success("Account updated successfully!")
            } else {
                toast.error("Failed to update account")
                console.log("Failed to create Account")
            }


            // Set edit mode to false after successful update
            setEditMode(false);
        } catch (error) {
            console.error("Error saving profile changes:", error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} with value ${value}`);
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
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
            <Button onClick={editMode ? handleSaveClick : handleEditClick} variant="contained" color="primary">
                {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button>
        </Box>
    );
}

export default ProfileDisplay;

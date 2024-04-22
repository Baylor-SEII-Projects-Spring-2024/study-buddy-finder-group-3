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

function TutorInfo() {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [profile, setProfile] = useState('');
    const [userId, setUserId] = useState('');
    const [tutorRatings, setTutorRatings] = useState([]);
    const theme = useTheme()
    const imagePath = avatarImage;
    // console.log(avatarImage);

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
            // console.log("API_URL: ", API_URL);
            const response = await axios.get(`${API_URL}/profile/${userId}`);
            setProfile(response.data);
            // console.log("USER:", response.data)

            console.log("Tutor Status: ", response.data.userType)
            console.log("Is Tutor: ", profile.userType)
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    };

    // Render the TutorInfo component only if tutorBool is true
    if (profile.userType == false) {
        console.log("NOT A TUTOR")
        return null; // If tutorBool is false, don't render anything
    }

    console.log(profile.userType);
    return (
        <Box className={styles.profileContainer}
             display="flex" flexDirection="column"
             sx={{
                 position: "relative",
                 backgroundColor: theme.palette.primary.secondary,
                 borderColor: theme.palette.primary.main
             }}
        >
        </Box>
    );
}

export default TutorInfo;
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

function TutorInfo() {
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

        </Box>
    );
}

export default TutorInfo;


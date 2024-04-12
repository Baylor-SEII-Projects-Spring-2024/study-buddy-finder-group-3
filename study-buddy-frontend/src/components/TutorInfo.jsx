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
    const [tutorBool, setTutorBool] = useState(false); // State to hold tutor status
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
            console.log("USER:", response.data)

            let tutorStatus = false;
            if (response.data.userType) {
                tutorStatus = response.data.userType === 'boolean';
            }

            setTutorBool(profile.userType);
            console.log("Tutor Status: ", tutorBool)
            console.log("Is Tutor: ", tutorBool)
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    };

    // Render the TutorInfo component only if tutorBool is true
    if (!tutorBool) {
        console.log("NOT A TUTOR")
        return null; // If tutorBool is false, don't render anything
    }

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
                    zIndex: 0 // Set lower zIndex to appear behind other elements
                }}
            >
                <Avatar
                    // src={profile.profilePictureUrl}
                    // src={avatarImage}
                    // src="/_next/static/media/StudyBuddyLogo.4d4a46a7.png"
                    src="/StudyBuddyLogo.png"
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
            </Box>
        </Box>
    );
}

export default TutorInfo;

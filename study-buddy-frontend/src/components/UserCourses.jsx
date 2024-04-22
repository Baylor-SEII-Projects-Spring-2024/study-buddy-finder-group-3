import React, {useEffect, useState} from "react";
import { Box, Typography, Avatar, Select, MenuItem, Link, Switch, Divider, Container } from '@mui/material';
import styles from "@/styles/ProfileDisplay.module.css";
import axios from "axios";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import { API_URL } from "@/utils/config";
import CreateCourse from "@/components/CreateCourse";
import { toast } from "react-toastify";
import {Title} from "@mui/icons-material";
import ProfileDisplay from "@/components/ProfileDisplay";
import {useTheme} from "@mui/material/styles";



function UserCourses() {
    const [receiveEmails, setReceiveEmails] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [profile, setProfile] = useState('');
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [theme, setTheme] = useState('light'); // State to track selected theme
    const [notifications, setNotifications] = useState(false);
    const [emails, setEmailUpdates] = useState(false);
    const [accountType, setAccountType] = useState('Student'); // change to current type
    const [openCreateCourseModal, setOpenCreateCourseModal] = useState(false);


    const handleOpenCreateCourseModal = () => {
        setOpenCreateCourseModal(true);
    };

    const handleCloseCreateCourseModal = () => {
        setOpenCreateCourseModal(false);
    };

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


    return (


        <Container style={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
            <Box
                id="home-section"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    marginLeft: '25vw',
                    marginTop: '10vh',
                    height: "100vh",
                    padding: 2,
                }}>
                <Typography variant="h4" gutterBottom>
                    Add Course
                </Typography>

                <Container>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenCreateCourseModal}
                    >
                        New Course
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => router.push("/courses/")}
                    >
                        Back
                    </Button>
                </Container>

                <CreateCourse open={openCreateCourseModal} onClose={handleCloseCreateCourseModal} />

                {/* Math  section */}
                <Box
                    border={1}
                    borderColor="primary.main"
                    borderRadius={8}
                    padding={2}
                    display="flex"
                    flexDirection="column"
                    width={"50vw"}
                >
                    <Typography variant="h8" gutterBottom>
                        Math
                    </Typography>
                    <Divider/>
                    <br/>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                    </div>
                </Box>
                <br/>

                {/* Science section */}
                <Box
                    border={1}
                    borderColor="primary.main"
                    borderRadius={8}
                    padding={2}
                    display="flex"
                    flexDirection="column"
                    width={"50vw"}

                >
                    <Typography variant="h8" gutterBottom>
                        Sciences
                    </Typography>
                    <Divider/>

                </Box>
                <br/>


                {/* Social Sciences section */}
                <Box
                    border={1}
                    borderColor="primary.main"
                    borderRadius={8}
                    padding={2}
                    display="flex"
                    flexDirection="column"
                    width={"50vw"}
                >
                    <Typography variant="h8" gutterBottom>
                        Social Sciences
                    </Typography>
                    <Divider/>


                </Box>

            </Box>
        </Container>


    );


}
export default UserCourses;
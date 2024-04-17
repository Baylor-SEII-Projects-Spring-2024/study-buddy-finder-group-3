import React, {useEffect, useState} from "react";
import { Box, Typography, Avatar, Select, MenuItem, Link, Switch, Divider } from '@mui/material';
import styles from "@/styles/ProfileDisplay.module.css";
import axios from "axios";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import { API_URL } from "@/utils/config";
import { toast } from "react-toastify";
import {Title} from "@mui/icons-material";


function SettingsMain() {
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

    // Handler for changing settings
    const handleEmailsChange = () => {
        setReceiveEmails(!receiveEmails);
    };

    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
    };
    const handleThemeChange = (event) => {
        setTheme(event.target.value);
        // add logic here to switch the theme
    };

    const handleNotificationsChange = (event) => {
        setNotifications(event.target.checked);
        //  add logic here to handle notifications setting change
    };
    const handleEmailUpdatesChange = (event) => {
        setEmailUpdates(event.target.checked);
        //  add logic here to handle email updates setting change
    };

    {/*
        overflowY: 'auto',
        marginLeft: '20vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        justifyContent: 'center',
        height: '80vh',*/}

    return (
    <Box
        id="home-section"
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "80vh",
            padding: 2,
        }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
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
                    Personal Information
                </Typography>
                <Divider/>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                    <Avatar alt="Profile Picture" src={profile.profilePictureUrl}
                            style={{marginTop: '10px', marginBottom: '10px', marginRight: '10px'}}/>
                    <Typography id="profile-container-title" variant="h6" component={"h2"}>
                        {profile.nameFirst} {profile.nameLast}
                    </Typography>
                </div>
            </Box>
            <br/>

            {/* Appearance  section */}
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
                    Appearance
                </Typography>
                <Divider/>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h8" gutterBottom style={{marginRight: '25vw'}}>
                        Theme
                    </Typography>
                    <Select
                        value={theme}
                        onChange={handleThemeChange}
                        style={{width: '150px', marginBottom: '10px'}}
                    >
                        label="Receive Email Updates"
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                </div>
            </Box>
            <br/>

            {/* Notifications section */}
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
                    Notifications
                </Typography>
                <Divider/>
                <FormControlLabel
                    control={<Switch checked={notifications} onChange={handleNotificationsChange}/>}
                    label="Receive notifications"
                />
                <FormControlLabel
                    control={<Switch checked={emails} onChange={handleEmailUpdatesChange}/>}
                    label="Receive Email Updates"
                />
            </Box>
            <br/>


            {/* Account/Privacy section */}
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
                    Account and Privacy
                </Typography>
                <Divider/>

                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <Typography variant="h8" gutterBottom style={{marginRight: '20px'}}>
                        Account
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginTop: '20px'}}
                    >
                        Edit
                    </Button>
                </div>
            </Box>

        </Box>


    );


}

/*
function SettingsMain() {
    const [selectedSetting, setSelectedSetting] = useState("Account");

    const handleSettingClick = (setting) => {
        setSelectedSetting(setting);
    };

    return (
        <div style={{ display: 'flex' }}>
            <SettingsSidebar onSettingClick={handleSettingClick} />
            {selectedSetting === "Account" && <AccountSettings />}
            {selectedSetting === "Courses" && <CourseSettings />}
            {selectedSetting === "Help" && <HelpSettings />}
        </div>
    );
}*/

const SettingsOption = ({title, description, value, onChange}) => {
    return (
        <div className="settings-option">
            <h3>{title}</h3>
            <p>{description}</p>
            <input type="checkbox" checked={value} onChange={onChange} />
        </div>
    );
};



function SettingsSidebar({ onSettingClick }) {
    return (
        <Box
            sx={{ width: "10vw", minHeight: "100vh", borderRight: "1px solid #ddd" }}
        >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h3>Settings</h3>
            </div>
            <Button fullWidth onClick={() => onSettingClick("Account")}>Account</Button>
            <Button fullWidth onClick={() => onSettingClick("Courses")}>Courses</Button>
            <Button fullWidth onClick={() => onSettingClick("Help")}>Help</Button>
        </Box>
    );
}



function AccountSettings() {
    return (
        <Box
            sx={{width: "75vw"}}
        >
            <div style={{display: 'flex', justifyContent: 'left', paddingLeft: "5vw"}}>
                <h3> Account Information</h3>
            </div>
            <div>
                <Button
                    fullWidth style={{justifyContent: 'left', paddingLeft: "5vw" }}
                >Change Password</Button>
            </div>
        </Box>
    )
}

function CourseSettings() {
    return (
        <Box
            sx={{width: "75vw"}}
        >
            <div style={{display: 'flex', justifyContent: 'left', paddingLeft: "5vw"}}>
                <h3> Course Information</h3>
            </div>
            <div>
                <Button fullWidth style={{ justifyContent: 'left', paddingLeft: "5vw" }}>Change Courses</Button>
                <Button fullWidth style={{ justifyContent: 'left', paddingLeft: "5vw" }}>Change Interests</Button>
            </div>
        </Box>
    )
}
function PrivacySettings() {
    return (
        <Box
            sx={{width: "75vw"}}
        >
            <div style={{display: 'flex', justifyContent: 'left', paddingLeft: "5vw"}}>
                <h3> Privacy and Safety</h3>
            </div>
            <div>
                <Button fullWidth style={{ justifyContent: 'left', paddingLeft: "5vw" }}>Block Accounts</Button>
            </div>
        </Box>
    )
}

function HelpSettings() {
    return (
        <Box
            sx={{width: "75vw"}}
        >
            <div style={{display: 'flex', justifyContent: 'left', paddingLeft: "5vw"}}>
                <h3> What can we help you with?</h3>
            </div>
            <div>
                <Button fullWidth style={{ justifyContent: 'left', paddingLeft: "5vw" }}>Additional Resources</Button>
            </div>
        </Box>
    )
}
export default SettingsMain;
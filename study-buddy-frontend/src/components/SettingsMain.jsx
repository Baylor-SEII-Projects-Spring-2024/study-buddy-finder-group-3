import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ProfileDisplay from "@/components/ProfileDisplay";
import {useTheme} from "@mui/material/styles";


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
}

function SettingsSidebar({ onSettingClick }) {
    return (
        <Box
            sx={{ /* width: "10vw", */ minHeight: "100vh", borderRight: "1px solid #ddd" }}
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

export default SettingsMain;

function AccountSettings() {
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: "75vw",
                padding: "15px"
        }}
        >
            {/*<div style={{display: 'flex', justifyContent: 'left', paddingLeft: "5vw"}}>*/}
            {/*    <h3> Account Information</h3>*/}
            {/*</div>*/}
            <Box
                sx={{
                    marginTop: "15px",
                    marginLeft: "80px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    minWidth: "30vw",
                    display: "inline-block",
                    width: "fit-content",
                    height: "fit-content",
                    backgroundColor: "#f7f0fa",
                    borderColor: theme.palette.primary.main
                }}
            >
                <ProfileDisplay />
            </Box>
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

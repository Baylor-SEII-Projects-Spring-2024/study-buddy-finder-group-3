import React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import Sidebar from "@/components/Sidebar";

function SettingsMain() {
    return (
        <div style={{display: 'flex'}}>
            <SettingsSidebar/>
            <AccountSettings/>
        </div>
    );
}

export default SettingsMain

function SettingsSidebar() {
    return (
        <Box
            sx={{width: "10vw", minHeight: "100vh", borderRight: "1px solid #ddd"}}
        >
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h3>Settings</h3>
            </div>
            <Button fullWidth>Account</Button>
            <Button fullWidth>Courses</Button>
            <Button fullWidth>Help</Button>

        </Box>
    )
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
                <Button fullWidth style={{ justifyContent: 'left' }}>Change Username</Button>
                <Button fullWidth style={{ justifyContent: 'left' }}>Change Password</Button>
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
                <h3> Account Information</h3>
            </div>
            <div>
                <Button fullWidth style={{ justifyContent: 'left' }}>Change Courses</Button>
            </div>
        </Box>
    )
}
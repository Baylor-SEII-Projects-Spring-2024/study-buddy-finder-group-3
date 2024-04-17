import React from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import SettingsMain from "@/components/SettingsMain"
import ProfileDisplay from "@/components/ProfileDisplay"
import landingstyles from "@/styles/landing.module.css"
import Box from "@mui/material/Box"

function courses() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header />
        </Box>
    )
}

export default courses

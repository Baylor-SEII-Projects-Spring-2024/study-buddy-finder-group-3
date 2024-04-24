import React from "react"
import Header from "@/components/Header"
import Box from "@mui/material/Box"
import DisplayCourses from "@/components/DisplayCourses";

function courses() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header />
            <DisplayCourses/>
        </Box>
    )
}

export default courses

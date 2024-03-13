import React, { useEffect } from "react"
import Header from "@/components/Header.jsx"
import Sidebar from "@/components/Sidebar.jsx"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import DisplayMeetings from "@/components/DisplayMeetings"
import Box from "@mui/material/Box"

function home() {
    const router = useRouter()
    const token = useSelector(selectToken)

    useEffect(() => {
        if (!token) {
            router.push("/")
        }
    }, [token, router])

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Header />
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                    <Sidebar />
                    <DisplayMeetings />
                </Box>
            </Box>
        </>
    )
}

export default home
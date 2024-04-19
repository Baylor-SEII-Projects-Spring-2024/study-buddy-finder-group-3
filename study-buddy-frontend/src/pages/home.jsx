import React, { useEffect, useState } from "react"
import Header from "@/components/Header.jsx"
import Sidebar from "@/components/Sidebar.jsx"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import DisplayMeetings from "@/components/DisplayMeetings"
import Box from "@mui/material/Box"
import { useAuth } from "@/utils/useAuth"
function home() {
    useAuth()
    const router = useRouter();
    const token = useSelector(selectToken);
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsCheckingToken(false);  
        }, 1000); 

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isCheckingToken && !token) {
            router.push("/");
        }
    }, [token, isCheckingToken, router]);
    
    return (

        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* <Header /> */}
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                    {/* <Sidebar /> */}
                    <DisplayMeetings />
                </Box>
            </Box>
        </>
    )
}

export default home
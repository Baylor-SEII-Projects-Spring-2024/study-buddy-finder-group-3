import React from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import UserCourses from "@/components/UserCourses"
import ProfileDisplay from "@/components/ProfileDisplay"
import landingstyles from "@/styles/landing.module.css"
import Box from "@mui/material/Box"
import styles from "@/styles/settings.module.css";

function addCourse() {
    return (
        <>
            <Header/>

            <div className={styles.container}>
                <div className={styles.UserCourses}>
                    <UserCourses />
                </div>
            </div>
            {/*<Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start">
                <UserCourses />
            </Box>*/}
        </>
    )
}

export default addCourse

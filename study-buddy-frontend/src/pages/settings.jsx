import React from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import SettingsMain from "@/components/SettingsMain"
import ProfileDisplay from "@/components/ProfileDisplay"
import landingstyles from "@/styles/landing.module.css"
import Box from "@mui/material/Box"
import styles from "@/styles/settings.module.css";

function settings() {
    return (
        <>
            <Header/>

            <div className={styles.container}>
                <div className={styles.settingsMain}>
                    <SettingsMain />
                </div>
            </div>
        </>
    )
}

export default settings

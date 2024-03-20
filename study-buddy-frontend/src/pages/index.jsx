import React, { useState } from "react"
import Head from "next/head"
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
} from "@mui/material"
import styles from "@/styles/Home.module.css"
import Header from "@/components/Header.jsx"
import LandingPage from "@/components/Landing"
import Sidebar from "@/components/Sidebar.jsx"

function landing() {
  return (
    <>
      <Head>
        <title>StudyBuddy | Your Go-To Study Site</title>
      </Head>
      {/* <Header /> */}

      <main>
        {/* <h1 className={landingstyles.testingCss}>Landing page</h1> */}
        <LandingPage />
      </main>
    </>
  )
}

export default landing
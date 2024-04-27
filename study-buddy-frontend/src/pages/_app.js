import React, { useEffect } from "react"
import Head from "next/head"
import { Provider as ReduxProvider } from "react-redux"

import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter"
import { CssBaseline } from "@mui/material"

import { StudyBuddyThemeProvider } from "@/utils/theme"
import { buildStore } from "@/utils/redux"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "@/styles/globals.css"
import { DevSupport } from "@react-buddy/ide-toolbox-next"
import { ComponentPreviews, useInitial } from "@/dev"

import "@/styles/globals.css"
import CustomCursor from "@/utils/customCursor"
import { useDispatch } from "react-redux"
import { setToken } from "@/utils/authSlice"
import ValidateToken from "@/utils/validateToken"
import { ActivePageProvider } from "@/utils/activePageContext"

// Initialize Redux
let initialState = {}
let reduxStore = buildStore(initialState)

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <CustomCursor/> */}
      <ReduxProvider store={reduxStore}>
        <ActivePageProvider>
          <TokenValidator />
          <AppCacheProvider>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
              <link rel="icon" href="/StudyBuddyLogo Background Removed.png" />
            </Head>

            <StudyBuddyThemeProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <ValidateToken />
              <DevSupport
                ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
              >
                <Component {...pageProps} />
              </DevSupport>
            </StudyBuddyThemeProvider>
          </AppCacheProvider>
          <ToastContainer position="bottom-right" />
        </ActivePageProvider>
      </ReduxProvider>
    </>
  )
}

function TokenValidator() {
  ValidateToken()
  return null
}

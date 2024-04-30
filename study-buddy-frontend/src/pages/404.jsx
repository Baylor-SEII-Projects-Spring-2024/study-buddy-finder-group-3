//404 erorr page
import React from "react"
import { Box, Typography, Button } from "@mui/material"
import { useRouter } from "next/router"

const Error404 = () => {
  const router = useRouter()

  const routeHome = () => {
    router.push("/")
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h1">401 - Not Authorized</Typography>
        <Button onClick={routeHome}>Go Home</Button>
      </Box>
    </>
  )
}

export default Error404

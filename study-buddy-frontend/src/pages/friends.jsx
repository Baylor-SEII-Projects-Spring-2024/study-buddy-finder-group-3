import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import FriendsList from "@/components/FriendsList"

function friends() {
  const token = useSelector(selectToken)
  const router = useRouter()
  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar/>
        <FriendsList/>
      </Box>
    </Box>
  )
}

export default friends

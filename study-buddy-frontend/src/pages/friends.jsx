import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import FriendsBar from "@/components/FriendsBar"
import FriendsSidebar from "@/components/FriendsPage/FriendsSidebar"
import FriendsSidebar2 from "@/components/FriendsPage/FriendsSidebar2"
import FriendsHeader from "@/components/FriendsPage/FriendsHeader"

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
      <FriendsSidebar2/>
    </Box>
  )
}

export default friends

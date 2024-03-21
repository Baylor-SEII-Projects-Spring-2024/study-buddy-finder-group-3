import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import FriendsSidebar2 from "@/components/FriendsPage/FriendsSidebar2"

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

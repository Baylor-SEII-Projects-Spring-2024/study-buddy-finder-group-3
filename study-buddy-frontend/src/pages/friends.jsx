import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import FriendsSidebar from "@/components/FriendsPage/FriendsSidebar"

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
      <FriendsSidebar/>
    </Box>
  )
}

export default friends

import React, { useEffect } from "react"
import ProfileDisplay from "@/components/ProfileDisplay"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import SearchBar from "@/components/SearchBar"

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
        <Sidebar />
        <SearchBar/>
      </Box>
    </Box>
  )
}

export default friends
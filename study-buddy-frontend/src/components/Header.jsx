import React, { useState, useEffect } from "react"
import axios from "axios"
import Login from "./Login"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { selectToken, setToken } from "@/utils/authSlice.js"
import CreateMeeting from "./CreateMeeting"

function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [createMeetingOpen, setCreateMeetingOpen] = useState(false)

  const handleCreateMeetingOpen = () => setCreateMeetingOpen(true)
  const handleCreateMeetingClose = () => setCreateMeetingOpen(false)

  const token = useSelector(selectToken)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = async () => {
    try {
      // implement this when we start backend
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  const handleLogout = async () => {
    dispatch(setToken(null))
    router.push("/")
  }

  const handleCreateAccount = async () => {
    router.push("/createAccount")
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <TextField
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        style={{ flex: 1, margin: "0 10px" }}
      />
      {!token && (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#1d612a",
            "&:hover": {
              backgroundColor: "#0a3011",
            },
          }}
        >
          Login
        </Button>
      )}
      {token && (
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: "#1d612a",
            "&:hover": {
              backgroundColor: "#0a3011",
            },
          }}
        >
          Logout
        </Button>
      )}
      {!token && (
        <Button
          variant="contained"
          onClick={handleCreateAccount}
          sx={{
            backgroundColor: "#1d612a",
            "&:hover": {
              backgroundColor: "#0a3011",
            },
          }}
        >
          Create Account
        </Button>
      )}
      {token && (
        <Button
          variant="contained"
          onClick={handleCreateMeetingOpen}
          sx={{
            ml: 1,
            backgroundColor: "#1d612a",
            "&:hover": {
              backgroundColor: "#0a3011",
            },
          }}
        >
          +
        </Button>
      )}

      <CreateMeeting
        open={createMeetingOpen}
        onClose={handleCreateMeetingClose}
      />

      <Login open={open} onClose={handleClose} />
    </Box>
  )
}

export default Header

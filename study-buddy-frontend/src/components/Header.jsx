import React, { useState } from "react"
import axios from "axios"
import Login from "./Login"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"

function Header() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

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
      <Login open={open} onClose={handleClose} />
    </Box>
  )
}

export default Header

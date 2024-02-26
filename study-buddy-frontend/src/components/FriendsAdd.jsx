import React, { useState, useEffect } from "react"
import axios from "axios"
import Login from "./Login"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectUser } from '@/utils/authSlice.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from "@mui/material"

function FriendsAdd() {
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([]);
  const [userId, setUserid] = useState('')
  const [searchTerm, setSearchTerm] = useState("")

  const token = useSelector(selectToken);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const fetchAddInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/friends/${searchTerm}/get`);
      setFriendsList(response.data);
    } catch (error) {
      console.error("Error fetching friends info:", error);
    }
  }

  const handleSearch = async () => {
    try {
        fetchAddInfo()
    } catch (error) {
      console.error("Search failed:", error)
    }
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
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
            placeholder="Search for friends..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            style={{ flex: 1, margin: "0 10px" }}
        />
        </Box>
        <List>
            {friends.map(user => (
            <ListItem key={user.user_id}>
                <ListItemButton>
                    <ListItemText primary={user.username} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
    </Box>
  )
}

export default FriendsAdd
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { Dialog, DialogContent, Fab, ListItemButton, Menu, Typography } from "@mui/material"
import { toast } from "react-toastify"
import { API_URL } from "@/utils/config"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import ProfileDisplay from "../ProfileDisplay"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"


function FriendsAdd() {
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([])
  const [userId, setUserid] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const anchorRef = React.useRef(null)
  const token = useSelector(selectToken)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [dialogOpen, setDialogOpen] = useState(false)
  const textFieldRef = useRef(null)
  const textFieldWidth = textFieldRef.current
    ? textFieldRef.current.getBoundingClientRect().width
    : 0

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    handleSearch()
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (user) {
      console.log("here")
      setUserid(user.id)
    }
  }, [user])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const fetchAddInfo = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/friends/${user.id}/get/${searchTerm}`
      )
      setFriendsList(response.data)
    } catch (error) {
      console.error("Error fetching friends info:", error)
    }
  }

  const handleSearch = async () => {
    try {
      fetchAddInfo()
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      console.log(friends.length)
    }
  }

  const sendRequest = (event, user2) => {
    try {
      axios
        .post(`${API_URL}/friends/${user.id}/request/${user2.id}`)
        .then((response) => {
          console.log(response)
        })
    } catch (error) {
      console.error("Error adding friend:", error)
    }

    toast.success("Friend request sent!", { position: "top-center" })

    const updatedFriends = friends.filter((user3) => user3.id !== user2.id)
    setFriendsList(updatedFriends)
  }

  const handleListItemClick = (event, user) => {
    //sendRequest(event, user)
    setDialogOpen(true)
  }

  return (
    <Box sx={{ flexGrow: 1 }} ref={anchorRef}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <IconButton onClick={handleClick}>
          <SearchIcon />
        </IconButton>
        <TextField
          ref={textFieldRef}
          placeholder="Search for friends..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          style={{ flex: 1, margin: "0 10px" }}
        />
      </Box>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={textFieldRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: textFieldWidth,
          },
        }}
      >
        {friends.length === 0 ? (
          <Typography marginLeft={1}>No Users Found</Typography>
        ) : (
          <List>
            {friends.map((user) => (
              <ListItem key={user.id}>
                <ListItemButton
                  onClick={(event) => handleListItemClick(event, user)}
                >
                  <ListItemText primary={user.username} />
                </ListItemButton>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                  <DialogContent>
                    <ProfileDisplay editable={false} uniqueId={user.id}/>
                  </DialogContent>
                  <DialogActions style={{justifyContent: "center"}}>
                  <Button onClick={(event) => sendRequest(event, user)} variant={"contained"}>
                    Send Friend Request
                  </Button>
                  </DialogActions>
                </Dialog>
              </ListItem>
            ))}
          </List>
        )}
      </Menu>
    </Box>
  )
}

export default FriendsAdd

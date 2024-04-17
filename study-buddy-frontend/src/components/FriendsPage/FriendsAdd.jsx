import React, { useState, useEffect } from "react"
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
import { ListItemButton } from "@mui/material"
import { toast } from "react-toastify"
import { API_URL } from "@/utils/config"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"

function FriendsAdd() {
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([])
  const [userId, setUserid] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const token = useSelector(selectToken)

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
    setOpen((prevOpen) => !prevOpen)
    try {
      fetchAddInfo()
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  const handleClose = (event) => {
    setOpen(false)
  }

  const handleListItemClick = (event, user2) => {
    try {
      axios
        .post(`${API_URL}/friends/${user.id}/request/${user2.id}`)
        .then((response) => {
          console.log(response)
        })
    } catch (error) {
      console.error("Error adding friend:", error)
    }

    toast.success("Friend request sent!")

    const updatedFriends = friends.filter((user3) => user3.id !== user2.id)
    setFriendsList(updatedFriends)
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
      <Popper open={open} disablePortal anchorEl={anchorRef.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper style={{ backgroundColor: "" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <List>
                  {friends.map((user) => (
                    <ListItem key={user.id}>
                      <ListItemButton
                        onClick={(event) => handleListItemClick(event, user)}
                      >
                        <ListItemText primary={user.username} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}

export default FriendsAdd

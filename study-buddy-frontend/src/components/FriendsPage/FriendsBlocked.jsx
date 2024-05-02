import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import axios from "axios"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import {
  ListItemButton,
  CircularProgress,
  Avatar,
  IconButton,
  Popper,
} from "@mui/material"
import FriendProfile from "./FriendProfile"
import { API_URL } from "@/utils/config"
import MenuIcon from "@mui/icons-material/Menu"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import CancelIcon from "@mui/icons-material/Cancel"

export default function FriendsBlocked() {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([])
  const [userId, setUserid] = useState("")
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = useState(true)
  const [openMenu, setOpenMenu] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [refresh, setRefresh] = useState(false)
  const [loadingPics, setLoadingPics] = useState(true)
  const [profilePics, setProfilePics] = useState([])
  const [triggerUpdate2ElectricBoogaloo, setTriggerUpdate2ElectricBoogaloo] = useState(false)

  const handleListItemClick = (event, user) => {
    setOpen(true)
  }

  useEffect(() => {
    // if (!token || !user) {
    //   router.push("/")
    // }

    if (user) {
      console.log("here")
      setUserid(user.id)
    }
    fetchAllInfo()
    getProfilePics(friends)
  }, [user, refresh, loadingPics, loading, triggerUpdate2ElectricBoogaloo])

  const fetchAllInfo = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/friends/${user.id}/getBlocked`
      )
      setFriendsList(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching blocked users info:", error)
    } finally {
      setLoading(false)
      setTriggerUpdate2ElectricBoogaloo(true)
    }
  }

  const unblockUser = (user2) => {
    try {
      axios
        .post(`${API_URL}/friends/${user.id}/unblock/${user2.id}`)
        .then((response) => {
          console.log(response)
          fetchAllInfo()
        })
    } catch (error) {
      console.error("Error unblocking user:", error)
    } finally {
      setTriggerUpdate2ElectricBoogaloo(false)
    }
  }

  const handleClose = (value) => {
    setOpenMenu(false)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpenMenu(false)
  }

  const getProfilePics = async (users) => {
    try {
      const config = {
        responseType: "blob",
      }
      console.log("Fetching profile pics...")
      const promises = []

      for (let i = 0; i < users.length; i++) {
        promises.push(
          new Promise((resolve, reject) => {
            axios
              .get(`${API_URL}/friends/${users[i].id}/pic`, config)
              .then((response) => {
                const reader = new FileReader()
                reader.readAsDataURL(response.data)
                reader.onload = () => {
                  resolve({ id: users[i].id, pic: reader.result })
                }
                reader.onloadend = () => {
                  if (i === friends.length - 1) {
                    setLoadingPics(false)
                    setTriggerUpdate2ElectricBoogaloo(!triggerUpdate2ElectricBoogaloo)
                  }
                }
              })
              .catch((error) => {
                reject(error)
                if (i === users.length - 1) {
                  setLoadingPics(false)
                }
              })
          })
        )
      }

      const profilePicsArray = await Promise.all(promises)

      setProfilePics(profilePicsArray)
    } catch (error) {
      console.error("Error fetching profile pics:", error)
    }
  }

  if (loading) {
    if (friends.length === 0 && !loadingPics) {
      return (
        <Typography
          variant="h3"
          padding={20}
          style={{ textAlign: "center" }}
          color={"gray"}
        >
          OH NO! You have no friends!
        </Typography>
      )
    }
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <div>
      {friends.length === 0 ? (
        <Typography
          variant="h3"
          padding={20}
          style={{ textAlign: "center" }}
          color={"gray"}
        >
          No blocked friends
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          <List>
            {friends.map((user, index) => (
              <ListItem key={user.id}>
                <ListItemButton
                  onClick={(event) => handleListItemClick(event, user)}
                  sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  <Avatar
                    alt="Profile Picture"
                    src={
                      profilePics[index]?.pic === "data:text/xml;base64,"
                        ? null
                        : profilePics[index]?.pic
                    }
                  />
                  <ListItemText
                    primary={user.username}
                    sx={{ marginLeft: "10px" }}
                  />
                  <IconButton
                    onClick={(event) => unblockUser(user)}
                    ref={anchorRef}
                  >
                    <CancelIcon />
                  </IconButton>
                </ListItemButton>

                {/* <FriendProfile user={user} open={open} onClose={handleClose} /> */}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  )
}

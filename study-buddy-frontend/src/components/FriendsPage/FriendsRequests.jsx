import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { useDispatch, useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import axios from "axios"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { API_URL } from "@/utils/config"
import { setNotifications } from "@/utils/notificationSlice"

export default function FriendsRequest({ onUpdate }) {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([])
  const [userId, setUserid] = useState("")
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!token || !user) {
  //     router.push("/")
  //   }
  // }, [token, router])

  useEffect(() => {
    if (user) {
      console.log("here")
      setUserid(user.id)
    }
    fetchAllInfo()
  }, [user])

  const fetchAllInfo = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/friends/${user.id}/getRequests`
      )
      setFriendsList(response.data)
    } catch (error) {
      console.error("Error fetching friends info:", error)
    }
  }

  const removeRequest = (user1) => {
    try {
      axios
        .post(`${API_URL}/friends/${user1.id}/delete/${user.id}`)
        .then((response) => {
          console.log(response)
          fetchNotifications(); // refresh notis after accepting friend request
        })
    } catch (error) {
      console.error("Error removing request:", error)
    }
    const updatedFriends = friends.filter((user2) => user2.id !== user1.id)
    setFriendsList(updatedFriends)
    onUpdate()
    
  }

  const fetchNotifications = async () => {
    if (user && user.id) {
      console.log("do i reach this");
      // check if user and user.id exist
      try {
        const response = await axios.get(
          `${API_URL}/user/${user.id}/notifications`
        )
        if (response.status === 200) {
          console.log("notifications", response.data)
          dispatch(setNotifications(response.data))
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error)
      }
    }
  }
  const handleListItemClick = async (event, user2) => {
    try {
      const response = await axios.post(`${API_URL}/friends/${user.id}/add/${user2.id}`);
      console.log(response);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
    removeRequest(user2);
  };
  
  return (
    <div>
      {friends.length === 0 ? (
        <Typography
          variant="h3"
          padding={20}
          style={{ textAlign: "center" }}
          color={"gray"}
        >
          No new requests.
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          <List>
            {friends.map((user) => (
              <ListItem key={user.id}>
                <ListItemText primary={user.username} />
                <Button onClick={(event) => handleListItemClick(event, user)}>
                  Accept
                </Button>
                <Button onClick={(event) => removeRequest(user)}>
                  Decline
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  )
}

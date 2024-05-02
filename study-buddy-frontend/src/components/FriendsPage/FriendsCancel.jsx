import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import axios from "axios"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { API_URL } from "@/utils/config"

export default function FriendsCancel({ onUpdate }) {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([])
  const [userId, setUserid] = useState("")

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
        `${API_URL}/friends/${user.id}/getOutgoingRequests`
      )
      setFriendsList(response.data)
    } catch (error) {
      console.error("Error fetching friends info:", error)
    }
  }

  const removeRequest = (user1) => {
    try {
      axios
        .post(`${API_URL}/friends/${user.id}/delete/${user1.id}`)
        .then((response) => {
          console.log(response)
        })
    } catch (error) {
      console.error("Error removing request:", error)
    }
    const updatedFriends = friends.filter((user2) => user2.id !== user1.id)
    setFriendsList(updatedFriends)
    onUpdate()
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
          No outgoing requests.
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          <List>
            {friends.map((user) => (
              <ListItem key={user.id} sx={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}>
                <ListItemText primary={user.username} />
                <Button onClick={(event) => removeRequest(user)}>
                  Cancel
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  )
}
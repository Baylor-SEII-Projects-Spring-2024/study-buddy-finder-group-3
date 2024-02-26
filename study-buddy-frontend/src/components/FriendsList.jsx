import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import axios from "axios"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function FriendsList() {


  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([]);
  const [userId, setUserid] = useState('')

  useEffect(() => {
    if (!token || !user) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (user){
      console.log('here')
      setUserid(user.id)
    }
    fetchAllInfo()
  }, [user])
  
  const fetchAllInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/friends/${user.id}/all`);
      setFriendsList(response.data);
    } catch (error) {
      console.error("Error fetching friends info:", error);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>

      <List>
        {friends.map(user => (
          <ListItem key={user.user_id}>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>

    </Box>
  );
}
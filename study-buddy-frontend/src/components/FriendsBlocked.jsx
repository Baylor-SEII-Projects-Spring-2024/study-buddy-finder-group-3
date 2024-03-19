import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import axios from "axios"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ListItemButton, CircularProgress } from "@mui/material";
import FriendProfile from "./FriendProfile";
import { API_URL } from "@/utils/config";

export default function FriendsBlocked() {


  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([]);
  const [userId, setUserid] = useState('')
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true); 

  const handleListItemClick = (event, user) => {
    setOpen(true);
  }

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
      const response = await axios.get(`${API_URL}/friends/${user.id}/getBlocked`);
      setFriendsList(response.data);
    } catch (error) {
      console.error("Error fetching blocked users info:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleClose = (value) => {
    setOpen(false);
  };

  if (loading) {
    
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {friends.length === 0 ? (
        <Typography variant="h3" padding={20} style={{textAlign: "center"}} color={"gray"}>
          No blocked friends
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}> 
          <List>
            {friends.map(user => (
              <ListItem key={user.user_id}>
                <ListItemButton onClick={(event) => handleListItemClick(event, user)}>
                  <ListItemText primary={user.username} />
                </ListItemButton>
                <FriendProfile user={user} open={open} onClose={handleClose} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
}
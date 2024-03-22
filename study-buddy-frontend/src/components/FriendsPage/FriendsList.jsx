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
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';



export default function FriendsList() {


  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([]);
  const [userId, setUserid] = useState('')
  const [open, setOpen] = useState(false);
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
      const response = await axios.get(`${API_URL}/friends/${user.id}/all`);
      setFriendsList(response.data);
    } catch (error) {
      console.error("Error fetching friends info:", error);
    } finally {
      setLoading(false);
    }
  }

  const removeFriend = async (friendId) => {
    try {
      await axios.post(`${API_URL}/friends/${user.id}/deleteFriend/${friendId}`);
      fetchAllInfo();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  }

  const vibeCheck = () => {
    console.log('vibe check')
  }

  const handleClose = (value) => {
    setOpen(false);
  };

  const textStyle = {
    whiteSpace: 'nowrap',
    animation: 'scroll 10s linear infinite', // Adjust animation duration as needed
    position: 'absolute',
    top: 0,
    left: 0,
  };

  if (loading) {
    
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{backgroundColor: ''}}>
      {friends.length === 0 ? (
        <Typography variant="h3" padding={20} style={{textAlign: "center"}} color={"gray"}>
          OH NO! You have no friends!
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1 }}> 
        <Typography variant="h3" padding={5} style={{textAlign: "center"}} color={"gray"}>
          Your Friends
        </Typography>
          <List>
            <Grid container spacing={3} justifyContent={'center'}>
              {friends.map(user => (
                <Grid item key={user.id}>
                  
                  <Card sx={{ maxWidth: 345, flexBasis: '100%', background: "#f7f0fa" }}>
                    <ListItem direction="row" alignItems="center" disablePadding sx={{ display: 'block' }}>
                    <CardActionArea onClick={(event) => handleListItemClick(event, user)}>
                      <CardMedia
                        component="img"
                        image="/green_iguana.jpg"
                        alt="green iguana"
                      />
                      
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" whiteSpace={'nowrap'}>
                          {user.nameFirst} {user.nameLast}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" whiteSpace={'nowrap'}>
                          {user.userType ? "Tutor" : "Student"}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" whiteSpace={'nowrap'}>
                          {user.areaOfStudy}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      
                    </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary" onClick={(event) => removeFriend(user.id)}>
                          Remove Friend
                        </Button>
                      </CardActions>
                      
                    </ListItem>
                    
                  </Card>
                  
                </Grid>
                
              ))}
            </Grid>
          </List>
        </Box>
      )}
    </div>
  );
}
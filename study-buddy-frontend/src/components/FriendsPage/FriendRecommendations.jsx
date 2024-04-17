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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from "react-toastify"

const fallbackPic = 'profilePicture.png';

export default function FriendsList() {


  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([]);
  const [userId, setUserid] = useState('')
  const [open, setOpen] = useState(false);
  const [loadingFriendsList, setLoadingFriendsList] = useState(true);
  const [loadingPics, setLoadingPics] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [profilePics, setProfilePics] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const handleListItemClick = (event, user) => {
    setSelectedUser(user);
    setOpen(true);
  }

  useEffect(() => {
    if (!token || !user) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (user){
      console.log('useEffect: FriendsList')
      setUserid(user.id)
    }
    fetchAllInfo()
    getProfilePics(friends)
    
    console.log(loadingPics)

  }, [user, selectedUser, loadingFriendsList, triggerUpdate, loadingPics])
  
  const fetchAllInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/recommendations/users/${user.id}`);
      setFriendsList(response.data);
    } catch (error) {
      console.error("Error fetching friends info:", error);
    } finally {
      getProfilePics(friends);
      setLoadingFriendsList(false);
    }
  }

  const requestFriend = (event, id) => {
    try {
        console.log(user.id)
        console.log(id)
      axios.post(`${API_URL}/friends/${user.id}/request/${id}`)
       .then(response => {
         console.log(response);
      })
    } catch (error) {
      console.error("Error adding friend:", error)
    }

    toast.success("Friend request sent!")

    setTriggerUpdate(!triggerUpdate);
      
  }


  const getProfilePics = async (users) => {
    try {
        const config = {
            responseType: "blob"
        };
        console.log("Fetching profile pics...")
        // Create an array to store promises
        const promises = [];

        for (let i = 0; i < users.length; i++) {
            promises.push(
                new Promise((resolve, reject) => {
                    axios.get(`${API_URL}/friends/${users[i].id}/pic`, config)
                        .then(response => {
                            const reader = new FileReader();
                            reader.readAsDataURL(response.data);
                            reader.onload = () => {
                                
                                resolve({ id: users[i].id, pic: reader.result });
                                
                            };
                            reader.onloadend = () => {
                              if (i === friends.length - 1) {
                                setLoadingPics(false);
                                
                                //setTriggerUpdate(!triggerUpdate);
                            }
                          }
                            
                        })
                        .catch(error => {
                            reject(error);
                            if (i === users.length - 1) {
                              setLoadingPics(false);
                              
                              console.log("Loading pics set to false")
                              //setTriggerUpdate(!triggerUpdate);
                          }
                        });
                })
            );
        }

        // Wait for all promises to resolve
        const profilePicsArray = await Promise.all(promises);

        // Update state with all profile pictures
        setProfilePics(profilePicsArray);
        
    } catch (error) {
        console.error("Error fetching profile pics:", error);
    }
};

  if (loadingPics) {

    
    
    if (friends.length === 0 && !loadingFriendsList) {
      return (
        <Typography variant="h3" padding={20} style={{textAlign: "center"}} color={"gray"}>
          OH NO! No recommendations available!
        </Typography>
      )
    }

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
          OH NO! No recommendations available!
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1 }}> 
        <Typography variant="h3" padding={5} style={{textAlign: "center"}} color={"gray"}>
          Here are some friends you may know!
        </Typography>
          <List>
            <Grid container spacing={5} justifyContent={'center'}>
              {friends.map((user, index) => (
                <Grid item key={user.id}>
                  
                  <Card sx={{ maxWidth: 345, flexBasis: '100%', background: "#f7f0fa", maxHeight: 496 }}>
                    <ListItem direction="row" alignItems="center" disablePadding sx={{ display: 'block' }}>
                    <CardActionArea onClick={(event) => handleListItemClick(event, user)}>
                      {/* <CardMedia
                        component="img"
                        image={profilePics[index]?.pic}
                        alt="profile picture"
                        width={345}
                        height={230}
                      /> */}
                      {/* <Avatar alt="Profile Picture" src={profilePics[index]?.pic} style={{ width: 345, height: 230 }} variant="square"
                      /> */}
                      <Avatar alt="Profile Picture" src={profilePics[index]?.pic === "data:text/xml;base64," ? null : profilePics[index]?.pic
                      } style={{ width: 345, height: 230 }} variant="square"
                      />
                      
                      <CardContent sx={{width: 345, height: 206, overflow: 'auto'}}>
                        <Typography gutterBottom variant="h5" component="div">
                          {user.nameFirst} {user.nameLast}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          {user.userType ? "Tutor" : "Student"}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          {user.areaOfStudy}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      
                    </CardActionArea>
                    
                      <CardActions >
                        <Button size="small" color="primary" onClick={(event) => requestFriend(event, user.id)} height={60}>
                          Request
                        </Button>
                        
                      </CardActions>
                      
                    </ListItem>
                    
                  </Card>
                  {/* <FriendProfile open={open} onClose={handleClose} user={selectedUser}/> */}
                </Grid>
                
              ))}
            </Grid>
          </List>
        </Box>
      )}
    </div>
  );
}
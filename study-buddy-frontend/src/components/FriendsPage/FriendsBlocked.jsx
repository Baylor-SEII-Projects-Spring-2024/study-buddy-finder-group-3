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
import { ListItemButton, CircularProgress, Avatar, IconButton, Popper } from "@mui/material";
import FriendProfile from "./FriendProfile";
import { API_URL } from "@/utils/config";
import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


const options = ['Unblock', 'option2', 'option3'];

export default function FriendsBlocked() {


  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [friends, setFriendsList] = useState([]);
  const [userId, setUserid] = useState('')
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true); 
  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, user) => {
    console.log('vibe check')
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

  const handleMenuOpen = (event, user) => {
    setOpenMenu((prevOpen) => !prevOpen);
    event.stopPropagation();
  }  

  const handleClose = (value) => {
    setOpenMenu(false);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenMenu(false);
  }

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
              <ListItem key={user.id}>
                
                <ListItemButton onClick={(event) => handleListItemClick(event, user)} sx={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                  <Avatar alt={user.username} src={'/green_iguana.jpg'} />
                  <ListItemText primary={user.username} sx={{marginLeft: '10px'}}/>
                  <IconButton onClick={(event) => handleMenuOpen(event, user)} ref={anchorRef}>
                    <MenuIcon />
                  </IconButton>
                  <Popper open={openMenu} anchorEl={anchorRef.current} transition disablePortal color="#f7f0fa">
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu" autoFocusItem>
                            {options.map((option, index) => (
                              <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                  </Popper>
                </ListItemButton>
                
                {/* <FriendProfile user={user} open={open} onClose={handleClose} /> */}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
}
import React from "react"
import Box from "@mui/material/Box"
import FriendsHeader from "./FriendsHeader"
import { IconButton, ListItemIcon, Typography } from "@mui/material"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ForumIcon from '@mui/icons-material/Forum';
import Slide from "@mui/material/Slide";
import FastRewindOutlinedIcon from '@mui/icons-material/FastRewindOutlined';
import { useEffect } from "react";
import { ListItemButton, ListItemText, List } from "@mui/material";
import FriendsList from "./FriendsList";
import zIndex from "@mui/material/styles/zIndex";
import Paper from "@mui/material";
import FriendsRequest from "./FriendsRequests";
import FriendsBlocked from "./FriendsBlocked";
import FriendsAdd from "./FriendsAdd";

export default function FriendsSidebar2() {
    const [activePage, setActivePage] = React.useState('list');
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef(null);
    const [checked, setChecked] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
      };

    const handleButtonClick = (button) => {
        {button === 'expand' ? toggleDrawer() : null}
        
        {button !== 'expand' ? setActivePage(button) : null}
    }

    useEffect(() => {
        const updateHeight = () => { {/*Im sure theres a better way to do this but idk what it is. This keeps the slide's line at the length of the screen*/}
            if (containerRef.current) {
                const padding = 65; // Adjust this value according to your padding
                const screenHeight = window.innerHeight;
                const maxHeight = screenHeight - padding;

                containerRef.current.style.height = `${maxHeight}px`;
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);


    return (
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", height: "100vh", flex: "1" }}>
            <Box sx={{ width: "50px", minHeight: "100vh", borderRight: "1px solid black", marginLeft: 1 }} >
                <IconButton sx={{marginTop: "80px", marginBottom: "10px"}} onClick={() => handleButtonClick('expand')}>
                    <MenuOpenIcon sx={{ color: "black" }}/>
                </IconButton>
                <IconButton onClick={() => handleButtonClick('list')} sx={{marginTop: '2px'}}>
                    <PeopleIcon/>
                </IconButton>
                <IconButton onClick={() => handleButtonClick('requests')} sx={{marginTop: '10px'}}>
                    <PersonAddIcon/>
                </IconButton>
                <IconButton onClick={() => handleButtonClick('blocked')} sx={{marginTop: '6px'}}>
                    <PersonOffIcon/>
                </IconButton>
                <IconButton onClick={() => handleButtonClick('chat')} sx={{marginTop: '8px'}}>
                    <ForumIcon/>
                </IconButton>
            </Box> 
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", flex: "1" }}>
                
                <FriendsHeader/>
                <Box style={{position: 'absolute', marginTop: "65px" , overflow:'hidden'}} ref={containerRef}>
                    <Slide direction="right" in={open} container={containerRef.current}>
                        <div style={{ position: 'relative', zIndex: 1, height: '100vh' }}> {/*Necessary for slide to appear on top of everything idk why the zindex doesnt do anything when applied to the box but whatever*/}
                        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", flex: "1", borderRight: "1px solid black"}}>
                            <Box sx={{backgroundColor: "#f7f0fa", display: 'flex', justifyContent: 'center', marginBottom: "", paddingTop: "15px", paddingRight: 1, paddingLeft: 1 }}>
                                <Typography variant="h6" fontWeight="bold" sx={{marginTop: "4px"}}>
                                    Friends
                                </Typography>
                                <IconButton onClick={() => handleButtonClick('expand')} >
                                <FastRewindOutlinedIcon sx={{color: "black" }}/>
                                </IconButton>
                            </Box>
                            <List sx={{paddingRight: 1, paddingLeft: 1 }}>
                                <ListItemButton onClick={() => handleButtonClick('list')}>
                                    <ListItemIcon>
                                        <PeopleIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="All" />
                                </ListItemButton>
                                <ListItemButton onClick={() => handleButtonClick('requests')}>
                                    <ListItemIcon>
                                        <PersonAddIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Requests" />
                                </ListItemButton>
                                <ListItemButton onClick={() => handleButtonClick('blocked')}>
                                    <ListItemIcon>
                                        <PersonOffIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Blocked" />
                                </ListItemButton>
                                <ListItemButton onClick={() => handleButtonClick('chat')}>
                                    <ListItemIcon>
                                        <ForumIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Chat" />
                                </ListItemButton>
                            </List>
                        </Box>
                        </div>
                    </Slide>
                </Box>
                {activePage === 'list' ? <Box> <FriendsList/> </Box> : null}
                {activePage === 'requests' ? 
                <Box> 
                    <FriendsAdd/>
                    <FriendsRequest/>
                </Box> : null}
                {activePage === 'blocked' ? <Box><FriendsBlocked/></Box> : null}
                {activePage === 'chat' ? <Box>Chat</Box> : null}
            </Box>
        </Box>
    )
}
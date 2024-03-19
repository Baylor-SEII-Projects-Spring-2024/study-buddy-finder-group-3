import React from "react"
import Box from "@mui/material/Box"
import FriendsHeader from "./FriendsHeader"
import { Drawer, IconButton, Typography } from "@mui/material"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Button } from "react-scroll";
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ForumIcon from '@mui/icons-material/Forum';
import Slide from "@mui/material/slide";


export default function FriendsSidebar2() {
    const [activePage, setActivePage] = React.useState('list');
    const [open, setOpen] = React.useState(true);
    const containerRef = React.useRef(null);
    const [checked, setChecked] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
      };

    const handleButtonClick = (button) => {
        {button === 'expand' ? toggleDrawer() : null}
        
        {button !== 'expand' ? setActivePage(button) : null}
    }


    return (
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", height: "100vh" }}>
            <Box sx={{ width: "70px", minHeight: "100vh", borderRight: "1px solid black", zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <IconButton sx={{marginTop: "70px"}} onClick={() => handleButtonClick('expand')}>
                    <MenuOpenIcon/>
                </IconButton>
                <IconButton onClick={() => handleButtonClick('list')}>
                    <PeopleIcon/>
                </IconButton>
                <IconButton onClick={() => handleButtonClick('requests')}>
                    <PersonAddIcon/>
                </IconButton>
                <IconButton onClick={() => handleButtonClick('blocked')}>
                    <PersonOffIcon/>
                </IconButton>
                <IconButton onClick={() => handleButtonClick('chat')}>
                    <ForumIcon/>
                </IconButton>
            </Box> 
            <Box sx={{ display: "flex", flexDirection: "column", flex: "1", height: "100%" }}>
                <FriendsHeader/>
                <Slide direction="right" in={open}>
                    <IconButton onClick={() => handleButtonClick('expand')}>
                        <MenuOpenIcon/>
                    </IconButton>
                </Slide>
                
                {activePage === 'list' ? <Box>Friends</Box> : null}
                {activePage === 'requests' ? <Box>Requests</Box> : null}
                {activePage === 'blocked' ? <Box>Blocked</Box> : null}
                {activePage === 'chat' ? <Box>Chat</Box> : null}
            </Box>
        </Box>
    )
}
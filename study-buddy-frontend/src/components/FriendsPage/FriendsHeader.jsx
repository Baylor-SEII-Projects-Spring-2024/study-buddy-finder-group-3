import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DropdownSelector from './SettingsMenu';
import { useRouter } from "next/router"
import SettingsMenu from './SettingsMenu';

export default function FriendsHeader() {
    const router = useRouter();

    const navigateToProfile = () => {
        router.push("/profile")
      }
    
      const navigateFriends = () => {
        router.push("/friends")
      }
    
      const navigateHome = () => {
        router.push("/home")
      }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}
            style={{boxShadow: "none", borderBottom: "1px solid black"}}>
                <Toolbar>
                    <Button onClick={navigateHome}>Home</Button>

                    <Button>Meetings</Button>

                    <SettingsMenu/>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
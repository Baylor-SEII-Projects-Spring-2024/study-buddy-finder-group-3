import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AppBar from '@mui/material/AppBar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { KeyboardArrowLeft } from '@mui/icons-material';
import FriendsAdd from './FriendsAdd';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ForumIcon from '@mui/icons-material/Forum';
import { Button } from '@mui/material';
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { selectToken, setToken, logout } from "@/utils/authSlice.js"

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: '#f7f0fa',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: '1px solid black',
});

const closedMixin = (theme) => ({
    backgroundColor: '#f7f0fa',
    
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
    borderRight: '1px solid black',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerHeader2 = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    borderRight: '1px solid black',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function FriendsSidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
    const dispatch = useDispatch()

    const navigateToProfile = () => {
        router.push("/profile")
      }
    
      const navigateFriends = () => {
        router.push("/friends")
      }
    
      const navigateHome = () => {
        router.push("/home")
      }

      const handleLogout = async () => {
        localStorage.removeItem("token")
        dispatch(logout());
        router.push("/")
      }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{boxShadow: "none", borderBottom: "1px solid black", backgroundColor: '#f7f0fa'}} sx={{zIndex: theme.zIndex.drawer + 1,}}>
      <Toolbar>
                    <Button onClick={navigateHome}>Home</Button>

                    <Button>Meetings</Button>

                    <Button>Settings</Button>

                    <Typography sx={{ flexGrow: 1, color: 'black', textAlign: 'center' }}>
                      Logo
                    </Typography>

                    <Button onClick={handleLogout} variant='contained'>Menu</Button>

                </Toolbar>
      </AppBar>
      <StyledDrawer variant="permanent" open={open}>
        {open ? (
            <Box sx={{display: 'flex', justifyContent: 'initial',  marginTop: '80px', marginLeft: '12px'}}>
                <Typography variant="h5" fontWeight="bold" sx={{marginTop: "4px", marginLeft: "10px"}}>
                    Friends
                </Typography>
                <IconButton onClick={toggleDrawer}>
                    <KeyboardArrowLeft style={{color: 'black'}}/>
                </IconButton>
            </Box>
        ) : (
            <Box sx={{display: 'flex', justifyContent: 'initial', marginTop: '80px', marginLeft: '12px'}}>
                <IconButton onClick={toggleDrawer}>
                    <KeyboardArrowRightIcon style={{color: 'black'}}/>
                </IconButton>
            </Box>
        )
        }
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}}>
                <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',}}>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"All"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}}>
                <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',}}>
                    <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Requests"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}}>
                <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',}}>
                    <PersonOffIcon />
                </ListItemIcon>
                <ListItemText primary={"Blocked"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}}>
                <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',}}>
                    <ForumIcon />
                </ListItemIcon>
                <ListItemText primary={"Chat"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <FriendsAdd/>
      </Box>
    </Box>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import styled from '@mui/system/styled';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@emotion/react';
import { Padding } from '@mui/icons-material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Grid from '@mui/material/Grid';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      
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

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleButtonClick = () => {
        setOpen(!open);
    };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}} color=''
        style={{boxShadow: "none", borderBottom: "none"}}
        >
        <Toolbar
        style={{marginLeft: 56, borderBottom: '1px solid #000'}}
        >
            {/* <Box color={'black'} position="relative"
                marginLeft={10}
                
            /> */}
            <Typography variant="h6" noWrap component="div">
                Clipped drawer
            </Typography>
            <Button onClick={handleButtonClick} variant="contained" color="primary">
                {open ? 'Close' : 'Open'}
            </Button>
        </Toolbar>
      </AppBar>
      <Divider orientation="vertical"
                position="absolute"
                style={{backgroundColor: 'black', height: '100vh'}}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, marginLeft: 7 }}
            />
      <StyledDrawer variant="permanent" open={open} 
      PaperProps={{
        sx: {
            borderRight: open ? 1 : 'none',
            
        }
      }
        }
      >
        <DrawerHeader> {/*This exists to space the components since drawer ignores containers for some reason*/}
        </DrawerHeader>
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItem
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }} >
                    <Typography variant="h6">
                        Friends
                    </Typography>
                </ListItemText>
              </ListItem>
            </ListItem>
        </List>
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* main content */}
      </Box>
    </Box>
  );
}
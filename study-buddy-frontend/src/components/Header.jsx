import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/utils/authSlice.js";

const sections = [
  { title: "Home", id: "home-section" },
  { title: "Meetings", id: "meetings-section" },
  { title: "Friends", id: "friends-section" },
];

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const offset = 64; 
    
    const position = section.getBoundingClientRect().top + window.pageYOffset - offset;
  
    window.scrollTo({
      top: position,
      behavior: "smooth"
    });
  };
  
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* Sections on the left */}
        <Box style={{ display: "flex", flexGrow: 1 }}>
          {sections.map((section) => (
            <Button
              key={section.title}
              color="inherit"
              onClick={() => scrollToSection(section.id)}
            >
              {section.title}
            </Button>
          ))}
        </Box>
        <Box>
          <IconButton
            color="inherit"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleNotificationClick}
          >
            {/* replace w atctual count eventualyl */}
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="notification-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseNotificationMenu}
          >
            {/* replace all */}
            <MenuItem onClick={handleCloseNotificationMenu}>
              You have a new notification.
            </MenuItem>
            <MenuItem onClick={handleCloseNotificationMenu}>
              Another notification here.
            </MenuItem>
            <MenuItem onClick={handleCloseNotificationMenu}>
              Yet another notification.
            </MenuItem>
          </Menu>
        </Box>
        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

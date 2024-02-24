import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { theme } from '@/utils/theme';
import Button from "@mui/material/Button"

export default function FriendsList() {

  const [activeButton, setActiveButton] = React.useState('all');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="" 
        style={{boxShadow: "none", borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd"}}
      >
        <Toolbar>
        <div>
          <Typography variant="h6">
            Friends
          </Typography>
        </div>
          <Divider orientation="vertical" variant="middle" flexItem 
            style={{marginRight: theme.spacing(2), marginLeft: theme.spacing(2)}}
          />
            <Button onClick={() => handleButtonClick('all')} variant={activeButton === 'all' ? 'contained' : 'text'}>All</Button>
            <Button onClick={() => handleButtonClick('pending')} variant={activeButton === 'pending' ? 'contained' : 'text'}>Pending</Button>
            <Button onClick={() => handleButtonClick('blocked')} variant={activeButton === 'blocked' ? 'contained' : 'text'}>Blocked</Button>
        </Toolbar>
      </AppBar>
      {activeButton === 'all' && <div>All Content Here</div>}
      {activeButton === 'pending' && <div>Pending Content Here</div>}
      {activeButton === 'blocked' && <div>Blocked Content Here</div>}
    </Box>
  );
}
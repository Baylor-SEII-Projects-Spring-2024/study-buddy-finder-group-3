import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import SearchBar from './SearchBar';

const FriendsList = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)} fullWidth>
        Friends
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <SearchBar/>
      </Drawer>
    </div>
  );
};

export default FriendsList;

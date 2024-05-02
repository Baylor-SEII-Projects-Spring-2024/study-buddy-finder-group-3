import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FriendsSidebar from '@/components/FriendsPage/FriendsSidebar';
import AuthProgress from '@/components/AuthProgress';

function Friends() {
  const [authComplete, setAuthComplete] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {!authComplete ? (
        <AuthProgress onAuthComplete={() => setAuthComplete(true)} />
      ) : (
        <FriendsSidebar />
      )}
    </Box>
  );
}

export default Friends;

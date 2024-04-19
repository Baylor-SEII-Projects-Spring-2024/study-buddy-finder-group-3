// friends.js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import FriendsSidebar from '@/components/FriendsPage/FriendsSidebar';
import { useAuth } from '@/utils/useAuth';

function Friends() {
  const isCheckingToken = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isCheckingToken) {
      // reset progress
      setProgress(0);
      // update progress every 50ms
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 2;
          if (nextProgress > 100) {
            clearInterval(timer);
            return 100;
          }
          return nextProgress;
        });
      }, 50);
    } else {
      setProgress(100);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isCheckingToken]);

  // if (isCheckingToken) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2)
      }}>
        <Typography variant="h6" style={{ marginBottom: theme.spacing(2) }}>Checking authentication...</Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: '100%', // Full width for better visual impact
            height: 8, // Thicker bar for better visibility
            borderRadius: 5, // Rounded corners
            backgroundColor: theme.palette.grey[300] // Soft background color
          }}
        />
      </Box>
    );
  // }

  // return (
  //   <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
  //     <FriendsSidebar />
  //   </Box>
  // );
}

export default Friends;

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useAuth } from '@/utils/useAuth';
import { useTheme } from '@emotion/react';

function AuthProgress({ onAuthComplete }) {
  const theme = useTheme();
  const isCheckingToken = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isCheckingToken) {
      setProgress(0);
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
      onAuthComplete();
    }
    return () => clearInterval(timer);
  }, [isCheckingToken, onAuthComplete]);

  if (!isCheckingToken) {
    return null;
  }

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
          width: '100%',
          height: 8,
          borderRadius: 5,
          backgroundColor: theme.palette.grey[300]
        }}
      />
    </Box>
  );
}

export default AuthProgress;

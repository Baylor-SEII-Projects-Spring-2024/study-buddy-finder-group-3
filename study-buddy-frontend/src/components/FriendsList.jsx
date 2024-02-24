import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { theme } from '@/utils/theme';
import Button from "@mui/material/Button"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { styled } from '@mui/material/styles';


export default function FriendsList() {

  const [activeButton, setActiveButton] = React.useState('all');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const StyledButton = styled(Button)({
    color: 'white',
    background: 'lightgray',
    variants: 'contained',
    '&:hover': {
      background: 'DimGray',
      color: 'white'
    },
    fontSize: theme.typography.button.fontSize,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`
  });

  const AddFriendsButton = styled(Button)({
    color: 'white',
    background: 'linear-gradient(90deg, rgba(255,0,4,1) 36%, rgba(252,162,0,1) 79%)',
    backgroundColor: 'red',
    variants: 'contained',
    '&:hover': {
      background: 'white',
      color: 'red'
    },
    '&.active': {
      background: 'linear-gradient(90deg, rgba(255,0,4,1) 36%, rgba(252,162,0,1) 79%)',
      color: 'white'
    },
    fontSize: theme.typography.button.fontSize,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    transition: 'none'
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="" 
        style={{boxShadow: "none", borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd"}}
      >
        <Toolbar>
          <PeopleAltIcon style={{marginRight: theme.spacing(2)}}/>
        <div>
          <Typography variant="h6">
            Friends
          </Typography>
        </div>
          <Divider orientation="vertical" variant="middle" flexItem 
            style={{marginRight: theme.spacing(2), marginLeft: theme.spacing(2)}}
          />
            <StyledButton onClick={() => handleButtonClick('all')} variant={activeButton === 'all' ? 'contained' : 'text'} 
            sx={{ background: activeButton === 'all' ? 'gray' : 'inherit', color: activeButton === 'all' ? 'white' : 'inherit', boxShadow: activeButton === 'blocked' ? 'none' : 'inherit'}}>All</StyledButton>
            <StyledButton onClick={() => handleButtonClick('pending')} variant={activeButton === 'pending' ? 'contained' : 'text'}
            sx={{ background: activeButton === 'pending' ? 'gray' : 'inherit', color: activeButton === 'pending' ? 'white' : 'inherit', boxShadow: activeButton === 'blocked' ? 'none' : 'inherit'}}>Pending</StyledButton>
            <StyledButton onClick={() => handleButtonClick('blocked')} variant={activeButton === 'blocked' ? 'contained' : 'text'}
            sx={{ background: activeButton === 'blocked' ? 'gray' : 'inherit', color: activeButton === 'blocked' ? 'white' : 'inherit', boxShadow: activeButton === 'blocked' ? 'none' : 'inherit'}}>Blocked</StyledButton>
            <AddFriendsButton onClick={() => handleButtonClick('add')}
            sx={{ background: activeButton === 'add' ? 'white' : '', color: activeButton === 'add' ? 'red' : '', boxShadow: activeButton === 'blocked' ? 'none' : 'inherit'}}
            >Add Friends</AddFriendsButton>
        </Toolbar>
      </AppBar>
      {activeButton === 'all' && <div>
          <Typography variant="h3" padding={20} style={{textAlign: "center"}} paddingRight={120} color={"gray"}>
            OH NO! You have no friends!
          </Typography>
        </div>}
      {activeButton === 'pending' && <div>Pending Content Here</div>}
      {activeButton === 'blocked' && <div>Blocked Content Here</div>}
      {activeButton === 'add' && <div>Add Friends Content Here</div>}
    </Box>
  );
}
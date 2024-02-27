import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { theme } from '@/utils/theme';
import Button from "@mui/material/Button";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { styled } from '@mui/material/styles';
import FriendsList from './FriendsList';
import FriendsAdd from './FriendsAdd';
import FriendsRequests from './FriendsRequests';
import Badge from '@mui/material/Badge';

export default function FriendsBar() {

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
      color: 'white',
      boxShadow: 'none'
    },
    fontSize: theme.typography.button.fontSize,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    transition: 'none'
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
            sx={{ background: activeButton === 'all' ? 'gray' : 'inherit', color: activeButton === 'all' ? 'white' : 'inherit', boxShadow: activeButton === 'all' ? 'none' : 'inherit'}}>All</StyledButton>
            {/* <Badge badgeContent={4} color="primary"> */}
            <StyledButton onClick={() => handleButtonClick('requests')} variant={activeButton === 'requests' ? 'contained' : 'text'}
            sx={{ background: activeButton === 'requests' ? 'gray' : 'inherit', color: activeButton === 'requests' ? 'white' : 'inherit', boxShadow: activeButton === 'requests' ? 'none' : 'inherit'}}>Requests</StyledButton>
            {/* </Badge> */}
            <StyledButton onClick={() => handleButtonClick('blocked')} variant={activeButton === 'blocked' ? 'contained' : 'text'}
            sx={{ background: activeButton === 'blocked' ? 'gray' : 'inherit', color: activeButton === 'blocked' ? 'white' : 'inherit', boxShadow: activeButton === 'blocked' ? 'none' : 'inherit'}}>Blocked</StyledButton>
            
            <AddFriendsButton onClick={() => handleButtonClick('add')}
            sx={{ background: activeButton === 'add' ? 'white' : '', color: activeButton === 'add' ? 'red' : '', boxShadow: activeButton === 'add' ? 'none' : 'inherit'}}
            >Add Friends</AddFriendsButton>
        </Toolbar>
      </AppBar>
      {activeButton === 'all' && 
        <div>
          <FriendsList/>
        </div>}
      {activeButton === 'requests' && 
        <div>
            <FriendsRequests/>
        </div>}
      {activeButton === 'blocked' && 
        <div>
          <Typography variant="h3" padding={20} style={{textAlign: "center"}} color={"gray"}>
            No blocked friends
          </Typography>
        </div>}
      {activeButton === 'add' && 
        <div>
          <FriendsAdd/>
        </div>}
    </Box>
  );
}
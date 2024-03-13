import React, { useState, useEffect } from "react"
import axios from "axios"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "@/styles/login-create.module.css";
import {TextField} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { API_URL } from "@/utils/config";


function FriendProfile({ open, onClose, user }) {
  const [profile, setProfile] = useState('');
  const [userId, setUserid] = useState('')

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    if (user){
      console.log('here')
      setUserid(user.id)
    }
    fetchProfileInfo()
  }, [user])
  
  const fetchProfileInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile/${user.id}`);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile info:", error);
    }
  }
  



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
    >
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleClose}>
            <Box className={styles.loginCreate} sx={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar alt="Profile Picture" src={profile.profilePictureUrl} style={{ marginTop: '10px', marginBot: '10px', marginRight: '10px' }} />
                    <Typography id="profile-container-title" variant="h6" component={"h2"}>
                        {profile.nameFirst} {profile.nameLast}
                    </Typography>
                </div>
                <TextField
                    margin="normal"
                    fullWidth
                    label=""
                    name="email"
                    value={profile.emailAddress || ''}
                    disabled
                    sx={{ backgroundColor: '#f0f0f0', width: '300px' }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label=""
                    name="username"
                    value={profile.username || ''}
                    disabled
                    sx={{ backgroundColor: '#f0f0f0', width: '300px' }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label=""
                    name="nameFirst"
                    value={profile.nameFirst || ''}
                    disabled
                    sx={{ backgroundColor: '#f0f0f0', width: '300px' }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label=""
                    name="nameLast"
                    value={profile.nameLast || ''}
                    disabled
                    sx={{ backgroundColor: '#f0f0f0', width: '300px' }}
                />
                <Button fullWidth variant="text" onClick={handleClose}>
                    Close
                </Button>
            </Box>
        </Box>
    </Modal>
  )
}

export default FriendProfile
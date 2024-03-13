import React, { useState, useEffect } from "react"
import axios from "axios"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "@/styles/ProfileDisplay.module.css";
import {TextField} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import { API_URL } from "@/utils/config";


function ProfileDisplay() {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [profile, setProfile] = useState('');
  const [userId, setUserid] = useState('')

  useEffect(() => {
    if (!token || !user) {
      router.push('/');
    }
  }, [token, router]);

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
      <Box className={styles.profileCreate} sx={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
      </Box>
    // <>
    // <div className={"profile-container"}>
    //   {profile && (
    //       <>
    //         <div className={"profile-field"}>
    //           <p>Email: {profile.emailAddress}</p>
    //         </div>
    //         <div className={"profile-field"}>
    //           <p>Username: {profile.username}</p>
    //         </div>
    //         <div className={"profile-field"}>
    //           <p>Name: {profile.nameFirst} {profile.nameLast}</p>
    //         </div>
    //       </>
    //   )}
    //   <p>{profile.emailAddress}</p>
    //   <p>{profile.username}</p>
    //   <p>{profile.nameFirst} {profile.nameLast}</p>
    // </div>
    // </>
  )
}

export default ProfileDisplay

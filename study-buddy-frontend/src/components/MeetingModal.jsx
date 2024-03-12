import FriendProfile from "./FriendProfile";
import CloseIcon from "@mui/icons-material/Close"
import React, { useState, useEffect } from "react"
import {
  List,
  ListItem,
  Typography,
  Link,
  Box,
  Modal,
  IconButton,
} from "@mui/material"


function MeetingModal({ meeting, open, handleClose }) {
    const [friendProfileOpen, setFriendProfileOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
  
    const handleOpenFriendProfile = (user) => {
      setSelectedUser(user);
      setFriendProfileOpen(true);
    };
  
    const handleCloseFriendProfile = () => {
      setFriendProfileOpen(false);
    };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
          {meeting.title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{meeting.description}</Typography>
        {meeting.link && (
          <Link
            href={meeting.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "block", mt: 2 }}
          >
            Join Online Meeting
          </Link>
        )}
        <Typography sx={{ mt: 2 }}>
          Date: {new Date(meeting.date).toLocaleString()}
        </Typography>
        <Typography>Location: {meeting.location || "Not specified"}</Typography>
        <Typography sx={{ mt: 2 }}>Attendees:</Typography>
        <List sx={{ maxHeight: 200, overflow: 'auto' }}>
          {meeting.attendeeProfiles && meeting.attendeeProfiles.map((profile) => (
            <ListItem key={profile.username} button onClick={() => handleOpenFriendProfile(profile)}>
              <Typography variant="body2">
                {profile.nameFirst} {profile.nameLast} ({profile.username})
              </Typography>
            </ListItem>
          ))}
        </List>
        {selectedUser && (
          <FriendProfile
            open={friendProfileOpen}
            onClose={handleCloseFriendProfile}
            user={selectedUser}
          />
        )}

      </Box>
    </Modal>
  )
}

export default MeetingModal

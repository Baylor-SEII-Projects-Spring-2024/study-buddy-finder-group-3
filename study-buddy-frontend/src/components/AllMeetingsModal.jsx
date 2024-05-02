import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, List, ListItem, IconButton, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function AllMeetingsModal({ open, handleClose, meetings, onMeetingClick, onDeleteMeeting }) {
  const [hoveredMeetingId, setHoveredMeetingId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredMeetingId(id);
  };

  const handleMouseLeave = () => {
    setHoveredMeetingId(null);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>All Meetings</DialogTitle>
      <DialogContent>
        <List>
          {meetings.map(meeting => (
            <ListItem
              key={meeting.id}
              onMouseEnter={() => handleMouseEnter(meeting.id)}
              onMouseLeave={handleMouseLeave}
              button
              onClick={() => onMeetingClick(meeting)}
            >
              <Typography variant="h6">{meeting.title}</Typography>
              <Typography variant="body2">{meeting.description}</Typography>
              {hoveredMeetingId === meeting.id && (
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => onDeleteMeeting(meeting)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default AllMeetingsModal;

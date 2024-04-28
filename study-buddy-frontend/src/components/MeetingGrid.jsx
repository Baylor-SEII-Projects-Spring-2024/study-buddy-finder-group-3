import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';

function truncateDescription(description) {
  const maxChars = 100;
  return description.length > maxChars ? description.substring(0, maxChars) + "..." : description;
}

function truncateTitle(title) {
  const maxChars = 58;
  return title.length > maxChars ? title.substring(0, maxChars) + "..." : title;
}


function MeetingGrid({ meetings, handleMouseEnter, handleMouseLeave, handleOpenModal, handleOpenDeleteDialog, hoveredMeetingId, handleOpenAllMeetingsModal }) {
  // filter and sort upcoming meetings
  const upcomingMeetings = meetings
    .filter(meeting => new Date(meeting.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // filter and sort expired meetings
  const expiredMeetings = meetings
    .filter(meeting => new Date(meeting.date) <= new Date())
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // get the number of expired meetings needed to display
  const numExpiredNeeded = 6 - upcomingMeetings.length;

  // combined upcoming and expired meetings to display
  const displayMeetings = upcomingMeetings.concat(expiredMeetings.slice(0, numExpiredNeeded));

  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      {displayMeetings.map((meeting) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={meeting.id}
          onMouseEnter={() => handleMouseEnter(meeting.id)}
          onMouseLeave={handleMouseLeave}
        >
          <Card style={{ position: "relative" }}>
            <CardActionArea onClick={() => handleOpenModal(meeting)}>
              <CardMedia
                component="img"
                height="140"
                image="/StudyBuddyLogo Background Removed.png"
                alt={meeting.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {truncateTitle(meeting.title)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truncateDescription(meeting.description)}
                </Typography>
                <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Date: {new Date(meeting.date).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Location: {meeting.location || "Not specified"}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            {hoveredMeetingId === meeting.id && (
              <IconButton
                onClick={() => handleOpenDeleteDialog(meeting)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "red",
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Card>
        </Grid>
      ))}
      { (
        <Grid item xs={12} textAlign="center">
          <Button onClick={handleOpenAllMeetingsModal} variant="contained" color="primary">
            View All
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default MeetingGrid;

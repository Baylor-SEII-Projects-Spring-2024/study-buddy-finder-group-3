import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function CreateMeeting({ open, onClose }) {
  const [meetingDate, setMeetingDate] = React.useState(new Date());

  const handleDateChange = (newDate) => {
    setMeetingDate(newDate);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-meeting-modal"
      aria-describedby="create-meeting-modal-description"
    >
      <Box sx={style}>
      <TextField
          margin="dense"
          id="meetingLocation"
          label="Add Title"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            sx={{ mt: 2 }}

            label="Start Time"
            value={meetingDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          margin="dense"
          id="meetingLocation"
          label="Add location"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
        />
        <TextField
          margin="dense"
          id="meetingDescription"
          label="Add description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={onClose} sx={{ mt: 2, float: 'right' }}>
          Save
        </Button>
        <Button variant="outlined" color="error"  onClick={onClose} sx={{ mt: 2, float: 'right' }}>
          Cancel
        </Button>

        
      </Box>
    </Modal>
  );
}

export default CreateMeeting;

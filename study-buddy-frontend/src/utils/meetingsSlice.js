import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMeetingsByUserId = createAsyncThunk(
  'meetings/fetchByUserId',
  async (userId) => {
    const response = await axios.get(`http://localhost:8080/meeting/user/${userId}/meetings`);
    return response.data; 
  }
);


const meetingsSlice = createSlice({
    name: 'meetings',
    initialState: {
      meetings: [],
      status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMeetingsByUserId.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchMeetingsByUserId.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.meetings = action.payload;
        })
        .addCase(fetchMeetingsByUserId.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    }
  });
  
  export default meetingsSlice.reducer;
  
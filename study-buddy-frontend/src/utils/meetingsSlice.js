import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './authSlice'
import axios from 'axios';
import { API_URL } from './config';

export const fetchMeetingsByUserId = createAsyncThunk(
  'meetings/fetchByUserId',
  async (userId) => {
    const response = await axios.get(`${API_URL}/meeting/user/${userId}/meetings`);
    console.log('meeting response data', response.data);
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
        })
        .addCase(logout, (state) => {
          // clear meetings on logout
          state.meetings = [];
          state.status = 'idle';
          state.error = null;
        });
    }
  });
  
  export default meetingsSlice.reducer;
  
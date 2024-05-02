import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notificationCount: 0,
  pendingInvitations: [],
  friendRequests: []
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.pendingInvitations = action.payload.pendingInvitations;
      state.friendRequests = action.payload.friendRequests;
      state.notificationCount = action.payload.pendingInvitations.length + action.payload.friendRequests.length;
    },
  },
});

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

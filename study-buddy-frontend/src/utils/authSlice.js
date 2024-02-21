import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
          },      
    },
})

export const { setToken, setUser } = authSlice.actions

export const selectToken = (state) => state.auth.token;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer

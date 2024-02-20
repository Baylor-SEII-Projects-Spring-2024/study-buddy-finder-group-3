import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
})

export const { setToken } = authSlice.actions

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from './authSlice'
import meetingsReducer from './meetingsSlice';

const reducers = combineReducers({
    auth: authReducer,
    meetings: meetingsReducer
    // Add your reducers here
});

export const buildStore = (initialState) => {
    return configureStore({
        preloadedState: initialState,
        reducer: reducers,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(thunk);
        },
        devTools: process.env.NODE_ENV !== 'production'
    });
};
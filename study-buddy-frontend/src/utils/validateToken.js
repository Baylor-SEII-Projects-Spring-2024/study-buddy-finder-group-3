import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser, logout } from '@/utils/authSlice';
import { API_URL } from './config';
import { setToken } from '@/utils/authSlice';

const ValidateToken = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const validateToken = async () => {
            console.log(localStorage);
            const token = localStorage.getItem('token');
            if (token) {
                console.log("grabbed token from ls", token);
                try {
                    const response = await axios.get(`${API_URL}/auth/validateToken`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log("server token response", response);
                    dispatch(setUser(response.data));
                    dispatch(setToken(token));
                } catch (error) {
                    console.log('Token validation failed:', error);
                    dispatch(logout());
                }
            }
        };

        validateToken();
    }, [dispatch]);
    
    return null;
};

export default ValidateToken
// src/context/AuthContext.jsx
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { loginUser, getUserProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            getUserProfile(token).then(setUser).catch(() => {
                setToken('');
                setUser(null);
                localStorage.removeItem('token');
            });
        }
    }, [token]);

    const login = async (credentials) => {
        const data = await loginUser(credentials);
        setToken(data.token);
        localStorage.setItem('token', data.token);
    };

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// src/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Registrar usuario
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

// Iniciar sesión
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

// Obtener perfil de usuario
export const getUserProfile = async (token) => {
    const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

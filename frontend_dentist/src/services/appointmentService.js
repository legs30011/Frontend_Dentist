// src/services/appointmentService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Crear cita
export const createAppointment = async (appointmentData, token) => {
    const response = await axios.post(`${API_URL}/appointments`, appointmentData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Obtener citas
export const getAppointments = async (token) => {
    const response = await axios.get(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Eliminar cita
export const deleteAppointment = async (id, token) => {
    const response = await axios.delete(`${API_URL}/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/medicines'; // Ajusta según tu backend

export const getMedicines = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createMedicine = async (medicineData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, medicineData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteMedicineById = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMedicineById = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateMedicine = async (id, updatedData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

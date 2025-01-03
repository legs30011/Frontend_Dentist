import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // URL de tu backend
});

// Si tienes un token, lo agregamos a cada solicitud
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

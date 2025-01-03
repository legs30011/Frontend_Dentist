/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig'; // Asegúrate de que axios esté configurado correctamente

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login'); // Redirigir al login si no hay token
      return; // Salir de la función si no hay token
    }

    // Obtener datos del usuario si el token es válido
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/auth/profile', {
          Headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Establecer los datos del usuario
        setUserData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage('No autorizado, token inválido o expirado');
          navigate('/login'); // Redirigir a login si el token es inválido o expiró
        } else {
          setErrorMessage('Error al obtener los datos del usuario');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <p>Bienvenido, {userData?.name}</p>
          <p>Correo: {userData?.email}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

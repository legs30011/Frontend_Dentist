/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        setErrorMessage('Error al obtener los datos del usuario');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-dentist-light-gray">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-dentist-dark-green">Dashboard</h2>
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          <div className="text-center">
            <p className="text-lg">Bienvenido, <span className="font-semibold">{userData?.name}</span></p>
            <p className="text-dentist-dark-green">Correo: {userData?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

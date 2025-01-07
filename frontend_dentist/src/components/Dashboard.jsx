// src/components/Dashboard.jsx
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bienvenido al Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div 
          className="p-4 bg-blue-500 text-white rounded-lg cursor-pointer text-center"
          onClick={() => navigate('/appointment')}
        >
          <h2 className="text-xl font-semibold">📅 Ver Citas</h2>
          <p>Administra y revisa tus citas programadas.</p>
        </div>
        <div 
          className="p-4 bg-green-500 text-white rounded-lg cursor-pointer text-center"
          onClick={() => navigate('/medicines')}
        >
          <h2 className="text-xl font-semibold">💊 Ver Medicinas</h2>
          <p>Consulta y gestiona la lista de medicamentos.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

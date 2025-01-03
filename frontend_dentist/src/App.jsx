import { Route, Routes } from 'react-router-dom';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Dashboard from './components/Dashboard'; // Asegúrate de tener esta página

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} /> {/* Redirigir a Login por defecto */}
    </Routes>
  );
}

export default App;

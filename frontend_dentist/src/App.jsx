import { Route, Routes } from 'react-router-dom';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import AppointmentContext from './components/AppointmentComponent';
import MedicineComponent from './components/MedicineComponent';
import Dashboard from './components/Dashboard';
import { MedicineProvider } from './context/MedicineContext';

function App() {
  return (
    <MedicineProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<AppointmentContext />} />
        <Route path="/medicines" element={<MedicineComponent />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </MedicineProvider>
  );
}

export default App;

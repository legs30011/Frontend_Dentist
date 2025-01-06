import { Route, Routes } from 'react-router-dom';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import AppointmentContext from './components/AppointmentComponent';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/appointment" element={<AppointmentContext />} />
      <Route path="/" element={<Login />} /> 
    </Routes>
  );
}

export default App;

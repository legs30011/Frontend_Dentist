/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from './utils/axiosConfig';
// Importa la configuración de Axios

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ date: "", time: "" });

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Token si es necesario
        },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error(error.response?.data?.message || "Error al obtener las citas");
    }
  };

  const handleAddAppointment = async () => {
    try {
      const response = await axios.post("/appointments", newAppointment, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchAppointments();  // Vuelve a obtener las citas actualizadas
      setNewAppointment({ date: "", time: "" });
    } catch (error) {
      console.error(error.response?.data?.message || "Error al agregar cita");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Citas</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.time}
          </li>
        ))}
      </ul>
      <input
        type="date"
        value={newAppointment.date}
        onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
      />
      <input
        type="time"
        value={newAppointment.time}
        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
      />
      <button onClick={handleAddAppointment}>Agregar cita</button>
    </div>
  );
};

export default Appointments;

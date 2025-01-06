/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from '../utils/axiosConfig';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Para los iconos de editar y eliminar
import { motion } from 'framer-motion'; // Para las animaciones

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    clientName: "",
    clientPhone: "",
    date: "",
    time: "",
    notes: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  // Obtener las citas del backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error(error.response?.data?.message || "Error al obtener las citas");
    }
  };

  // Crear una nueva cita
  const handleAddAppointment = async () => {
    try {
      const response = await axios.post("/appointments", newAppointment, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchAppointments();  // Refrescar la lista de citas
      setNewAppointment({ clientName: "", clientPhone: "", date: "", time: "", notes: "" });
    } catch (error) {
      console.error(error.response?.data?.message || "Error al agregar cita");
    }
  };

  // Editar una cita existente
  const handleEditAppointment = async () => {
    try {
      const response = await axios.put(`/appointments/${editingAppointmentId}`, newAppointment, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchAppointments();  // Refrescar la lista de citas
      setIsEditing(false);
      setEditingAppointmentId(null);
      setNewAppointment({ clientName: "", clientPhone: "", date: "", time: "", notes: "" });
    } catch (error) {
      console.error(error.response?.data?.message || "Error al editar cita");
    }
  };

  // Eliminar una cita
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchAppointments();  // Refrescar la lista de citas
    } catch (error) {
      console.error(error.response?.data?.message || "Error al eliminar la cita");
    }
  };

  // Llamado cuando el formulario es enviado
  const handleSubmit = () => {
    if (isEditing) {
      handleEditAppointment();
    } else {
      handleAddAppointment();
    }
  };

  // Cargar citas al inicio
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Citas</h2>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }} 
        className="mb-8">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={newAppointment.clientName}
            onChange={(e) => setNewAppointment({ ...newAppointment, clientName: e.target.value })}
            className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Teléfono del cliente"
            value={newAppointment.clientPhone}
            onChange={(e) => setNewAppointment({ ...newAppointment, clientPhone: e.target.value })}
            className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Notas"
            value={newAppointment.notes}
            onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
            className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-3 rounded-md w-full shadow-md hover:bg-blue-600 transition duration-300"
          >
            {isEditing ? "Editar Cita" : "Agregar Cita"}
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }} 
        className="space-y-6">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:bg-gray-100 transition duration-300">
            <div>
              <p><strong>Nombre:</strong> {appointment.clientName}</p>
              <p><strong>Teléfono:</strong> {appointment.clientPhone}</p>
              <p><strong>Fecha:</strong> {appointment.date}</p>
              <p><strong>Hora:</strong> {appointment.time}</p>
              <p><strong>Notas:</strong> {appointment.notes}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditingAppointmentId(appointment._id);
                  setNewAppointment({
                    clientName: appointment.clientName,
                    clientPhone: appointment.clientPhone,
                    date: appointment.date,
                    time: appointment.time,
                    notes: appointment.notes,
                  });
                }}
                className="bg-yellow-500 text-white p-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteAppointment(appointment._id)}
                className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Appointments;

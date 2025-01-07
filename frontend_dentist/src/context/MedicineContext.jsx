/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useCallback } from 'react';
import { getMedicines, createMedicine, deleteMedicineById, getMedicineById, updateMedicine } from '../services/medicineService';

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Obtener las medicinas
  const fetchMedicines = useCallback(async () => {
    try {
      const data = await getMedicines();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines', error);
    }
  }, []);

  // Crear una nueva medicina
  const addMedicine = async (medicineData) => {
    try {
      const newMedicine = await createMedicine(medicineData);
      setMedicines((prevMedicines) => [...prevMedicines, newMedicine]);
    } catch (error) {
      console.error('Error creating medicine', error);
    }
  };

  // Eliminar una medicina
  const removeMedicine = async (id) => {
    try {
      await deleteMedicineById(id);
      setMedicines((prevMedicines) => prevMedicines.filter(medicine => medicine._id !== id));
    } catch (error) {
      console.error('Error deleting medicine', error);
    }
  };

  // Editar una medicina
  const editMedicine = async (id) => {
    try {
      const updatedMedicine = await updateMedicine(id, { name: 'Updated Name' }); // Aquí puedes poner la lógica para la edición real
      setMedicines((prevMedicines) => 
        prevMedicines.map(medicine =>
          medicine._id === id ? updatedMedicine : medicine
        )
      );
    } catch (error) {
      console.error('Error updating medicine', error);
    }
  };

  // Ver detalles de una medicina
  const viewDetails = async (id) => {
    try {
      const medicine = await getMedicineById(id);
      setSelectedMedicine(medicine); // Mostrar detalles
      console.log('Detalles:', medicine);
    } catch (error) {
      console.error('Error viewing details', error);
    }
  };

  return (
    <MedicineContext.Provider value={{ medicines, fetchMedicines, addMedicine, removeMedicine, editMedicine, viewDetails }}>
      {children}
    </MedicineContext.Provider>
  );
};

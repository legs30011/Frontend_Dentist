/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { MedicineContext } from '../context/MedicineContext';

function MedicineComponent() {
  const { medicines, fetchMedicines, removeMedicine, editMedicine, addMedicine } = useContext(MedicineContext);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null); // Estado para la medicina seleccionada para editar
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos editando la medicina

  // Cargar medicinas al iniciar el componente
  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  // Manejo de cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({
      ...newMedicine,
      [name]: value,
    });
  };

  // Manejo del envío del formulario para crear una medicina
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMedicine(newMedicine); // Crear la nueva medicina
      setNewMedicine({ name: '', description: '', price: '', stock: '' }); // Limpiar el formulario
      setShowCreateForm(false); // Ocultar el formulario
      fetchMedicines(); // Volver a cargar las medicinas
    } catch (error) {
      alert('Error al crear la medicina');
    }
  };

  // Manejo del clic en "Editar"
  const handleEdit = (medicineId) => {
    const medicine = medicines.find((med) => med._id === medicineId);
    setSelectedMedicine(medicine); // Establecer la medicina seleccionada
    setIsEditing(true); // Activar el modo de edición
  };

  // Manejo de envío del formulario de edición
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editMedicine(selectedMedicine._id, selectedMedicine); // Actualizar la medicina
      setIsEditing(false); // Salir del modo de edición
      fetchMedicines(); // Recargar medicinas
    } catch (error) {
      alert('Error al editar la medicina');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Medicinas Disponibles</h2>
      
      {/* Botón para mostrar el formulario de creación */}
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showCreateForm ? 'Cancelar' : 'Crear Nueva Medicina'}
      </button>
      
      {/* Formulario para crear nueva medicina */}
      {showCreateForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            value={newMedicine.name}
            onChange={handleChange}
            placeholder="Nombre de la medicina"
            required
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <textarea
            name="description"
            value={newMedicine.description}
            onChange={handleChange}
            placeholder="Descripción"
            required
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={newMedicine.price}
            onChange={handleChange}
            placeholder="Precio"
            required
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="number"
            name="stock"
            value={newMedicine.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Registrar Medicina
          </button>
        </form>
      )}

      {/* Mostrar la lista de medicinas */}
      {medicines.length > 0 ? (
        <ul>
          {medicines.map((medicine) => (
            <li key={medicine._id} className="border p-2 mb-2 flex justify-between items-center">
              <div>
                <strong>{medicine.name}</strong> - {medicine.description} (${medicine.price})
              </div>
              <div>
                {/* Botón Editar */}
                <button onClick={() => handleEdit(medicine._id)} className="bg-yellow-500 text-white px-2 py-1 mr-2">
                  Editar
                </button>
                
                {/* Botón Eliminar */}
                <button onClick={() => removeMedicine(medicine._id)} className="bg-red-500 text-white px-2 py-1">
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay medicinas disponibles en stock.</p>
      )}

      {/* Formulario de edición */}
      {isEditing && selectedMedicine && (
        <form onSubmit={handleEditSubmit} className="mt-4">
          <h3 className="text-lg font-semibold">Editar Medicina</h3>
          <input
            type="text"
            name="name"
            value={selectedMedicine.name}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, name: e.target.value })}
            placeholder="Nombre de la medicina"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <textarea
            name="description"
            value={selectedMedicine.description}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, description: e.target.value })}
            placeholder="Descripción"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={selectedMedicine.price}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, price: e.target.value })}
            placeholder="Precio"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="number"
            name="stock"
            value={selectedMedicine.stock}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, stock: e.target.value })}
            placeholder="Stock"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Actualizar Medicina
          </button>
        </form>
      )}
    </div>
  );
}

export default MedicineComponent;

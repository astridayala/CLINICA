import React, { useState, useEffect } from "react";
import Select from "react-select";
import NotificationModal from "./NotificationModal";
import api from "../scripts/axiosConfig"; // ⬅️ Verifica tu ruta de axios

export default function CreateTreatmentModal({ medicalRecordId, onClose, onSave }) {
  // Estado para las opciones dinámicas
  const [dentalOptions, setDentalOptions] = useState([]);
  
  const [treatmentType, setTreatmentType] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  // 1. Cargar Tipos de Tratamiento desde el Backend
  useEffect(() => {
    const fetchTreatmentTypes = async () => {
      try {
        const response = await api.get('/treatments-types');
        // Mapeamos para que el Select entienda los datos
        const options = response.data.map(type => ({
          value: type.id,
          label: type.name
        }));
        setDentalOptions(options);
      } catch (error) {
        console.error("Error cargando tipos de tratamientos:", error);
      }
    };
    fetchTreatmentTypes();
  }, []);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type, message: '' }), 1500);
  };

  // 2. Guardar Tratamiento en Backend
  const handleSave = async () => {
    if (!treatmentType || !totalPrice) {
      showNotification("error", "Debe seleccionar un tratamiento y asignar precio");
      return;
    }

    try {
      // Payload según tu DTO CreateTreatmentDto
      const payload = {
        medicalRecordId: medicalRecordId,
        treatmentTypeId: treatmentType.value,
        totalPrice: parseFloat(totalPrice)
      };

      const response = await api.post('/treatments', payload);
      
      // Formatear respuesta para actualizar la vista localmente sin recargar
      // Asumimos que el backend devuelve el objeto creado con sus relaciones o al menos los IDs
      const newTreatment = {
        id: response.data.id,
        name: treatmentType.label, // Usamos el label del select para mostrar nombre inmediato
        start: response.data.createdAt || new Date().toISOString(), // Fecha creación del backend
        status: "Activo", // El backend asigna 'Activo' por defecto
        total: parseFloat(totalPrice),
        procedures: [], // Array vacío inicial
        paid: 0
      };

      onSave(newTreatment);
      showNotification("success", "Tratamiento creado correctamente");

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error(error);
      showNotification("error", "Error al crear tratamiento");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-brightness-90"
        onClick={onClose}
      >
        <div className="bg-[#fbf8fc] rounded-lg p-6 w-[400px] max-w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Nuevo Tratamiento</h2>

          <label className="block mb-2 text-sm font-medium">Tipo de tratamiento:</label>
          <Select
            options={dentalOptions}
            value={treatmentType}
            isSearchable
            placeholder="Selecciona un tratamiento"
            onChange={(selectedOption) => setTreatmentType(selectedOption)}
            className="mb-4 text-sm"
            noOptionsMessage={() => "No hay tipos disponibles"}
          />

          <label className="block mb-2 text-sm font-medium">Precio total ($):</label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-5 text-sm"
            placeholder="Ej: 200"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#db0000] hover:bg-[#940808] rounded-md text-white font-medium transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#1D6BAC] hover:bg-[#52a3de] rounded-md text-white font-medium transition"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/* Notificación */}
      {notification.show && (
        <NotificationModal type={notification.type} message={notification.message} />
      )}
    </>
  );
}
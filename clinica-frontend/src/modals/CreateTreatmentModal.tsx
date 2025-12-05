import React, { useState, useEffect } from "react";
import Select from "react-select";
import NotificationModal from "./NotificationModal";
import api from "../scripts/axiosConfig"; 

export default function CreateTreatmentModal({ medicalRecordId, onClose, onSave }) {
  const [dentalOptions, setDentalOptions] = useState([]);
  
  const [treatmentType, setTreatmentType] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    const fetchTreatmentTypes = async () => {
      try {
        const response = await api.get('/treatments-types');
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

  // Helper para fecha local
  const getLocalDateString = () => {
    const localDate = new Date();
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    if (!treatmentType || !totalPrice) {
      showNotification("error", "Debe seleccionar un tratamiento y asignar precio");
      return;
    }

    try {
      const todayString = getLocalDateString();

      const payload = {
        medicalRecordId: medicalRecordId,
        treatmentTypeId: treatmentType.value,
        totalPrice: parseFloat(totalPrice),
        date: todayString 
      };

      const response = await api.post('/treatments', payload);
      
      const newTreatment = {
        id: response.data.id,
        name: treatmentType.label, 
        start: todayString, 
        status: "Activo",
        total: parseFloat(totalPrice),
        procedures: [], 
        paid: 0
      };

      onSave(newTreatment);
      showNotification("success", "Tratamiento creado correctamente");

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message;
      const displayMsg = Array.isArray(msg) ? msg[0] : (msg || "Error al crear tratamiento");
      showNotification("error", displayMsg);
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

      {notification.show && (
        <NotificationModal type={notification.type} message={notification.message} />
      )}
    </>
  );
}
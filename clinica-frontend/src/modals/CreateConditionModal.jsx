import React, { useState, useEffect } from "react";
import Select from "react-select";
import NotificationModal from "./NotificationModal";
import api from "../scripts/axiosConfig";

export default function CreateConditionModal({ medicalRecordId,existingConditions = [], onClose, onSave }) {
  const [conditionsList, setConditionsList] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [isSaving, setIsSaving] = useState(false);

  // 1. Cargar lista de padecimientos desde el Backend
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await api.get('/conditions');
        const options = response.data.map(c => ({
          value: c.id,
          label: c.name
        }));

        const availableOptions = options.filter(option => 
            !existingConditions.includes(option.label)
        );
        
        setConditionsList(availableOptions);
      } catch (error) {
        console.error("Error al cargar padecimientos:", error);
      }
    };
    fetchConditions();
  }, [existingConditions]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type, message: '' }), 2500);
  };

  // 2. Guardar la relación en el Backend
  const handleSave = async () => {
    if (!selectedCondition) {
      showNotification("error", "Seleccione un padecimiento");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        medicalRecordId: medicalRecordId,
        conditionId: selectedCondition.value
      };

      // 1. OBTENEMOS LA RESPUESTA DEL BACKEND (Aquí viene el ID nuevo)
      const response = await api.post('/medical-record-conditions', payload);
      
      // 2. CREAMOS EL OBJETO CORRECTO
      const newConditionObject = {
        id: response.data.id, 
        name: selectedCondition.label 
      };

      // 3. ACTUALIZAMOS LA TABLA CON EL OBJETO (NO CON TEXTO)
      onSave(newConditionObject);
      
      showNotification("success", "Padecimiento agregado correctamente");

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error("Error al guardar la condición:", error);
      let errorMsg = "Error al guardar el padecimiento";
      if (error.response?.data?.message) {
         errorMsg = error.response.data.message;
      }
      showNotification("error", errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-brightness-90" 
        onClick={onClose}
      >
        <div 
          className="bg-[#fbf8fc] rounded-lg p-6 w-[400px] max-w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Agregar Antecedente</h2>

          <label className="block mb-2 text-sm font-medium">Padecimiento:</label>
          <Select
            options={conditionsList}
            value={selectedCondition}
            onChange={setSelectedCondition}
            isSearchable
            placeholder="Buscar..."
            className="mb-6 text-sm"
            noOptionsMessage={() => "No hay padecimientos disponibles"}
          />

          <div className="flex justify-end gap-3">
            <button 
              onClick={onClose} 
              disabled={isSaving}
              className="px-4 py-2 bg-[#db0000] hover:bg-[#940808] rounded-md text-white font-medium"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className={`px-4 py-2 rounded-md text-white font-medium ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1D6BAC] hover:bg-[#52a3de]'}`}
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
      
      {notification.show && (
        <NotificationModal 
          type={notification.type} 
          message={notification.message} 
        />
      )}
    </>
  );
}
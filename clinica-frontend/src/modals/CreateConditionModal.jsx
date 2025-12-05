import React, { useState, useRef, useEffect } from "react";
import Select from "react-select"; // Usamos Select para buscar o crear
import api from "../scripts/axiosConfig";
import NotificationModal from "./NotificationModal";

export default function CreateConditionModal({ isOpen, onClose, onSave, medicalRecordId }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]); // Lista de enfermedades existentes
  const [isLoading, setIsLoading] = useState(false);
  
  const [notification, setNotification] = useState(null);
  const modalRef = useRef(null);

  // 1. Cargar el catálogo de condiciones al abrir
  useEffect(() => {
    if (isOpen) {
      fetchConditions();
    }
  }, [isOpen]);

  const fetchConditions = async () => {
    try {
      const { data } = await api.get('/conditions');
      // Formateamos para el Select
      const formattedOptions = data.map(c => ({ value: c.id, label: c.name }));
      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error cargando condiciones:", error);
    }
  };

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
        // z-[70] importante para que funcione encima de otros elementos
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption && !selectedOption?.label) {
        setNotification({ type: "error", message: "Escribe o selecciona una condición" });
        return;
    }

    setIsLoading(true);

    try {
        let conditionId = selectedOption.value;

        // PASO 1: Si es una condición nueva (no tiene ID), la creamos primero en el catálogo
        // Nota: Esto asume que usas react-select/creatable o que la opción nueva viene con __isNew__
        // Si usas el Select normal, el usuario solo puede elegir existentes.
        if (selectedOption.__isNew__) {
            try {
                const createRes = await api.post('/conditions', { name: selectedOption.label });
                conditionId = createRes.data.id;
            } catch (err) {
                console.error(err);
                throw new Error("No se pudo registrar la nueva condición en el catálogo.");
            }
        }

        // PASO 2: VINCULAR AL PACIENTE
        const payload = {
            medicalRecordId: medicalRecordId,
            conditionId: conditionId
        };

        // Guardamos la respuesta para obtener el ID de la relación
        const response = await api.post('/medical-record-conditions', payload);
        const newRelationId = response.data.id;

        setNotification({ type: "success", message: "Antecedente agregado correctamente" });
        
        // PASO 3: DEVOLVER DATOS AL PADRE (Sin recargar)
        // Construimos el objeto exacto que necesita la tabla del PatientDetail
        const newConditionForState = {
            id: newRelationId, // Este es el ID que se usa para borrar (MedicalRecordCondition)
            name: selectedOption.label // El nombre para mostrar
        };

        // Enviamos el objeto nuevo al padre
        onSave(newConditionForState); 

        setTimeout(() => {
            onClose();
            setSelectedOption(null);
            setIsLoading(false);
        }, 1000);

    } catch (err) {
        console.error(err);
        setNotification({ type: "error", message: "Error al agregar el antecedente" });
        setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-[70] bg-black/40 backdrop-blur-sm">
        <div 
            ref={modalRef} 
            className="bg-[#fbf8fc] rounded-lg p-6 w-[450px] max-w-full shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()} // Evita cierres accidentales
        >
          <h2 className="text-center text-xl font-semibold mb-2 text-gray-800">
            Agregar Antecedente
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Busca una condición existente o escribe una nueva para crearla.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Nombre del Padecimiento <span className="text-red-600">*</span></label>
                <div className="relative">
                    {/* Usamos Select para buscar condiciones existentes */}
                    <Select 
                        options={options}
                        value={selectedOption}
                        onChange={(val) => setSelectedOption(val)}
                        placeholder="Ej: Diabetes, Alergia..."
                        isClearable
                        isSearchable
                        styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }} // Asegura que el menú se vea
                    />
                    
                    <p className="text-xs text-gray-400 mt-1">
                       * Selecciona de la lista. Si no existe, créala en el panel de Admin.
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium transition"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1D6BAC] hover:bg-[#16518a] rounded-md text-white font-medium transition shadow-md flex items-center"
                disabled={isLoading || !selectedOption}
              >
                {isLoading ? "Guardando..." : "Agregar al Historial"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {notification && (
        <NotificationModal
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}
import React, { useState } from "react";
import Select from "react-select";
import NotificationModal from "./NotificationModal";

export default function CreateTreatmentModal({ onClose, onSave }) {
  const dentalTreatments = [
    { id: 1, name: "Limpieza dental profesional" },
    { id: 2, name: "Blanqueamiento dental" },
    { id: 3, name: "Empaste dental (restauración)" },
    { id: 4, name: "Extracción de muela" },
    { id: 5, name: "Ortodoncia (brackets)" },
    { id: 6, name: "Implante dental" },
    { id: 7, name: "Endodoncia (tratamiento de conducto)" },
    { id: 8, name: "Carillas dentales" },
    { id: 9, name: "Prótesis dental (dentaduras)" },
    { id: 10, name: "Selladores de fosas y fisuras" },
  ];

  const dentalOptions = dentalTreatments.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const [treatmentType, setTreatmentType] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type, message: '' }), 1500);
  };

  const handleSave = () => {
    if (!treatmentType || !totalPrice) {
      showNotification("error", "Debe seleccionar un tratamiento y asignar precio");
      return;
    }

    try {
      const newTreatment = {
        name: treatmentType.label,
        start: new Date().toLocaleDateString("es-ES"),
        status: "Activo", // estado predeterminado
        procedures: [],
        total: parseFloat(totalPrice),
        paid: 0,
      };

      onSave(newTreatment);
      showNotification("success", "Tratamiento creado correctamente");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch {
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

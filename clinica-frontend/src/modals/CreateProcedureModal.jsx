import React, { useState } from "react";
import NotificationModal from "./NotificationModal";
import api from "../scripts/axiosConfig";

export default function CreateProcedureModal({ treatmentId, onClose, onSave }) {
  const [procedureName, setProcedureName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  // Función para obtener la fecha local EXACTA
  const getLocalDateString = () => {
    const localDate = new Date();
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    if (type === 'error') {
        setTimeout(() => setNotification({ show: false, type: "", message: "" }), 2500);
    }
  };

  const handleSave = async () => {
    if (!procedureName.trim() || !paymentAmount) {
      showNotification("error", "Debes ingresar una descripción y un abono");
      return;
    }

    if (!treatmentId) {
      showNotification("error", "Error interno: No hay tratamiento seleccionado");
      return;
    }

    setIsSaving(true);

    try {
      const todayString = getLocalDateString();

      // --- PASO 1: Crear el Procedimiento ---
      const procedurePayload = {
        treatmentId: treatmentId,
        date: todayString, 
        description: procedureName
      };

      const procResponse = await api.post('/procedures', procedurePayload);
      const createdProcedure = procResponse.data;

      // --- PASO 2: Crear el Pago asociado ---
      const paymentPayload = {
        procedureId: createdProcedure.id,
        date: todayString,
        amount: parseFloat(paymentAmount)
      };

      const payResponse = await api.post('/payments', paymentPayload);
      const createdPayment = payResponse.data;

      // --- PASO 3: Actualizar vista ---
      const fullData = {
        ...createdProcedure,
        date: todayString,
        payment: createdPayment, 
        proc: createdProcedure.description 
      };

      onSave(fullData);
      
      showNotification("success", "Procedimiento y abono guardados con éxito");

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error("Error al guardar:", error);
      const msg = error.response?.data?.message;
      const displayMsg = Array.isArray(msg) ? msg[0] : (msg || "Error al guardar el procedimiento");
      showNotification("error", displayMsg);
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
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
            Nuevo Procedimiento
          </h2>

          <label className="block mb-2 text-sm font-medium text-gray-700">Procedimiento:</label>
          <input
            type="text"
            value={procedureName}
            onChange={(e) => setProcedureName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:border-[#1D6BAC]"
            placeholder="Ej: Ajuste de brackets"
            disabled={isSaving}
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Abono ($):</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 text-sm focus:outline-none focus:border-[#1D6BAC]"
            placeholder="Ej: 50.00"
            min="0"
            step="0.01"
            disabled={isSaving}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#db0000] hover:bg-[#940808] rounded-md text-white font-medium transition text-sm"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-2 rounded-md text-white font-medium transition text-sm flex items-center gap-2 ${
                isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1D6BAC] hover:bg-[#52a3de]'
              }`}
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
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
    </>
  );
}
import React, { useState, useEffect, useRef } from "react";
import api from "../scripts/axiosConfig";

export default function ChangeStatusModal({ isOpen, onClose, onSave, treatmentId, currentStatus }) {
  const [statuses, setStatuses] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  // 1. Obtener los estados disponibles desde el backend al abrir
  useEffect(() => {
    if (isOpen) {
      const fetchStatuses = async () => {
        try {
          const res = await api.get("/treatment-statuses"); 
          setStatuses(res.data);
          
          // Pre-seleccionar el estado actual si existe
          if (currentStatus) {
            const found = res.data.find(s => s.name === currentStatus.name || s.name === currentStatus);
            if (found) setSelectedStatusId(found.id);
          }
        } catch (error) {
          console.error("Error cargando estados", error);
        }
      };
      fetchStatuses();
    }
  }, [isOpen, currentStatus]);

  // Cierra al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStatusId) return;

    setLoading(true);
    try {
      // 2. Enviar actualización al Backend
      await api.patch(`/treatments/${treatmentId}`, {
        statusId: selectedStatusId
      });

      // Encontramos el objeto completo del nuevo estado para pasarlo al padre
      const newStatusObj = statuses.find(s => s.id === selectedStatusId);
      
      onSave(newStatusObj); // Notificamos al padre
      onClose();
    } catch (error) {
      console.error("Error actualizando estado", error);
      alert("Error al actualizar estado");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-brightness-90">
      <div ref={modalRef} className="w-[350px] bg-[#fbf8fc] rounded-lg p-6  max-w-full shadow-xl">
        <h2 className="text-center text-xl font-semibold mb-5">Cambiar Estado</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Seleccionar nuevo estado:</label>
            <select
              className="w-full border rounded px-2 py-2 text-[14px]"
              isSearchable
              value={selectedStatusId}
              onChange={(e) => setSelectedStatusId(e.target.value)}
            >
              <option className="text-[14px]" value="" disabled>-- Seleccione --</option>
              {statuses.map((st) => (
                <option key={st.id} value={st.id} className="text-[14px]">
                  {st.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#db0000] hover:bg-[#940808] rounded-md text-white font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#1D6BAC] hover:bg-[#52a3de] rounded-md text-white font-medium transition"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
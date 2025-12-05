import React, { useState, useRef, useEffect } from "react";
import NotificationModal from "../../modals/NotificationModal"; 
import api from "../../scripts/axiosConfig";

export default function CreateConditionModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [notification, setNotification] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
        setNotification({ type: "error", message: "El nombre es requerido." });
        return;
    }

    try {
      const payload = {
        name: formData.name
      };

      const response = await api.post('/conditions', payload);
      
      onSave(response.data);
      setNotification({ type: "success", message: "Condición creada correctamente" });

      setFormData({ name: "" });

      setTimeout(() => {
        onClose();
      }, 1200);

    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Error al crear condición';
      setNotification({ type: "error", message: Array.isArray(msg) ? msg[0] : msg });
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-brightness-90">
        <div
          ref={modalRef}
          className="bg-[#fbf8fc] rounded-lg p-6 w-[500px] max-w-full shadow-xl"
        >
          <h2 className="text-center text-xl font-semibold mb-5">
            Crear Condición Médica
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-medium">Nombre de la Condición <span className="text-red-600">*</span>:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Ej: Diabetes, Hipertensión..."
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#db0000] hover:bg-[#940808] rounded-md text-white font-medium transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1D6BAC] hover:bg-[#52a3de] rounded-md text-white font-medium transition"
              >
                Guardar
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
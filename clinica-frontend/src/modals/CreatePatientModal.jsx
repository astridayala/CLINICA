import React, { useState, useRef, useEffect } from "react";
import NotificationModal from "./NotificationModal";

export default function CreatePatientModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "",
    address: "",
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

  const validateForm = () => {
    const { name, lastname, birthDate, gender, email, phone } = formData;

    if (!name.trim()) return "El nombre es requerido.";
    if (!lastname.trim()) return "El apellido es requerido.";
    if (!birthDate.trim()) return "La fecha de nacimiento es requerida.";
    if (!gender.trim()) return "El género es requerido.";

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "El email no es válido.";
    }

    if (phone && !/^\+\(503\)\s\d{8}$/.test(phone)) {
        return "El celular debe ser válido de El Salvador (+503) XXXXXXXX.";
    }


    return null; // Todo bien
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();

    if (error) {
      setNotification({ type: "error", message: error });
      return;
    }

    // Guardar paciente
    onSave(formData);
    setNotification({ type: "success", message: "Paciente creado correctamente" });

    // Limpiar formulario
    setFormData({
      name: "",
      lastname: "",
      phone: "",
      email: "",
      birthDate: "",
      gender: "",
      address: "",
    });

    // Cerrar modal después de un pequeño delay
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <>
      {/* MODAL */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div
          ref={modalRef}
          className="bg-[#fbf8fc] rounded-lg p-6 w-[500px] max-w-full shadow-xl"
        >
          <h2 className="text-center text-xl font-semibold mb-5">
            Crear nuevo paciente
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Nombres <span className="text-red-600">*</span>:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Nombres del paciente"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium"><span className="text-red-600">*</span>:</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Apellidos del paciente"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Fecha de nacimiento<span className="text-red-600">*</span>:</label>
                <input
                  type="date"
                  name="birthDate"
                  placeholder="Fecha de nacimiento"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Género<span className="text-red-600">*</span>:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  placeholder="Género"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Celular<span className="text-red-600">*</span>:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+(503) XXXXXXXX"
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Correo Electrónico:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo del paciente"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Dirección:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Dirección"
                className="w-full border rounded px-3 py-2 text-sm"
                rows="2"
              ></textarea>
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

      {/* NOTIFICACIÓN */}
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

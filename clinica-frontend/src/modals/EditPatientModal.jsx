import React, { useState, useRef, useEffect } from "react";
import NotificationModal from "./NotificationModal";
import api from "../scripts/axiosConfig";

export default function EditPatientModal({ isOpen, onClose, onSave, patientData }) {
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
    if (isOpen && patientData) {
      let safeDate = "";
      const rawDate = patientData.rawBirthDate || patientData.birthDate;
      
      if (rawDate) {
        safeDate = String(rawDate).split('T')[0];
      }

      setFormData({
        name: patientData.name || "",
        lastname: patientData.lastname || "",
        phone: patientData.phone || "",
        email: patientData.email || "",
        birthDate: safeDate, 
        gender: patientData.gender || "",
        address: patientData.address || "",
      });
    }
  }, [isOpen, patientData]);

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
    const { name, lastname, birthDate, gender, email } = formData;
    if (!name.trim()) return "El nombre es requerido.";
    if (!lastname.trim()) return "El apellido es requerido.";
    if (!birthDate) return "La fecha de nacimiento es requerida.";
    if (!gender) return "El género es requerido.";
    if (!email.trim()) return "El correo electrónico es requerido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "El email no es válido.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setNotification({ type: "error", message: error });
      return;
    }

    try {
      const payload = {
        name: formData.name,
        lastName: formData.lastname,
        phone: formData.phone,
        email: formData.email,
        birthDate: formData.birthDate,
        gender: formData.gender,
        address: formData.address || undefined,
      };

      const response = await api.patch(`/patients/${patientData.id}`, payload);
      const updatedPatient = response.data;

      setNotification({ type: "success", message: "Paciente actualizado correctamente" });

      const cleanBirthDate = String(updatedPatient.birthDate).split('T')[0];

      onSave({
         ...updatedPatient,
         lastname: updatedPatient.lastName,
         birthDate: cleanBirthDate,
         rawBirthDate: cleanBirthDate
      });

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      const displayMsg = Array.isArray(msg) ? msg[0] : (msg || "Error al actualizar paciente");
      setNotification({ type: "error", message: displayMsg });
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-brightness-90">
        <div ref={modalRef} className="bg-[#fbf8fc] rounded-lg p-6 w-[500px] max-w-full shadow-xl">
          <h2 className="text-center text-xl font-semibold mb-5">Editar Paciente</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Nombres <span className="text-red-600">*</span>:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" required />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Apellidos <span className="text-red-600">*</span>:</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" required />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Fecha de nacimiento <span className="text-red-600">*</span>:</label>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" required />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Género <span className="text-red-600">*</span>:</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" required >
                  <option value="">Seleccionar...</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Celular:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium">Correo Electrónico <span className="text-red-600">*</span>:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" required />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Dirección:</label>
              <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" rows="2" ></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-[#db0000] hover:bg-[#940808] rounded-md text-white font-medium transition">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-[#1D6BAC] hover:bg-[#52a3de] rounded-md text-white font-medium transition">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
      {notification && <NotificationModal type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}
    </>
  );
}
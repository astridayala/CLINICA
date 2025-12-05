import React, { useState, useRef, useEffect } from "react";
import api from "../../scripts/axiosConfig";
import NotificationModal from "../../modals/NotificationModal";

export default function CreateUserModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", 
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
    const { name, email, password, role } = formData;

    if (!name.trim()) return "El nombre es requerido.";
    if (!role) return "Debes seleccionar un rol (Doctor o Admin).";
    if (!email.trim()) return "El correo electrónico es requerido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "El email no es válido.";
    }
    if (!password.trim()) return "La contraseña es requerida.";
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    
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
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const response = await api.post('/auth/register/', payload);
      const newUser = response.data;

      onSave(newUser);
      setNotification({ type: "success", message: "Usuario creado correctamente" });

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });

      setTimeout(() => {
        onClose();
      }, 1200);

    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      const displayMsg = Array.isArray(msg) ? msg[0] : (msg || 'Error al crear usuario');
      setNotification({ type: "error", message: displayMsg });
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
            Crear nuevo usuario del sistema
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2/3">
                <label className="block mb-2 text-sm font-medium">Nombre Completo <span className="text-red-600">*</span>:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Nombre y Apellido"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>
              
              <div className="w-1/3">
                <label className="block mb-2 text-sm font-medium">Rol <span className="text-red-600">*</span>:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm bg-white"
                  required
                >
                  <option value="" disabled>Seleccionar...</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Correo Electrónico <span className="text-red-600">*</span>:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="correo@ejemplo.com"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Contraseña <span className="text-red-600">*</span>:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="********"
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
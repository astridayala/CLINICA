import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import NotificationModal from './NotificationModal';

export default function CreateAppointmentModal({ slotInfo, pacientes, onClose, onSave }) {
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });
  const modalRef = useRef(null);

  useEffect(() => {
    if (slotInfo?.start) {
      const start = new Date(slotInfo.start);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      const toLocalDatetime = (date) => {
        const tzOffset = date.getTimezoneOffset() * 60000;
        return new Date(date - tzOffset).toISOString().slice(0, 16);
      };

      setStartTime(toLocalDatetime(start));
      setEndTime(toLocalDatetime(end));
    }
  }, [slotInfo]);

  // Cierra el modal si se hace click afuera
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!slotInfo) return null;

  // Función para mostrar notificación
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type, message: '' }), 2000); // dura 2 segundos
  };

  const handleSave = () => {
    if (!selectedPaciente) {
      showNotification('error', 'Seleccione un paciente');
      return;
    }

    try {
      // Guardamos la cita
      onSave({
        id: Math.random(),
        title: selectedPaciente.label,
        start: new Date(startTime),
        end: new Date(endTime),
        description,
      });

      // Mostramos notificación de éxito
      showNotification('success', 'Cita guardada correctamente');

      // Cerramos el modal después de 500ms para que se vea la animación
      setTimeout(() => {
        onClose();
      }, 500);

      // Limpiar campos
      setSelectedPaciente(null);
      setDescription('');
    } catch {
      showNotification('error', 'No se pudo guardar la cita');
    }
  };

  const pacienteOptions = pacientes.map(p => ({ value: p.id, label: p.nombre }));

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-brightness-90">
        {/* Modal */}
        <div
          ref={modalRef}
          className="bg-[#fbf8fc] rounded-lg p-6 w-[400px] max-w-full shadow-xl"
        >
          <h2 className='text-center text-xl font-semibold mb-5'>Crear nueva cita</h2>

          <label className="block mb-2 text-sm font-medium">Paciente:</label>
          <Select
            options={pacienteOptions}
            value={selectedPaciente}
            onChange={setSelectedPaciente}
            isSearchable
            placeholder="Seleccione o escriba el nombre..."
            className="mb-4 text-sm"
          />

          <label className="block mb-2 text-sm font-medium">Hora de inicio:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3 text-sm"
          />

          <label className="block mb-2 text-sm font-medium">Hora de fin:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4 text-sm"
          />

          <label className="block mb-2 text-sm font-medium">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribe la descripción de la cita..."
            className="w-full border rounded px-3 py-2 mb-5 text-sm"
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

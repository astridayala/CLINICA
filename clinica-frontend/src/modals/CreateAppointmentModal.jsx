import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import dayjs from 'dayjs'; 
import { FaCalendarAlt } from "react-icons/fa"; // Importamos el icono de calendario
import NotificationModal from './NotificationModal';
import api from '../scripts/axiosConfig';

export default function CreateAppointmentModal({ slotInfo, pacientes, onClose, onSave }) {
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });
  const modalRef = useRef(null);

  useEffect(() => {
    if (slotInfo?.start) {
      const start = dayjs(slotInfo.start);
      const end = start.add(1, 'hour');
      setStartTime(start.format('YYYY-MM-DDTHH:mm'));
      setEndTime(end.format('YYYY-MM-DDTHH:mm'));
    }
  }, [slotInfo]);

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

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type, message: '' }), 3000);
  };

  const handleSave = async () => {
    if (!selectedPaciente) {
      showNotification('error', 'Seleccione un paciente');
      return;
    }

    try {
      const payload = {
        patientId: selectedPaciente.value,
        start: startTime.replace('T', ' '),
        end: endTime.replace('T', ' '),
        description: description,
      };

      const response = await api.post('/appointments', payload);
      const createdApp = response.data;

      const startString = createdApp.start.toString().replace('Z', '').replace('T', ' ');
      const endString = createdApp.end.toString().replace('Z', '').replace('T', ' ');

      const newEvent = {
        id: createdApp.id,
        title: selectedPaciente.label, 
        start: new Date(startString), 
        end: new Date(endString),
        description: createdApp.description,
      };

      onSave(newEvent);
      showNotification('success', 'Cita guardada correctamente');

      setTimeout(() => {
        onClose();
        setSelectedPaciente(null);
        setDescription('');
      }, 500);

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message;
      const displayMsg = Array.isArray(msg) ? msg[0] : (msg || 'Error al guardar la cita');
      showNotification('error', displayMsg);
    }
  };

  const pacienteOptions = pacientes.map(p => ({ value: p.id, label: p.nombre }));

  // Función para formatear visualmente DD/MM/YYYY HH:mm
  const formatDisplayDate = (isoString) => {
    if (!isoString) return '';
    return dayjs(isoString).format('DD/MM/YYYY HH:mm');
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-[70] bg-black/10 backdrop-brightness-90">
        <div ref={modalRef} className="bg-[#fbf8fc] rounded-lg p-6 w-[400px] max-w-full shadow-xl">
          <h2 className='text-center text-xl font-semibold mb-5'>Crear nueva cita</h2>

          <label className="block mb-2 text-sm font-medium">Paciente:</label>
          <Select
            options={pacienteOptions}
            value={selectedPaciente}
            onChange={setSelectedPaciente}
            isSearchable
            placeholder="Seleccione..."
            className="mb-4 text-sm"
            styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
          />

          <label className="block mb-2 text-sm font-medium">Hora de inicio:</label>
          <div className="relative mb-3">
            <div className="flex items-center w-full border rounded px-3 py-2 bg-white">
              <input
                type="text"
                readOnly
                value={formatDisplayDate(startTime)}
                className="flex-1 text-sm bg-transparent border-none outline-none text-black"
              />
              <FaCalendarAlt className="text-gray-500 ml-2" />
            </div>
            
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>

          <label className="block mb-2 text-sm font-medium">Hora de fin:</label>
          <div className="relative mb-4">
            {/* Capa VISUAL */}
            <div className="flex items-center w-full border rounded px-3 py-2 bg-white">
              <input
                type="text"
                readOnly
                value={formatDisplayDate(endTime)}
                className="flex-1 text-sm bg-transparent border-none outline-none text-black"
              />
              <FaCalendarAlt className="text-gray-500 ml-2" />
            </div>

            {/* Capa FUNCIONAL */}
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>

          <label className="block mb-2 text-sm font-medium">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles..."
            className="w-full border rounded px-3 py-2 mb-5 text-sm"
          />

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-[#db0000] hover:bg-[#940808] rounded-md text-white font-medium">
              Cancelar
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-[#1D6BAC] hover:bg-[#52a3de] rounded-md text-white font-medium">
              Guardar
            </button>
          </div>
        </div>
      </div>

      {notification.show && (
        <NotificationModal type={notification.type} message={notification.message} />
      )}
    </>
  );
}
import React, { useEffect, useState, useRef } from 'react';

export default function AppointmentDetailModal({ event, onClose, onDelete, calendarRef }) {
  const modalRef = useRef(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!event || !calendarRef.current) return;

    const eventDiv = document.querySelector(`[data-id='${event.id}']`);
    if (!eventDiv) return;

    const eventRect = eventDiv.getBoundingClientRect();
    const calendarRect = calendarRef.current.getBoundingClientRect();

    const modalWidth = 220;
    const modalHeight = 150; // más alto para botones
    const offset = 2;

    // Posición inicial pegada al evento
    let left = eventRect.right - calendarRect.left + offset;
    let top = eventRect.top - calendarRect.top + offset;

    // Ajustar si se sale a la derecha
    if (left + modalWidth > calendarRect.width) {
      left = eventRect.left - calendarRect.left - modalWidth - offset;
      if (left < 0) left = 0;
    }

    // Ajustar si se sale abajo
    if (top + modalHeight > calendarRect.height) {
      top = eventRect.top - calendarRect.top - modalHeight - offset;
      if (top < 0) top = 0;
    }

    setModalPos({ top, left });
  }, [event, calendarRef]);

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!event) return null;

  return (
    <div
      ref={modalRef}
      className="absolute bg-[#fbf8fc] rounded-lg shadow-lg p-3 z-50 w-56 text-sm"
      style={{
        top: modalPos.top,
        left: modalPos.left
      }}
    >
      <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
      <p className="mb-1 text-md">{event.description}</p>
      <p className="mb-1"><strong>Inicio:</strong> {event.start.toLocaleString()}</p>
      <p className="mb-2"><strong>Fin:</strong> {event.end.toLocaleString()}</p>

      <div className="flex justify-between gap-2">
        <button
          className="flex-1 px-2 py-1 bg-[#db0000] hover:bg-[#940808] text-white rounded-md transition"
          onClick={() => {
            onDelete?.(event.id);
            onClose();
          }}
        >
          Eliminar
        </button>
        <button
          className="flex-1 px-2 py-1 bg-[#1D6BAC] hover:bg-[#52a3de] text-white rounded-md transition"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

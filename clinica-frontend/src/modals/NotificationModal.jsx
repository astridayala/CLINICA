import React, { useEffect, useState } from 'react';

export default function NotificationModal({ type, message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.(); 
    }, 1000); // Duración de la notificación en ms
    return () => clearTimeout(timer);
  }, [message, onClose]);

  // Icono según tipo
  const icon = type === 'success'
    ? (
      <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )
    : (
      <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );

  // Color del fondo según tipo
  const bgColor = type === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none bg-black/10 backdrop-brightness-90">
      <div className={`flex flex-col items-center justify-center ${bgColor} border rounded-lg shadow-lg p-6 transform transition-all duration-300 
        ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        {icon}
        <p className="mt-3 text-xl font-semibold text-gray-800">{message}</p>
      </div>
    </div>
  );
}

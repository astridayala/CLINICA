import React from 'react';

export default function ConfirmationModal({ isOpen, message, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[60] bg-black/20 backdrop-brightness-90">
      <div className="bg-[#fbf8fc] rounded-lg p-6 w-[400px] max-w-[90%] shadow-2xl border border-gray-300 transform transition-all scale-100">
        
        {/* Icono de Interrogación */}
        <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-[#1D6BAC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
            Confirmación requerida
        </h3>
        
        <p className="text-gray-600 text-center mb-6 text-sm">
            {message}
        </p>
        
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md font-medium transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
                onConfirm();
                onClose();
            }}
            className="px-4 py-2 bg-[#1D6BAC] hover:bg-[#16518a] text-white rounded-md font-medium transition duration-200 shadow-md"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
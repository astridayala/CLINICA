import { useState } from "react";
import NotificationModal from "./NotificationModal";

export default function CreateProcedureModal({ onClose, onSave }) {
  const [procedureName, setProcedureName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [notification, setNotification] = useState(null);

  const handleSave = () => {
    if (!procedureName || !paymentAmount) {
      setNotification({
        type: "error",
        message: "Debes ingresar un procedimiento y un abono",
      });
      return;
    }

    const newProcedure = {
      id: Date.now(),
      date: new Date().toLocaleDateString("es-ES"),
      proc: procedureName,
      payments: [
        {
          id: Date.now() + 1,
          amount: parseFloat(paymentAmount),
          date: new Date().toLocaleDateString("es-ES"),
        },
      ],
    };

    onSave(newProcedure);
    onClose();

    setNotification({
      type: "success",
      message: "Procedimiento guardado con éxito",
    });

    // cerrar modal principal después de mostrar notificación
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <>
      {/* Modal principal */}
      <div className="fixed inset-0 flex justify-center items-center z-40 bg-black/10 backdrop-brightness-90"
        onClick={onClose}
      >
        <div className="bg-white rounded-lg p-6 w-[400px] max-w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Nuevo Procedimiento
          </h2>

          <label className="block mb-2 text-sm font-medium">Procedimiento:</label>
          <input
            type="text"
            value={procedureName}
            onChange={(e) => setProcedureName(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4 text-sm"
            placeholder="Ej: Ajuste de brackets"
          />

          <label className="block mb-2 text-sm font-medium">Abono ($):</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-5 text-sm"
            placeholder="Ej: 50"
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

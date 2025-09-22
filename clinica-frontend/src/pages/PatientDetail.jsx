import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaTrash, FaEdit, FaFilePdf, FaPlus, FaSave } from "react-icons/fa";
import CreateTreatmentModal from "../modals/CreateTreatmentModal";
import CreateProcedureModal from "../modals/CreateProcedureModal";
import NotificationModal from "../modals/NotificationModal";

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  //Datos de ejemplo (luego puedes cargarlos desde Firebase/DB)
  const patients = [
    {
      id: 1,
      name: "Astrid Violeta",
      lastname: "Ayala Ayala",
      email: "astridayala@gmail.com",
      phone: "+(503) 5588-9966",
      birthdate: "06/10/2004",
      gender: "Femenino",
      age: 20,
      address: "km 12 ½ carretera al Puerto de La Libertad, calle nueva a Comasagua, Santa Tecla, La Libertad",
      conditions: ["Diabetes","Hipertensión","Alergia a la penicilina","Cirugía de apendicitis (2018)"],
      treatments: [
        {
          name: "Ortodoncia",
          start: "10/02/2025",
          status: "Activo",
          procedures: [
            { id: 1, date: "01/02/2025", proc: "Evaluación inicial", payments: [{ id: 101, amount: 20, date: "01/02/2025" }] },
            { id: 2, date: "05/02/2025", proc: "Toma de radiografías", payments: [{ id: 102, amount: 25, date: "05/02/2025" }] },
            { id: 3, date: "10/02/2025", proc: "Colocación de brackets", payments: [{ id: 103, amount: 50, date: "10/02/2025" }] },
            { id: 4, date: "15/02/2025", proc: "Ajuste inicial", payments: [{ id: 104, amount: 30, date: "15/02/2025" }] },
            { id: 5, date: "20/02/2025", proc: "Cambio de hules", payments: [{ id: 105, amount: 20, date: "20/02/2025" }] },
            { id: 6, date: "25/02/2025", proc: "Cambio de cable", payments: [{ id: 106, amount: 30, date: "25/02/2025" }] },
            { id: 7, date: "01/03/2025", proc: "Revisión de alineación", payments: [{ id: 107, amount: 15, date: "01/03/2025" }] },
            { id: 8, date: "05/03/2025", proc: "Ajuste de brackets", payments: [{ id: 108, amount: 20, date: "05/03/2025" }] },
            { id: 9, date: "10/03/2025", proc: "Colocación de ligaduras", payments: [{ id: 109, amount: 15, date: "10/03/2025" }] },
            { id: 10, date: "15/03/2025", proc: "Revisión general", payments: [{ id: 110, amount: 20, date: "15/03/2025" }] },
            { id: 11, date: "20/03/2025", proc: "Cambio de hules", payments: [{ id: 111, amount: 20, date: "20/03/2025" }] },
            { id: 12, date: "25/03/2025", proc: "Ajuste de alambres", payments: [{ id: 112, amount: 30, date: "25/03/2025" }] },
            { id: 13, date: "01/04/2025", proc: "Revisión de mordida", payments: [{ id: 113, amount: 25, date: "01/04/2025" }] },
            { id: 14, date: "05/04/2025", proc: "Pulido y limpieza", payments: [{ id: 114, amount: 15, date: "05/04/2025" }] },
            { id: 15, date: "10/04/2025", proc: "Cierre de espacios", payments: [{ id: 115, amount: 40, date: "10/04/2025" }] },
          ],
          total: 400, // suma de todos los procedimientos (puedes ajustar)
          paid: 350 // suma de los pagos hasta ahora
        },
        {
          name: "Endodoncia - 4-6",
          start: "13/01/2025",
          status: "Referido",
          procedures: [
            { id: 16, date: "13/01/2025", proc: "Evaluación inicial", payments: [{ id: 201, amount: 30, date: "13/01/2025" }] },
            { id: 17, date: "15/01/2025", proc: "Radiografía", payments: [{ id: 202, amount: 20, date: "15/01/2025" }] },
            { id: 18, date: "17/01/2025", proc: "Aislamiento y acceso", payments: [{ id: 203, amount: 25, date: "17/01/2025" }] },
            { id: 19, date: "19/01/2025", proc: "Limpieza de conductos", payments: [{ id: 204, amount: 30, date: "19/01/2025" }] },
            { id: 20, date: "21/01/2025", proc: "Conformación de conductos", payments: [{ id: 205, amount: 35, date: "21/01/2025" }] },
            { id: 21, date: "23/01/2025", proc: "Obturación parcial", payments: [{ id: 206, amount: 40, date: "23/01/2025" }] },
            { id: 22, date: "25/01/2025", proc: "Obturación final", payments: [{ id: 207, amount: 50, date: "25/01/2025" }] },
            { id: 23, date: "27/01/2025", proc: "Restauración provisional", payments: [{ id: 208, amount: 20, date: "27/01/2025" }] },
            { id: 24, date: "29/01/2025", proc: "Control y revisión", payments: [{ id: 209, amount: 15, date: "29/01/2025" }] },
            { id: 25, date: "31/01/2025", proc: "Toma de radiografía final", payments: [{ id: 210, amount: 20, date: "31/01/2025" }] },
            { id: 26, date: "02/02/2025", proc: "Colocación de restauración definitiva", payments: [{ id: 211, amount: 30, date: "02/02/2025" }] },
            { id: 27, date: "04/02/2025", proc: "Pulido final", payments: [{ id: 212, amount: 15, date: "04/02/2025" }] },
            { id: 28, date: "06/02/2025", proc: "Revisión de mordida", payments: [{ id: 213, amount: 20, date: "06/02/2025" }] },
            { id: 29, date: "08/02/2025", proc: "Ajuste final", payments: [{ id: 214, amount: 25, date: "08/02/2025" }] },
            { id: 30, date: "10/02/2025", proc: "Limpieza final", payments: [{ id: 215, amount: 30, date: "10/02/2025" }] },
          ],
          total: 600,
          paid: 400
        },
      ],
    },
  ];

    const patient = patients.find((p) => p.id.toString() === id);
    if (!patient) return <div className="p-6">Paciente no encontrado</div>;

    const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(0);
    const [showTreatmentModal, setShowTreatmentModal] = useState(false);
    const [patientData, setPatientData] = useState(patient);
    const [showProcedureModal, setShowProcedureModal] = useState(false);
    const selectedTreatment = patientData.treatments[selectedTreatmentIndex] || null;
    const [notes, setNotes] = useState(patientData.notes || "");
    const [notification, setNotification] = useState({ visible: false, type: "", message: "" });
    const totalPaid = selectedTreatment.procedures.reduce(
      (acc, proc) => acc + proc.payments.reduce((sum, pay) => sum + pay.amount, 0), 0
    );
    const remaining = selectedTreatment.total - totalPaid;

    const handleAddTreatment = (newTreatment) => {
      setPatientData((prev) => ({
        ...prev,
        treatments: [...prev.treatments, newTreatment],
      }));
    };
    // Función para asignar color según estado
    const statusColor = (status) => {
      switch(status){
        case "Activo": return "bg-green-400 text-white";
        case "Referido": return "bg-blue-400 text-white";
        case "Finalizado": return "bg-red-400 text-white";
        default: return "";
      }
    }
    const handleAddProcedure = (newProcedure) => {
      setPatientData((prev) => {
        const updatedTreatments = [...prev.treatments];
        updatedTreatments[selectedTreatmentIndex] = {
          ...updatedTreatments[selectedTreatmentIndex],
          procedures: [...updatedTreatments[selectedTreatmentIndex].procedures, newProcedure],
        };
        return { ...prev, treatments: updatedTreatments };
      });
    };
    const handleSaveNotes = () => {
      // Guardar notas en patientData
      setPatientData((prev) => ({
        ...prev,
        notes: notes,
      }));

      // Mostrar notificación
      setNotification({
        visible: true,
        type: "success",
        message: "Notas guardadas correctamente",
      });
    };

    const closeNotification = () => {
      setNotification({ visible: false, type: "", message: "" });
    };


  return (
    <div className="flex flex-col h-full px-3 py-3 md:px-2">
      <div className="mb-2 flex h-11 items-center justify-between rounded-md p-3">
        <h2 className="text-xl font-bold">{patient.name} {patient.lastname}</h2>
        <div className="flex items-center gap-2">
            <button className="bg-[#3CB4C0] p-2 rounded-md text-white w-11 h-11 flex items-center justify-center">
              <FaFilePdf className="text-lg" />
            </button>
            <button className="bg-[#2F45FF] gap-2 p-2 rounded-md text-white w-auto h-11 flex items-center justify-center px-4">
              <FaEdit className="text-lg" />
              <h2 className="text-md">Editar</h2>
            </button>
            <button className="bg-[#FF2323] p-2 rounded-md text-white w-11 h-11 flex items-center justify-center">
              <FaTrash className="text-lg"/>
            </button>
          </div>
      </div>
      <div className="flex-grow p-3 rounded-md grid grid-cols-3 bg-[#F7F2FA] overflow-auto gap-1">
        {/* Columna 1: Información del paciente */}
        <div className="p-2 border-e-2 border-[#dad9de]">
          <h3 className="font-bold mb-1 text-[17px]">
            Información del paciente
          </h3>
          <div className="flex flex-col gap-2 text-[15px] pb-6 pl-3">
            <p><strong>Nombres:</strong> {patient.name}</p>
            <p><strong>Apellidos:</strong> {patient.lastname}</p>
            <p><strong>Celular:</strong> {patient.phone}</p>
            <p><strong>Correo electrónico:</strong> {patient.email}</p>
            <p><strong>Fecha de nacimiento:</strong> {patient.birthdate}</p>
            <p><strong>Género:</strong> {patient.gender}</p>
            <p><strong>Edad:</strong> {patient.age} años</p>
            <p><strong>Dirección:</strong> {patient.address}</p>
          </div>
          <div>
            <div className="pb-2 flex justify-between items-center">
              <h3 className="font-bold mb-2 text-[17px]">Notas adicionales</h3>
              <button className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-2 w-auto h-7 flex items-center justify-center"
                onClick={handleSaveNotes}
              >
                <FaSave />
                <h2 className="text-sm">Guardar</h2>
              </button>
            </div>
            <textarea
              className="w-full text-[14px] h-32 p-2 border rounded-md resize-none bg-white focus:outline-none focus:ring-2 focus:ring-[#1D6BAC]"
              placeholder="Escribe aquí observaciones del paciente..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Columna 2: Tratamientos */}
        <div className="p-2 border-e-2 border-[#dad9de]">
          <div className="pb-6">
            <h3 className="font-bold mb-1 text-[17px]">
              Antecedentes médicos, patológicos y quirúrgicos
            </h3>
            <table className="w-full text-sm rounded-md overflow-hidden">
              <tbody className="text-[15px]">
                {patient.conditions.map((cond, i) => (
                  <tr key={i}>
                    <td className="text-md pl-3 px-4 py-1.5 border-[#dad9de] border-y-2"> 
                      {cond}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="w-full">
            <div className="pb-2 flex justify-between items-center">
              <h3 className="font-bold text-[17px]">Tratamientos</h3>
              <button className="bg-[#1D6BAC] hover:bg-[#2c88cb] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center"
                onClick={() => setShowTreatmentModal(true)}
              >
                <FaPlus />
              </button>
            </div>
            <table className="w-full text-sm rounded-md overflow-hidden">
              <thead className="uppercase text-sm">
                <tr className="">
                  <th className="px-4 py-1.5 text-left">Tratamiento</th>
                  <th className="px-4 py-1.5 text-left">Fecha inicio</th>
                  <th className="px-4 py-1.5 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {patientData.treatments.map((t, i) => (
                  <tr
                    key={i}
                    className={`border-[#dad9de] hover:bg-[#8EC3EB] border-y-2 cursor-pointer ${selectedTreatmentIndex === i ? "bg-[#8EC3EB]" : ""}`}
                    onClick={() => setSelectedTreatmentIndex(i)}
                  >
                    <td className="px-4 py-1.5">{t.name}</td>
                    <td className="px-4 py-1.5">{t.start}</td>
                    <td className={`px-4 py-1.5 rounded-lg font-bold flex items-center justify-center text-md ${statusColor(t.status)}`}>{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna 3: Procedimientos y pagos */}
        <div className="flex flex-col p-2">
          <div className="pb-2 flex justify-between items-center">
            <h3 className="font-bold text-[17px]">Control de procedimientos</h3>
            <button className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center"
              onClick={() => setShowProcedureModal(true)}
              >
              <FaPlus />
            </button>
          </div>
          {selectedTreatment && (
            <>
              <div className="flex-1 overflow-y-auto max-h-[450px]">
                <table className="w-full text-sm rounded-md border-collapse">
                  <thead className="uppercase text-sm sticky top-0 bg-[#F7F2FA] z-10">
                    <tr>
                      <th className="px-4 py-1.5 text-left">Fecha</th>
                      <th className="px-4 py-1.5 text-left">Procedimiento</th>
                      <th className="px-4 py-1.5 text-left">Abono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTreatment.procedures.map((proc) => (
                      <tr key={proc.id} className="border-[#dad9de] border-y-2">
                        <td className="px-4 py-1.5">{proc.date}</td>
                        <td className="px-4 py-1.5">{proc.proc}</td>
                        <td className="px-4 py-1.5 justify-center flex">
                          ${proc.payments.reduce((sum, pay) => sum + pay.amount, 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 pt-2 sticky bottom-0">
                <div className="flex flex-col items-end gap-1 text-sm">
                  <p><strong>Abono Total:</strong> ${totalPaid}</p>
                  <p><strong>Restante:</strong> ${remaining}</p>
                  <p><strong>Total presupuesto:</strong> ${selectedTreatment.total}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
        {showTreatmentModal && (
        <CreateTreatmentModal
          onClose={() => setShowTreatmentModal(false)}
          onSave={handleAddTreatment}
        />
      )} 
      {showProcedureModal && (
        <CreateProcedureModal
          onClose={() => setShowProcedureModal(false)}
          onSave={handleAddProcedure}
        />
      )}
      {notification.visible && (
        <NotificationModal
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaFilePdf, FaPlus, FaSave } from "react-icons/fa";
import CreateTreatmentModal from "../modals/CreateTreatmentModal";
import CreateProcedureModal from "../modals/CreateProcedureModal";
import CreateConditionModal from "../modals/CreateConditionModal";
import NotificationModal from "../modals/NotificationModal";
import api from "../scripts/axiosConfig"; 

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados de UI
  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(0);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  
  // Estado para el texto de las notas
  const [notes, setNotes] = useState("");
  const [notification, setNotification] = useState({ visible: false, type: "", message: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await api.get(`/patients/${id}`);
        const rawPatient = patientRes.data;

        let recordData = null;
        let conditionsList = [];
        let treatmentsList = [];

        const recordId = typeof rawPatient.medicalRecord === 'object' ? rawPatient.medicalRecord?.id : rawPatient.medicalRecord;

        if (recordId) {
          try {
            const recordRes = await api.get(`/medical-record/${recordId}`);
            recordData = recordRes.data;

            conditionsList = recordData.conditions?.map(item => item.condition?.name) || [];
            
            // --- MAPEO DE TRATAMIENTOS ---
            treatmentsList = recordData.treatments?.map(t => ({
              ...t, 
              name: t.treatmentType?.name || t.name || "Sin nombre",
              start: t.start || t.createdAt || t.date, 
              status: t.status,
              // Mapeo robusto del total
              total: parseFloat(t.total || t.totalPrice || t.price || 0),
              
              procedures: t.procedures?.map(p => ({
                ...p,
                proc: p.description || p.proc, 
                payment: p.payment || null 
              })) || []
            })) || [];

          } catch (err) {
            console.error("Error cargando historial:", err);
          }
        }

        const formattedData = {
          id: rawPatient.id,
          name: rawPatient.name,
          lastname: rawPatient.lastName,
          email: rawPatient.email || "No registrado",
          phone: rawPatient.phone,
          birthdate: rawPatient.birthDate ? new Date(rawPatient.birthDate).toLocaleDateString() : "",
          gender: rawPatient.gender,
          age: calculateAge(rawPatient.birthDate),
          address: rawPatient.address || "",
          conditions: conditionsList,
          treatments: treatmentsList,
          notes: recordData?.notes || "", // 👈 Cargamos las notas desde la BD
          medicalRecordId: recordData?.id 
        };

        setPatientData(formattedData);
        setNotes(formattedData.notes); // 👈 Inicializamos el textarea

      } catch (error) {
        console.error("Error general:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // --- CÁLCULOS FINANCIEROS ---
  const selectedTreatment = patientData?.treatments[selectedTreatmentIndex] || null;

  const totalPaid = selectedTreatment?.procedures?.reduce((acc, proc) => {
    const amount = proc.payment ? parseFloat(proc.payment.amount) : 0;
    return acc + amount;
  }, 0) || 0;
  
  const treatmentTotal = selectedTreatment ? selectedTreatment.total : 0;
  const remaining = treatmentTotal - totalPaid;

  // --- HANDLERS ---

  const handleAddTreatment = (newTreatment) => {
    setPatientData((prev) => ({
      ...prev,
      treatments: [...prev.treatments, {
          ...newTreatment,
          total: parseFloat(newTreatment.total || newTreatment.totalPrice || 0),
          procedures: [] 
      }],
    }));
  };

  const handleAddProcedure = (newProcedure) => {
    setPatientData((prev) => {
      const updatedTreatments = prev.treatments.map((t, index) => {
        if (index === selectedTreatmentIndex) {
          return {
            ...t,
            procedures: [
              ...(t.procedures || []), 
              newProcedure
            ]
          };
        }
        return t;
      });
      return { ...prev, treatments: updatedTreatments };
    });
  };

  const handleAddCondition = (newConditionName) => {
    setPatientData((prev) => ({
        ...prev,
        conditions: [...prev.conditions, newConditionName]
    }));
  };

  // 👇 NUEVA FUNCIÓN PARA GUARDAR NOTAS EN EL BACKEND
  const handleSaveNotes = async () => {
    if (!patientData?.medicalRecordId) {
        setNotification({ visible: true, type: "error", message: "Error: No hay historial médico asociado" });
        return;
    }

    try {
        // Petición PATCH para actualizar solo el campo 'notes'
        await api.patch(`/medical-record/${patientData.medicalRecordId}`, {
            notes: notes
        });

        // Actualizamos estado local
        setPatientData((prev) => ({ ...prev, notes: notes }));
        setNotification({ visible: true, type: "success", message: "Notas guardadas correctamente" });
    } catch (error) {
        console.error("Error guardando notas:", error);
        setNotification({ visible: true, type: "error", message: "Error al guardar las notas" });
    }
  };

  const statusColor = (status) => {
    const baseClasses = "flex items-center justify-center h-full w-full"; 
    const statusName = status?.name || status || ""; 
    
    switch(statusName){
      case "Activo": return `${baseClasses} bg-green-400 text-white`;
      case "Referido": return `${baseClasses} bg-blue-400 text-white`;
      case "Finalizado": return `${baseClasses} bg-red-400 text-white`;
      default: return `${baseClasses} bg-gray-300`;
    }
  };

  const closeNotification = () => {
    setNotification({ visible: false, type: "", message: "" });
  };

  if (loading) return <div className="p-6">Cargando información...</div>;
  if (!patientData) return <div className="p-6">Paciente no encontrado</div>;

  return (
    <div className="flex flex-col h-full px-3 py-3 md:px-2">
      <div className="mb-2 flex h-11 items-center justify-between rounded-md p-3">
        <h2 className="text-xl font-bold">{patientData.name} {patientData.lastname}</h2>
        <div className="flex items-center gap-2">
            <button className="bg-[#3CB4C0] p-2 rounded-md text-white w-11 h-11 flex items-center justify-center">
              <FaFilePdf className="text-lg" />
            </button>
            {/*<button className="bg-[#2F45FF] gap-2 p-2 rounded-md text-white w-auto h-11 flex items-center justify-center px-4">
              <FaEdit className="text-lg" />
              <h2 className="text-md">Editar</h2>
            </button>*/}
            <button className="bg-[#FF2323] p-2 rounded-md text-white w-11 h-11 flex items-center justify-center">
              <FaTrash className="text-lg"/>
            </button>
          </div>
      </div>

      <div className="flex-grow p-3 rounded-md grid grid-cols-3 bg-[#F7F2FA] overflow-hidden gap-1">
        
        {/* Columna 1 */}
        <div className="p-2 border-e-2 border-[#dad9de] overflow-y-auto">
          <h3 className="font-bold mb-1 text-[17px]">Información del paciente</h3>
          <div className="flex flex-col gap-2 text-[15px] pb-6 pl-3">
            <p><strong>Nombres:</strong> {patientData.name}</p>
            <p><strong>Apellidos:</strong> {patientData.lastname}</p>
            <p><strong>Celular:</strong> {patientData.phone}</p>
            <p><strong>Correo electrónico:</strong> {patientData.email}</p>
            <p><strong>Fecha de nacimiento:</strong> {patientData.birthdate}</p>
            <p><strong>Género:</strong> {patientData.gender}</p>
            <p><strong>Edad:</strong> {patientData.age} años</p>
            <p><strong>Dirección:</strong> {patientData.address}</p>
          </div>
          <div>
            <div className="pb-2 flex justify-between items-center">
              <h3 className="font-bold mb-2 text-[17px]">Notas adicionales</h3>
              <button 
                className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-2 w-auto h-7 flex items-center justify-center transition" 
                onClick={handleSaveNotes}
              >
                <FaSave />
                <h2 className="text-sm">Guardar</h2>
              </button>
            </div>
            <textarea
              className="w-full text-[14px] h-32 p-2 border rounded-md resize-none bg-white focus:outline-none focus:ring-2 focus:ring-[#1D6BAC]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribe aquí las notas del historial..."
            ></textarea>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="p-2 border-e-2 border-[#dad9de] flex flex-col h-full overflow-hidden">
          
          {/* ANTECEDENTES */}
          <div className="pb-6 flex-shrink-0">
            <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-[17px]">Antecedentes médicos</h3>
                <button 
                  className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center"
                  onClick={() => {
                    if (patientData.medicalRecordId) {
                        setShowConditionModal(true);
                    } else {
                        alert("Error: Historial médico no encontrado.");
                    }
                  }}
                >
                  <FaPlus />
                </button>
            </div>
            
            <div className="overflow-y-auto max-h-[115px]"> 
              <table className="w-full text-sm rounded-md overflow-hidden">
                <tbody className="text-[15px]">
                  {patientData.conditions && patientData.conditions.length > 0 ? (
                      patientData.conditions.map((cond, i) => (
                      <tr key={i}>
                        <td className="text-md pl-3 px-4 py-1.5 border-[#dad9de] border-y-2">{cond}</td>
                      </tr>
                      ))
                  ) : (
                      <tr><td className="pl-3 text-gray-500 italic">Sin antecedentes</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* TRATAMIENTOS */}
          <div className="w-full flex flex-col flex-grow min-h-0">
            <div className="pb-2 flex justify-between items-center flex-shrink-0">
              <h3 className="font-bold text-[17px]">Tratamientos</h3>
              <button className="bg-[#1D6BAC] hover:bg-[#2c88cb] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center"
                onClick={() => {
                    if (patientData.medicalRecordId) {
                        setShowTreatmentModal(true);
                    } else {
                        alert("Error: No se encontró el historial médico.");
                    }
                }}
              >
                <FaPlus />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-grow">
                <table className="w-full text-sm rounded-md overflow-hidden table-fixed">
                <thead className="uppercase text-sm sticky top-0 bg-[#F7F2FA] z-10">
                    <tr>
                    <th className="px-4 py-1.5 text-center w-1/2">Tratamiento</th>
                    <th className="px-4 py-1.5 text-center w-1/4">Fecha inicio</th>
                    <th className="px-4 py-1.5 text-center w-1/4">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {patientData.treatments && patientData.treatments.length > 0 ? (
                        patientData.treatments.map((t, i) => {
                            const statusName = t.status?.name || t.status || "Desconocido";

                            return (
                                <tr
                                    key={t.id || i}
                                    className={`border-[#dad9de] hover:bg-[#8EC3EB] border-y-2 cursor-pointer ${selectedTreatmentIndex === i ? "bg-[#8EC3EB]" : ""}`}
                                    onClick={() => setSelectedTreatmentIndex(i)}
                                >
                                    <td className="px-4 py-1.5 truncate text-center" title={t.name}>{t.name}</td>
                                    <td className="px-4 py-1.5 text-center">
                                        {t.start ? new Date(t.start).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="px-4 py-1.5 text-center">
                                        <div className={`rounded-lg font-bold text-md ${statusColor(statusName)}`}>
                                            {statusName}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={3} className="px-4 text-[15px] text-left text-gray-500 italic pl-3">
                                Sin tratamientos
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
          </div>
        </div>

        {/* Columna 3 */}
        <div className="flex flex-col p-2 overflow-hidden h-full">
          <div className="pb-2 flex justify-between items-center flex-shrink-0">
            <h3 className="font-bold text-[17px]">Control de procedimientos</h3>
            <button className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center"
              onClick={() => {
                  if (selectedTreatment) {
                      setShowProcedureModal(true);
                  } else {
                      alert("Selecciona un tratamiento activo primero.");
                  }
              }}
            >
              <FaPlus />
            </button>
          </div>
          {selectedTreatment && (
            <>
              <div className="flex-grow overflow-y-auto min-h-0">
                <table className="w-full text-sm rounded-md border-collapse">
                  <thead className="uppercase text-sm sticky top-0 bg-[#F7F2FA] z-10">
                    <tr>
                      <th className="px-4 py-1.5 text-center">Fecha</th>
                      <th className="px-4 py-1.5 text-center">Procedimiento</th>
                      <th className="px-4 py-1.5 text-center">Abono</th>
                    </tr>
                  </thead>
                  <tbody>
                      {selectedTreatment.procedures && selectedTreatment.procedures.length > 0 ? (
                          selectedTreatment.procedures.map((proc) => {
                              const abono = proc.payment ? parseFloat(proc.payment.amount) : 0;
                              const description = proc.proc || proc.description || "Procedimiento";

                              return (
                                  <tr key={proc.id} className="border-[#dad9de] border-y-2">
                                      <td className="px-4 py-1.5 text-center">
                                          {proc.date ? new Date(proc.date).toLocaleDateString() : "-"}
                                      </td>
                                      <td className="px-4 py-1.5 text-center">{description}</td>
                                      <td className="px-4 py-1.5 text-center">${abono.toFixed(2)}</td>
                                  </tr>
                              );
                          })
                      ) : (
                          <tr>
                              <td colSpan={3} className="px-4 py-2 text-left text-[15px] text-gray-500 italic">
                                  Sin procedimientos registrados
                              </td>
                          </tr>
                      )}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 pt-2 flex-shrink-0 sticky bottom-0 bg-[#F7F2FA]">
                <div className="flex flex-col items-end gap-1 text-sm">
                  <p><strong>Abono Total:</strong> ${totalPaid.toFixed(2)}</p>
                  <p><strong>Restante:</strong> ${remaining.toFixed(2)}</p>
                  <p><strong>Total presupuesto:</strong> ${treatmentTotal.toFixed(2)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODALES */}
      
      {showTreatmentModal && patientData.medicalRecordId && (
        <CreateTreatmentModal
          medicalRecordId={patientData.medicalRecordId}
          onClose={() => setShowTreatmentModal(false)}
          onSave={handleAddTreatment}
        />
      )}
      
      {showProcedureModal && selectedTreatment && (
        <CreateProcedureModal
          treatmentId={selectedTreatment.id}
          onClose={() => setShowProcedureModal(false)}
          onSave={handleAddProcedure}
        />
      )}

      {showConditionModal && patientData.medicalRecordId && (
        <CreateConditionModal
          medicalRecordId={patientData.medicalRecordId}
          onClose={() => setShowConditionModal(false)}
          onSave={handleAddCondition}
          existingConditions={patientData.conditions} // 👈 Pasamos condiciones existentes
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
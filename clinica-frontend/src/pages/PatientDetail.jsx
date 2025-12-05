import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaFilePdf, FaPlus, FaSave } from "react-icons/fa";

import CreateTreatmentModal from "../modals/CreateTreatmentModal";
import CreateProcedureModal from "../modals/CreateProcedureModal";
import CreateConditionModal from "../modals/CreateConditionModal";
import EditPatientModal from "../modals/EditPatientModal";
import ChangeStatusModal from "../modals/ChangeStatusModal"; 
import NotificationModal from "../modals/NotificationModal";
import ConfirmationModal from "../modals/ConfirmationModal";

import api from "../scripts/axiosConfig"; 

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados de Selección
  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(0);
  const [selectedConditionId, setSelectedConditionId] = useState(null); 
  const [selectedProcedureId, setSelectedProcedureId] = useState(null); // Selección de procedimiento

  // Estados de Modales
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showEditPatientModal, setShowEditPatientModal] = useState(false);
  
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [treatmentToEditStatus, setTreatmentToEditStatus] = useState(null);
  
  // ESTADO PARA CONFIRMACIÓN
  const [confirmModal, setConfirmModal] = useState({ visible: false, message: "", action: null });

  const [notes, setNotes] = useState("");
  const [notification, setNotification] = useState({ visible: false, type: "", message: "" });

  // --- UTILS ---
  const formatDateES = (dateString) => {
    if (!dateString) return "-";
    const str = String(dateString);
    if (str.length > 10 && (str.endsWith('Z') || str.includes('T'))) {
        const dateObj = new Date(str);
        if (isNaN(dateObj.getTime())) return str;
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const datePart = str.split('T')[0];
    if (!datePart.includes('-')) return dateString;
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (birthDateString) => {
    if (!birthDateString) return 0;
    const datePart = String(birthDateString).split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // --- CARGA DE DATOS ---
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

            conditionsList = recordData.conditions?.map(item => ({
                id: item.id,
                name: item.condition?.name || "Desconocido"
            })) || [];
            
            treatmentsList = recordData.treatments?.map(t => ({
              ...t, 
              name: t.treatmentType?.name || t.name || "Sin nombre",
              start: t.start || t.createdAt || t.date, 
              status: t.status, 
              total: parseFloat(t.total || t.totalPrice || t.price || 0),
              procedures: t.procedures?.map(p => ({
                ...p,
                proc: p.description || p.proc, 
                payment: p.payment || null 
              })) || []
            })) || [];

            treatmentsList.sort((a, b) => {
                const priorityA = a.status?.orderPriority || 99; 
                const priorityB = b.status?.orderPriority || 99;
                if (priorityA !== priorityB) return priorityA - priorityB;
                return new Date(b.start) - new Date(a.start);
            });

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
          birthdate: formatDateES(rawPatient.birthDate), 
          rawBirthDate: rawPatient.birthDate,
          gender: rawPatient.gender,
          age: calculateAge(rawPatient.birthDate), 
          address: rawPatient.address || "",
          conditions: conditionsList,
          treatments: treatmentsList,
          notes: recordData?.notes || "",
          medicalRecordId: recordData?.id 
        };

        setPatientData(formattedData);
        setNotes(formattedData.notes);

      } catch (error) {
        console.error("Error general:", error);
        setNotification({ visible: true, type: "error", message: "Error al cargar paciente" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const selectedTreatment = patientData?.treatments[selectedTreatmentIndex] || null;

  const totalPaid = selectedTreatment?.procedures?.reduce((acc, proc) => {
    const amount = proc.payment ? parseFloat(proc.payment.amount) : 0;
    return acc + amount;
  }, 0) || 0;
  
  const treatmentTotal = selectedTreatment ? selectedTreatment.total : 0;
  const remaining = treatmentTotal - totalPaid;

  // --- HANDLERS DE ACTUALIZACIÓN ---
  const handlePatientUpdate = (updatedPatient) => {
    setPatientData((prev) => ({
      ...prev,
      name: updatedPatient.name,
      lastname: updatedPatient.lastName,
      email: updatedPatient.email,
      phone: updatedPatient.phone,
      gender: updatedPatient.gender,
      address: updatedPatient.address,
      rawBirthDate: updatedPatient.birthDate,
      birthdate: formatDateES(updatedPatient.birthDate),
      age: calculateAge(updatedPatient.birthDate),
    }));
  };

  const handleAddTreatment = (newTreatment) => {
    setPatientData((prev) => {
        const newItem = {
            ...newTreatment,
            total: parseFloat(newTreatment.total || newTreatment.totalPrice || 0),
            procedures: []
        };
        const newTreatments = [newItem, ...prev.treatments];
        return { ...prev, treatments: newTreatments };
    });
  };

  const handleAddProcedure = (newProcedure) => {
    setPatientData((prev) => {
      const updatedTreatments = prev.treatments.map((t, index) => {
        if (index === selectedTreatmentIndex) {
          return {
            ...t,
            procedures: [ ...(t.procedures || []), newProcedure ]
          };
        }
        return t;
      });
      return { ...prev, treatments: updatedTreatments };
    });
  };

  const handleAddCondition = (newConditionObj) => {
    setPatientData((prev) => ({
        ...prev,
        conditions: [...prev.conditions, newConditionObj]
    }));
};

  const handleSaveNotes = async () => {
    if (!patientData?.medicalRecordId) return;
    try {
        await api.patch(`/medical-record/${patientData.medicalRecordId}`, { notes: notes });
        setPatientData((prev) => ({ ...prev, notes: notes }));
        setNotification({ visible: true, type: "success", message: "Notas guardadas correctamente" });
    } catch (error) {
        setNotification({ visible: true, type: "error", message: "Error al guardar las notas" });
    }
  };

  const handleStatusUpdated = (newStatusObj) => {
    if (!treatmentToEditStatus) return;
    setPatientData((prev) => {
      let updatedTreatments = prev.treatments.map(t => {
        if (t.id === treatmentToEditStatus.id) return { ...t, status: newStatusObj };
        return t;
      });
      updatedTreatments.sort((a, b) => {
        const priorityA = a.status?.orderPriority || 99;
        const priorityB = b.status?.orderPriority || 99;
        if (priorityA !== priorityB) return priorityA - priorityB;
        return new Date(b.start) - new Date(a.start);
      });
      return { ...prev, treatments: updatedTreatments };
    });
    setSelectedTreatmentIndex(0);
    setSelectedProcedureId(null); 
  };

  // --- LOGICA DE ELIMINACIÓN CON MODAL ---

  // 1. Eliminar Paciente Completo
  const clickDeletePatient = () => {
    setConfirmModal({
        visible: true,
        message: `¿Estás seguro de eliminar a ${patientData.name} y todo su historial? Esta acción no se puede deshacer.`,
        action: executeDeletePatient
    });
  };

  const executeDeletePatient = async () => {
    try {
        await api.delete(`/patients/${patientData.id}`);
        const role = localStorage.getItem('userRole');
        if (role === 'doctor') navigate('/agenda');
        else navigate('/admin');
    } catch (error) {
        console.error(error);
        setNotification({ visible: true, type: "error", message: "Error al eliminar paciente" });
    }
  };

  // 2. Eliminar Condición
  const clickDeleteCondition = () => {
    if (!selectedConditionId) {
        setNotification({ visible: true, type: "error", message: "Selecciona una condición para eliminar" });
        return;
    }
    setConfirmModal({
        visible: true,
        message: "¿Deseas eliminar este antecedente médico del registro?",
        action: executeDeleteCondition
    });
  };

  const executeDeleteCondition = async () => {
    try {
        await api.delete(`/medical-record-conditions/${selectedConditionId}`);
        setPatientData(prev => ({
            ...prev,
            conditions: prev.conditions.filter(c => c.id !== selectedConditionId)
        }));
        setSelectedConditionId(null);
        setNotification({ visible: true, type: "success", message: "Antecedente eliminado" });
    } catch (error) {
        console.error(error);
        setNotification({ visible: true, type: "error", message: "Error al eliminar antecedente" });
    }
  };

  // 3. Eliminar Tratamiento
  const clickDeleteTreatment = () => {
    if (!selectedTreatment) {
        setNotification({ visible: true, type: "error", message: "Selecciona un tratamiento para eliminar" });
        return;
    }
    setConfirmModal({
        visible: true,
        message: "ADVERTENCIA: Al eliminar este tratamiento se borrarán todos sus procedimientos asociados. ¿Deseas continuar?",
        action: executeDeleteTreatment
    });
  };

  const executeDeleteTreatment = async () => {
    try {
        await api.delete(`/treatments/${selectedTreatment.id}`);
        
        const newTreatments = patientData.treatments.filter(t => t.id !== selectedTreatment.id);
        setPatientData(prev => ({ ...prev, treatments: newTreatments }));
        setSelectedTreatmentIndex(0);
        setSelectedProcedureId(null);
        setNotification({ visible: true, type: "success", message: "Tratamiento eliminado" });
    } catch (error) {
        console.error(error);
        setNotification({ visible: true, type: "error", message: "Error al eliminar tratamiento" });
    }
  };

  // 4. Eliminar Procedimiento (LÓGICA ACTUALIZADA)
  const clickDeleteProcedure = () => {
    if (!selectedProcedureId) {
        setNotification({ visible: true, type: "error", message: "Selecciona un procedimiento para eliminar" });
        return;
    }
    setConfirmModal({
        visible: true,
        message: "¿Estás seguro de que deseas eliminar este procedimiento?",
        action: executeDeleteProcedure
    });
  };

  const executeDeleteProcedure = async () => {
    try {
        await api.delete(`/procedures/${selectedProcedureId}`);
        
        setPatientData(prev => {
            const updatedTreatments = prev.treatments.map((t, index) => {
                if (index === selectedTreatmentIndex) {
                    return {
                        ...t,
                        procedures: t.procedures.filter(p => p.id !== selectedProcedureId)
                    };
                }
                return t;
            });
            return { ...prev, treatments: updatedTreatments };
        });
        setSelectedProcedureId(null);
        setNotification({ visible: true, type: "success", message: "Procedimiento eliminado" });
    } catch (error) {
        console.error(error);
        setNotification({ visible: true, type: "error", message: "Error al eliminar procedimiento" });
    }
  };


  const statusColor = (status) => {
    const baseClasses = "flex items-center justify-center h-full w-full cursor-pointer hover:opacity-80 transition select-none text-white"; 
    const statusName = status?.name || status || ""; 
    switch(statusName){
      case "Activo": return `${baseClasses} bg-green-500`; 
      case "Referido": 
      case "Diferido": return `${baseClasses} bg-orange-400`; 
      case "Finalizado": return `${baseClasses} bg-red-500`; 
      default: return `${baseClasses} bg-gray-300 text-gray-700`; 
    }
  };

  const closeNotification = () => setNotification({ visible: false, type: "", message: "" });

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
            <button 
                onClick={clickDeletePatient}
                className="bg-[#FF2323] hover:bg-[#d61a1a] p-2 rounded-md text-white w-11 h-11 flex items-center justify-center transition"
                title="Eliminar Paciente"
            >
              <FaTrash className="text-lg"/>
            </button>
          </div>
      </div>

      <div className="flex-grow p-3 rounded-md grid grid-cols-3 bg-[#F7F2FA] overflow-hidden gap-1">
        
        {/* COLUMNA 1: INFO GENERAL */}
        <div className="p-2 border-e-2 border-[#dad9de] overflow-y-auto">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold mb-1 text-[17px]">Información del paciente</h3>
            <button className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center" onClick={() => setShowEditPatientModal(true)}>
              <FaEdit />
            </button>
          </div>
          <div className="flex flex-col gap-2 text-[14px] pb-6 pl-3">
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
              <button className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-2 w-auto h-7 flex items-center justify-center transition" onClick={handleSaveNotes}>
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

        {/* COLUMNA 2: ANTECEDENTES Y TRATAMIENTOS */}
        <div className="p-2 border-e-2 border-[#dad9de] flex flex-col h-full overflow-hidden">
          
          {/* ANTECEDENTES */}
          <div className="pb-6 flex-shrink-0">
            <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-[17px]">Antecedentes médicos</h3>
                <div className='flex items-center gap-1'>
                  <button 
                      onClick={clickDeleteCondition}
                      className={`px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center text-white transition
                        ${selectedConditionId ? 'bg-[#db0000] hover:bg-[#940808] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                      title="Eliminar antecedente seleccionado"
                  >
                    <FaTrash/>
                  </button>                                    
                  <button 
                    className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center" 
                    onClick={() => { if (patientData.medicalRecordId) { setShowConditionModal(true); } else { alert("Error: Historial médico no encontrado."); } }}
                    >
                    <FaPlus />
                  </button>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[115px]"> 
              <table className="w-full text-sm rounded-md overflow-hidden">
                <tbody className="text-[15px]">
                  {patientData.conditions && patientData.conditions.length > 0 ? (
                      patientData.conditions.map((cond, i) => (
                      <tr 
                        key={cond.id || i}
                        onClick={() => setSelectedConditionId(cond.id)}
                        className={`cursor-pointer transition hover:bg-[#8EC3EB] ${selectedConditionId === cond.id ? "bg-[#8EC3EB]" : ""}`}
                      >
                        <td className="text-md pl-3 px-4 py-1.5 border-[#dad9de] border-y-2 text-[14px]">
                            {cond.name}
                        </td>
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
              <div className='flex items-center gap-1'>
                  <button 
                      onClick={clickDeleteTreatment}
                      className={`px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center text-white transition
                        ${selectedTreatment ? 'bg-[#db0000] hover:bg-[#940808] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                      title="Eliminar tratamiento seleccionado"
                  >
                    <FaTrash/>
                  </button>
                  <button className="bg-[#1D6BAC] hover:bg-[#2c88cb] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center" onClick={() => { if (patientData.medicalRecordId) { setShowTreatmentModal(true); } else { alert("Error: No se encontró el historial médico."); } }}>
                    <FaPlus />
                  </button>
              </div>
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
                                    onClick={() => {
                                        setSelectedTreatmentIndex(i);
                                        setSelectedProcedureId(null); // Reset selección procedimiento
                                    }}
                                >
                                    <td className="px-4 py-1.5 whitespace-normal break-words text-center text-[14px]" title={t.name}>
                                        {t.name}
                                    </td>
                                    
                                    <td className="px-4 py-1.5 text-center text-[13px]">
                                        {formatDateES(t.start)}
                                    </td>
                                    
                                    <td className="px-4 py-1.5 text-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTreatmentToEditStatus(t);
                                            setShowStatusModal(true);
                                        }}
                                    >
                                        <div className={`rounded-lg font-bold text-[13px] ${statusColor(statusName)}`}>
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

        {/* COLUMNA 3: PROCEDIMIENTOS */}
        <div className="flex flex-col p-2 overflow-hidden h-full">
          <div className="pb-2 flex justify-between items-center flex-shrink-0">
            <h3 className="font-bold text-[17px]">Control de procedimientos</h3>
            <div className="flex items-center gap-1">
                <button 
                    onClick={clickDeleteProcedure}
                    className={`px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center text-white transition
                        ${selectedProcedureId ? 'bg-[#db0000] hover:bg-[#940808] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                    title="Eliminar procedimiento seleccionado"
                >
                    <FaTrash/>
                </button>
                <button className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center" onClick={() => { if (selectedTreatment) { setShowProcedureModal(true); } else { alert("Selecciona un tratamiento activo primero."); } }}>
                    <FaPlus />
                </button>
            </div>
          </div>
          {selectedTreatment && (
            <>
              <div className="flex-grow overflow-y-auto min-h-0">
                <table className="w-full text-sm rounded-md border-collapse table-fixed">
                  <thead className="uppercase text-sm sticky top-0 bg-[#F7F2FA] z-10">
                    <tr>
                      <th className="px-2 py-1.5 text-center w-[25%]">Fecha</th>
                      <th className="px-2 py-1.5 text-center w-[50%]">Procedimiento</th>
                      <th className="px-2 py-1.5 text-center w-[25%]">Abono</th>
                    </tr>
                  </thead>
                  <tbody>
                      {selectedTreatment.procedures && selectedTreatment.procedures.length > 0 ? (
                          selectedTreatment.procedures.map((proc) => {
                              const abono = proc.payment ? parseFloat(proc.payment.amount) : 0;
                              const description = proc.proc || proc.description || "Procedimiento";

                              return (
                                  <tr 
                                    key={proc.id} 
                                    className={`border-[#dad9de] border-y-2 cursor-pointer hover:bg-[#8EC3EB] 
                                        ${selectedProcedureId === proc.id ? "bg-[#8EC3EB]" : ""}`}
                                    onClick={() => setSelectedProcedureId(proc.id)}
                                  >
                                      <td className="px-2 py-1.5 text-center text-[13px]">
                                        {formatDateES(proc.date)}
                                      </td>
                                      
                                      <td className="px-2 py-1.5 whitespace-normal break-words text-center text-[13px]">
                                        {description}
                                      </td>
                                      
                                      <td className="px-2 py-1.5 text-center text-[13px]">${abono.toFixed(2)}</td>
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
      {showTreatmentModal && patientData.medicalRecordId && <CreateTreatmentModal medicalRecordId={patientData.medicalRecordId} onClose={() => setShowTreatmentModal(false)} onSave={handleAddTreatment} />}
      {showProcedureModal && selectedTreatment && <CreateProcedureModal treatmentId={selectedTreatment.id} onClose={() => setShowProcedureModal(false)} onSave={handleAddProcedure} />}
      {showConditionModal && patientData.medicalRecordId && <CreateConditionModal medicalRecordId={patientData.medicalRecordId} onClose={() => setShowConditionModal(false)} onSave={handleAddCondition} existingConditions={patientData.conditions} />}
      {showEditPatientModal && <EditPatientModal isOpen={showEditPatientModal} onClose={() => setShowEditPatientModal(false)} onSave={handlePatientUpdate} patientData={patientData} />}
      {showStatusModal && treatmentToEditStatus && <ChangeStatusModal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} treatmentId={treatmentToEditStatus.id} currentStatus={treatmentToEditStatus.status} onSave={handleStatusUpdated} />}
      
      {/* Modal de Notificación simple */}
      {notification.visible && <NotificationModal type={notification.type} message={notification.message} onClose={closeNotification} />}
      
      {/* MODAL DE CONFIRMACIÓN */}
      <ConfirmationModal 
        isOpen={confirmModal.visible}
        message={confirmModal.message}
        onConfirm={confirmModal.action}
        onClose={() => setConfirmModal({ ...confirmModal, visible: false })}
      />
    </div>
  );
}
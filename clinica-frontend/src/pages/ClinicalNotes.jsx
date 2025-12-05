import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaUser } from "react-icons/fa";
import CreatePatientModal from "../modals/CreatePatientModal";
import { useNavigate } from "react-router-dom";
import api from "../scripts/axiosConfig";

export default function ClinicalNotes() {
  const navigate = useNavigate();
  
  // 1. Iniciamos con array vacío
  const [patients, setPatients] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Cargar pacientes desde el Backend
  useEffect(() => {
    const fetchPatients = async () => {
        try {
            const response = await api.get('/patients');
            
            const formattedPatients = response.data.map(p => ({
                ...p,
                lastname: p.lastName 
            }));
            
            setPatients(formattedPatients);
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
        }
    };

    fetchPatients();
  }, []);

  const handleCreatePatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  // Filtrar Y ORDENAR pacientes alfabéticamente
  const filteredPatients = patients
    .filter((p) =>
      `${p.name} ${p.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = `${a.name} ${a.lastname}`.toLowerCase();
      const nameB = `${b.name} ${b.lastname}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

  return (
    <div className="flex flex-col h-full px-3 py-3 md:px-2 gap-0.5">
      <div className="mb-2 flex h-11 items-center justify-between rounded-md p-3">
        <h2 className="text-xl font-bold">Historiales Clínicos</h2>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 border-[2px] rounded-md p-2 hover:bg-[#eeeef1]">
            <FaSearch className="text-[#BBB8C1]" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none outline-none text-sm bg-transparent w-48"
            />
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex transition grow items-center justify-center gap-3 rounded-md p-3 text-md font-semibold hover:bg-[#52a3de] bg-[#1D6BAC] md:flex-none md:justify-start md:p-2 md:px-3 text-[#FFFFFF]"
          >
            <FaPlus className="text-md" />
            <div className="hidden md:block pr-0.5 text-sm">Crear Paciente</div>
          </button>
        </div>
      </div>

      <div className="flex-grow rounded-md bg-[#F7F2FA] overflow-auto p-3">
        <table className="w-full border-collapse min-w-full text-sm text-left text-black rounded-lg">
          <thead className="uppercase text-md"> 
            <tr> 
              <th className="px-6 py-3">Nombre Completo</th> 
              <th className="px-6 py-3">Correo electrónico</th> 
              <th className="px-6 py-3">Celular</th> 
            </tr>
          </thead>
          <tbody> 
            {filteredPatients.map((person) => ( 
              <tr 
                key={person.id}
                onClick={() => navigate(`/patients/${person.id}`)}
                className='rounded-md hover:bg-[#8EC3EB] border-[#dad9de] border-y-2 cursor-pointer transition' 
              > 
                <td className="px-6 py-1 flex items-center gap-2"> 
                  <div className="w-8 h-8 rounded-full bg-[#fafafa] flex items-center justify-center border-[#d1d5db] border-2"> 
                    <span className="text-[#8f8f8f] text-lg"><FaUser/></span> 
                  </div> {person.name} {person.lastname} 
                </td> 
                <td className="px-6 py-1">
                  {person.email || '-'}
                </td> 
                <td className="px-6 py-1">
                  {person.phone}
                </td> 
              </tr> 
            ))} 
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  {patients.length === 0 ? "Cargando o no hay pacientes..." : "No se encontraron coincidencias"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CreatePatientModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreatePatient}
      />
    </div>
  );
}
import React, { useState } from "react";
import { FaSearch, FaPlus, FaUser } from "react-icons/fa";
import CreatePatientModal from "../modals/CreatePatientModal";
import { useNavigate } from "react-router-dom";

export default function ClinicalNotes() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([
  { id: 1, name: "Astrid Violeta", lastname: "Ayala Ayala", email: "astridayala@gmail.com", phone: "+(503) 5588-9966" },
  { id: 2, name: "Jaime Roberto", lastname: "Lazo Fermán", email: "jaimelazo@gmail.com", phone: "+(503) 6012-3344" },
  { id: 3, name: "Daniela María", lastname: "Guardado Vásquez", email: "danielaguardado@gmail.com", phone: "+(503) 7123-4567" },
  { id: 4, name: "Luis Enrique", lastname: "Mendoza Ramírez", email: "luismendoza@gmail.com", phone: "+(503) 7890-1122" },
  { id: 5, name: "Gabriela Sofía", lastname: "Hernández Campos", email: "gabriela.hernandez@gmail.com", phone: "+(503) 7456-9988" },
  { id: 6, name: "Carlos Alberto", lastname: "Pineda López", email: "carlospineda@gmail.com", phone: "+(503) 6345-2211" },
  { id: 7, name: "María Fernanda", lastname: "Cañas de Rivas", email: "mariafcanas@gmail.com", phone: "+(503) 7845-6677" },
  { id: 8, name: "Ricardo José", lastname: "Flores Arévalo", email: "ricardoflores@gmail.com", phone: "+(503) 7755-4433" },
  { id: 9, name: "Paola Beatriz", lastname: "Velásquez Torres", email: "paolavelasquez@gmail.com", phone: "+(503) 7988-2200" },
  { id: 10, name: "Jorge Andrés", lastname: "Gómez Aguirre", email: "jorgegomez@gmail.com", phone: "+(503) 6001-8899" },
  { id: 11, name: "Andrea Carolina", lastname: "Santos Portillo", email: "andreasantos@gmail.com", phone: "+(503) 7234-1100" },
  { id: 12, name: "Diego Armando", lastname: "Martínez Serrano", email: "diegomartinez@gmail.com", phone: "+(503) 7312-5566" },
  { id: 13, name: "Patricia Elena", lastname: "Mejía Contreras", email: "patriciamejia@gmail.com", phone: "+(503) 7544-8899" },
  { id: 14, name: "Juan Pablo", lastname: "Orellana Amaya", email: "juanporellana@gmail.com", phone: "+(503) 7987-6655" },
  { id: 15, name: "Carolina Isabel", lastname: "Sánchez Molina", email: "carosanchez@gmail.com", phone: "+(503) 7322-4488" },
  { id: 16, name: "Oscar Mauricio", lastname: "Cruz Villalta", email: "oscarcruz@gmail.com", phone: "+(503) 7455-3322" },
  { id: 17, name: "Sofía Alejandra", lastname: "Perdomo Chicas", email: "sofiaperdomo@gmail.com", phone: "+(503) 7894-5566" },
  { id: 18, name: "David Esteban", lastname: "Zelaya Romero", email: "davidzelaya@gmail.com", phone: "+(503) 7012-3344" },
  { id: 19, name: "Marisol Teresa", lastname: "López Herrera", email: "marisollopez@gmail.com", phone: "+(503) 7655-9988" },
  { id: 20, name: "Fernando José", lastname: "Rivera Escobar", email: "fernandorivera@gmail.com", phone: "+(503) 7211-8899" },
  { id: 21, name: "Claudia Patricia", lastname: "Castillo Barrera", email: "claudiacastillo@gmail.com", phone: "+(503) 7345-6677" },
  { id: 22, name: "Alejandro Daniel", lastname: "García Mejía", email: "alegarcia@gmail.com", phone: "+(503) 7567-4433" },
  { id: 23, name: "Valeria Nicole", lastname: "Cordero Menjívar", email: "valeriacordero@gmail.com", phone: "+(503) 7009-2244" },
  { id: 24, name: "Kevin Eduardo", lastname: "Rivas Sorto", email: "kevinrivas@gmail.com", phone: "+(503) 7456-9933" },
  { id: 25, name: "Diana Carolina", lastname: "Bonilla Fuentes", email: "dianabonilla@gmail.com", phone: "+(503) 7344-2299" },
  { id: 26, name: "Manuel Antonio", lastname: "Hernández Álvarez", email: "manuelhernandez@gmail.com", phone: "+(503) 7666-5511" },
  { id: 27, name: "Isabel Cristina", lastname: "Arévalo Domínguez", email: "isabelarevalo@gmail.com", phone: "+(503) 7112-3344" },
  { id: 28, name: "Rodrigo Rafael", lastname: "Guevara Quintanilla", email: "rodrigoguevara@gmail.com", phone: "+(503) 7890-2255" },
  { id: 29, name: "Mónica Beatriz", lastname: "Cabrera López", email: "monicacabrera@gmail.com", phone: "+(503) 7321-1199" },
  { id: 30, name: "Ernesto Javier", lastname: "Peña Cornejo", email: "ernestopena@gmail.com", phone: "+(503) 7555-6677" }
]);


  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreatePatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  // Filtrar pacientes según el término de búsqueda (name o lastname)
  const filteredPatients = patients.filter(
    (p) =>
      `${p.name} ${p.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  {person.email}
                </td> 
                <td className="px-6 py-1">
                  {person.phone}
                </td> 
              </tr> 
            ))} 
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No se encontraron pacientes
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavAdmin from './components/SideNavAdmin'; 
import { FaPlus, FaTrash } from 'react-icons/fa';

// Importamos los modales
import CreateUserModal from './modals/CreateUserModal';
import CreateStatusModal from './modals/CreateStatusModal'; 
import CreateTreatmentTypeModal from './modals/CreateTreatmentTypeModal'; 
import CreateConditionModal from './modals/CreateConditionModal'; 
import NotificationModal from '../modals/NotificationModal';
import ConfirmationModal from '../modals/ConfirmationModal'; // IMPORTANTE: Tu modal de confirmación

import api from "../scripts/axiosConfig"; 

export default function AdminDashboard() {
    const navigate = useNavigate();
    
    // --- ESTADOS: USUARIOS ---
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null); 
    
    // --- ESTADOS: ESTADOS DE TRATAMIENTOS ---
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [selectedStatusId, setSelectedStatusId] = useState(null);

    // --- ESTADOS: TIPOS DE TRATAMIENTOS ---
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
    const [treatmentTypes, setTreatmentTypes] = useState([]);
    const [selectedTypeId, setSelectedTypeId] = useState(null);

    // --- ESTADOS: CONDICIONES ---
    const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);
    const [conditions, setConditions] = useState([]);
    const [selectedConditionId, setSelectedConditionId] = useState(null);

    // --- NOTIFICACIONES & CONFIRMACIONES ---
    const [notification, setNotification] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ visible: false, message: "", action: null });

    // Carga inicial de todos los datos
    useEffect(() => {
        fetchUsers();
        fetchStatuses();
        fetchTreatmentTypes();
        fetchConditions();
    }, []);

    // ================= LOGICA USUARIOS =================
    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) { console.error(error); }
    };
    
    // 1. Click en botón borrar usuario -> Abre Modal
    const clickDeleteUser = () => {
        if (!selectedUserId) {
            setNotification({ type: 'error', message: 'Selecciona un usuario primero' });
            return;
        }
        setConfirmModal({
            visible: true,
            message: "¿Estás seguro de que deseas eliminar este usuario?",
            action: executeDeleteUser
        });
    };

    // 2. Acción real de borrado
    const executeDeleteUser = async () => {
        try {
            await api.delete(`/users/${selectedUserId}`);
            setUsers(users.filter(u => u.id !== selectedUserId));
            setSelectedUserId(null); 
            setNotification({ type: 'success', message: 'Usuario eliminado correctamente' });
        } catch (error) {
            const msg = error.response?.data?.message || "Error al eliminar";
            setNotification({ type: 'error', message: msg });
        }
    };
    const handleUserSaved = () => fetchUsers();

    // ================= LOGICA ESTADOS DE TRATAMIENTO =================
    const fetchStatuses = async () => {
        try {
            const response = await api.get('/treatment-statuses');
            const sorted = response.data.sort((a, b) => a.orderPriority - b.orderPriority);
            setStatuses(sorted);
        } catch (error) { console.error(error); }
    };

    const clickDeleteStatus = () => {
        if (!selectedStatusId) {
            setNotification({ type: 'error', message: 'Selecciona un estado primero' });
            return;
        }
        setConfirmModal({
            visible: true,
            message: "¿Estás seguro de eliminar este estado de tratamiento?",
            action: executeDeleteStatus
        });
    };

    const executeDeleteStatus = async () => {
        try {
            await api.delete(`/treatment-statuses/${selectedStatusId}`);
            setStatuses(statuses.filter(s => s.id !== selectedStatusId));
            setSelectedStatusId(null);
            setNotification({ type: 'success', message: 'Estado eliminado correctamente' });
        } catch (error) {
            const msg = error.response?.data?.message || "Error al eliminar estado";
            setNotification({ type: 'error', message: msg });
        }
    };
    const handleStatusSaved = () => fetchStatuses();

    // ================= LOGICA TIPOS DE TRATAMIENTO =================
    const fetchTreatmentTypes = async () => {
        try {
            const response = await api.get('/treatments-types'); 
            setTreatmentTypes(response.data);
        } catch (error) { console.error(error); }
    };

    const clickDeleteType = () => {
        if (!selectedTypeId) {
            setNotification({ type: 'error', message: 'Selecciona un tipo de tratamiento primero' });
            return;
        }
        setConfirmModal({
            visible: true,
            message: "¿Estás seguro de eliminar este tipo de tratamiento?",
            action: executeDeleteType
        });
    };

    const executeDeleteType = async () => {
        try {
            await api.delete(`/treatments-types/${selectedTypeId}`);
            setTreatmentTypes(treatmentTypes.filter(t => t.id !== selectedTypeId));
            setSelectedTypeId(null);
            setNotification({ type: 'success', message: 'Tipo eliminado correctamente' });
        } catch (error) {
            const msg = error.response?.data?.message || "Error al eliminar tipo";
            setNotification({ type: 'error', message: msg });
        }
    };
    const handleTypeSaved = () => fetchTreatmentTypes();

    // ================= LOGICA CONDICIONES =================
    const fetchConditions = async () => {
        try {
            const response = await api.get('/conditions'); 
            setConditions(response.data);
        } catch (error) { console.error("Error cargando condiciones:", error); }
    };

    const clickDeleteCondition = () => {
        if (!selectedConditionId) {
            setNotification({ type: 'error', message: 'Selecciona una condición primero' });
            return;
        }
        setConfirmModal({
            visible: true,
            message: "¿Estás seguro de eliminar esta condición médica?",
            action: executeDeleteCondition
        });
    };

    const executeDeleteCondition = async () => {
        try {
            await api.delete(`/conditions/${selectedConditionId}`);
            setConditions(conditions.filter(c => c.id !== selectedConditionId));
            setSelectedConditionId(null);
            setNotification({ type: 'success', message: 'Condición eliminada correctamente' });
        } catch (error) {
            const msg = error.response?.data?.message || "Error al eliminar condición";
            setNotification({ type: 'error', message: msg });
        }
    };
    const handleConditionSaved = () => fetchConditions();


    // ================= LOGICA GENERAL =================
    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole'); 
        navigate('/', { replace: true });
    };

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
            <div className="flex-none md:w-64">
                <SideNavAdmin onSignOut={handleSignOut} />
            </div>

            <div className="flex flex-col h-full w-full px-3 py-3 md:px-2 gap-0.5">                
                <div className='flex-grow grid grid-cols-3 gap-1 rounded-md bg-[#F7F2FA] overflow-auto'>
                    
                    {/* ===== COLUMNA 1: USUARIOS Y ESTADOS ===== */}
                    <div className='p-2 border-e-2 border-[#dad9de] overflow-y-auto flex flex-col'>
                        
                        {/* PARTE SUPERIOR: USUARIOS */}
                        <div className='h-1/2 flex flex-col rounded-t-md overflow-hidden'>
                            <div className="flex justify-between items-center p-2">
                                <h3 className="font-bold text-[17px]">Usuarios</h3>
                                <div className='flex items-center gap-1'>
                                    <button 
                                        onClick={clickDeleteUser}
                                        className={`px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center text-white transition
                                            ${selectedUserId ? 'bg-[#db0000] hover:bg-[#940808] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                                        title="Eliminar usuario"
                                    >
                                        <FaTrash/>
                                    </button>                                    
                                    <button 
                                        onClick={() => setIsUserModalOpen(true)}
                                        className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-grow overflow-y-auto p-1">
                                <table className="min-w-full text-xs text-left">
                                    <thead className="uppercase text-sm sticky top-0 font-bold border-b bg-[#f7f2fa]">
                                        <tr>
                                            <th className="px-2 py-1 text-center">Nombre</th>
                                            <th className="px-2 py-1 text-center">Rol</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#dad9de]">
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <tr 
                                                    key={user.id}
                                                    onClick={() => setSelectedUserId(user.id)}
                                                    className={`cursor-pointer transition hover:bg-[#1d6bac] hover:text-white  
                                                        ${selectedUserId === user.id ? 'bg-[#1d6bac] text-white ' : ''}`}
                                                >
                                                    <td className="px-2 py-1">
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className={`text-[10px] ${selectedUserId === user.id ? 'text-white' : ''}`}>{user.email}</div>
                                                    </td>
                                                    <td className="px-2 py-2 text-[13px] capitalize text-center">{user.role}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="2" className="text-center py-4 text-gray-500">No hay usuarios</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* PARTE INFERIOR: ESTADOS DE TRATAMIENTO */}
                        <div className='border-t-2 border-[#dad9de] h-1/2 mt-1 rounded-b-md flex flex-col overflow-hidden'>
                            <div className="flex justify-between items-center p-2">
                                <h3 className="font-bold text-[17px]">Estados Tratamiento</h3>
                                <div className='flex items-center gap-1'>
                                    <button 
                                        onClick={clickDeleteStatus}
                                        className={`px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center text-white transition
                                            ${selectedStatusId ? 'bg-[#db0000] hover:bg-[#940808] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                                        title="Eliminar estado"
                                    >
                                        <FaTrash/>
                                    </button>                                    
                                    <button 
                                        onClick={() => setIsStatusModalOpen(true)}
                                        className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-grow overflow-y-auto p-1">
                                <table className="min-w-full text-xs text-left">
                                    <thead className="uppercase text-sm sticky top-0 font-bold border-b bg-[#f7f2fa]">
                                        <tr>
                                            <th className="px-2 py-1 text-center">Nombre</th>
                                            <th className="px-2 py-1 text-center">Prioridad</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#dad9de]">
                                        {statuses.length > 0 ? (
                                            statuses.map((status) => (
                                                <tr 
                                                    key={status.id}
                                                    onClick={() => setSelectedStatusId(status.id)}
                                                    className={`cursor-pointer transition hover:bg-[#1d6bac] hover:text-white  
                                                        ${selectedStatusId === status.id ? 'bg-[#1d6bac] text-white ' : ''}`}
                                                >
                                                    <td className="px-2 py-2 font-medium text-[14px]">{status.name}</td>
                                                    <td className="px-2 py-2 text-center text-[14px]">{status.orderPriority}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="2" className="text-center py-4 text-gray-500">No hay estados</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* ===== COLUMNA 2: TIPOS DE TRATAMIENTO ===== */}
                    <div className='p-2 border-e-2 border-[#dad9de] overflow-y-auto flex flex-col'>
                        <div className="flex justify-between items-center p-2">
                            <h3 className="font-bold text-[17px]">Tipos de Tratamientos</h3>
                            <div className='flex items-center gap-1'>
                                <button 
                                    onClick={clickDeleteType}
                                    className={`px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center text-white transition
                                        ${selectedTypeId ? 'bg-[#db0000] hover:bg-[#940808] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                                    title="Eliminar tipo"
                                >
                                    <FaTrash/>
                                </button>                                    
                                <button 
                                    onClick={() => setIsTypeModalOpen(true)}
                                    className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto p-1 rounded-md">
                            <table className="min-w-full text-xs text-left">
                                <thead className="uppercase text-sm sticky top-0 font-bold border-b bg-[#f7f2fa]">
                                    <tr>
                                        <th className="px-2 py-1 text-left">Nombre del Tipo Tratamiento</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#dad9de]">
                                    {treatmentTypes.length > 0 ? (
                                        treatmentTypes.map((type) => (
                                            <tr 
                                                key={type.id}
                                                onClick={() => setSelectedTypeId(type.id)}
                                                className={`cursor-pointer transition hover:bg-[#1d6bac] hover:text-white  
                                                    ${selectedTypeId === type.id ? 'bg-[#1d6bac] text-white ' : ''}`}
                                            >
                                                <td className="px-2 py-2 font-medium text-[14px]">{type.name}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td className="text-center py-4 text-gray-500">No hay tipos registrados</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ===== COLUMNA 3: CONDICIONES ===== */}
                    <div className='p-2 overflow-y-auto flex flex-col'>
                         <div className="flex justify-between items-center p-2">
                            <h3 className="font-bold text-[17px]">Condiciones Médicas</h3>
                            <div className='flex items-center gap-1'>
                                <button 
                                    onClick={clickDeleteCondition}
                                    className={`px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center text-white transition border 
                                        ${selectedConditionId ? 'bg-[#db0000] hover:bg-[#940808] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                                    title="Eliminar condición"
                                >
                                    <FaTrash/>
                                </button>                                    
                                <button 
                                    onClick={() => setIsConditionModalOpen(true)}
                                    className="bg-[#1D6BAC] hover:bg-[#52a3de] text-white px-2 py-1 rounded-md gap-1 w-auto h-7 flex items-center justify-center border border-white/20"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto p-1 rounded-md">
                            <table className="min-w-full text-xs text-left">
                                <thead className="uppercase text-sm sticky top-0 font-bold border-b bg-[#f7f2fa]">
                                    <tr>
                                        <th className="px-2 py-1 text-left">Nombre del Padecimiento</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#dad9de]">
                                    {conditions.length > 0 ? (
                                        conditions.map((condition) => (
                                            <tr 
                                                key={condition.id}
                                                onClick={() => setSelectedConditionId(condition.id)}
                                                className={`cursor-pointer transition hover:bg-[#1d6bac] hover:text-white  
                                                    ${selectedConditionId === condition.id ? 'bg-[#1d6bac] text-white ' : ''}`}
                                            >
                                                <td className="px-2 py-2 font-medium text-[14px]">{condition.name}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td className="text-center py-4 text-gray-500">No hay condiciones registradas</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <CreateUserModal 
                isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} onSave={handleUserSaved}
            />
            <CreateStatusModal 
                isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} onSave={handleStatusSaved}
            />
            <CreateTreatmentTypeModal
                isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)} onSave={handleTypeSaved}
            />
            <CreateConditionModal
                isOpen={isConditionModalOpen} onClose={() => setIsConditionModalOpen(false)} onSave={handleConditionSaved}
            />

            {notification && (
                <NotificationModal
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            
            <ConfirmationModal 
                isOpen={confirmModal.visible}
                message={confirmModal.message}
                onConfirm={confirmModal.action}
                onClose={() => setConfirmModal({ ...confirmModal, visible: false })}
            />
        </div>
    );
}
import React, { useState } from 'react';
import { FaAt, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotificationModal from '../modals/NotificationModal'; 

const API_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = `${API_URL}/auth/login`; 

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        show: false,
        type: '',  
        message: ''
    });

    const [redirectPath, setRedirectPath] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setRedirectPath(null); 

        try {
            const response = await axios.post(LOGIN_URL, {
                email: email,
                password: password,
            });

            const data = response.data;
            
            // 1. Guardar Token y Datos Clave
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('currentUser', JSON.stringify(data.user)); 
            const userRole = data.user.role; 
            localStorage.setItem('userRole', userRole); 

            // 2. Determinar la ruta de destino (SEPARACIÓN DE INTERFACES)
            let targetPath = '/';

            if (userRole === 'admin') {
                targetPath = '/admin'; 
            } else if (userRole === 'doctor') {
                targetPath = '/agenda'; 
            }
            
            // 3. Guardar la ruta y mostrar el modal de ÉXITO
            setRedirectPath(targetPath);
            setNotification({
                show: true,
                type: 'success',
                message: `¡Bienvenido ${data.user.name || ''}!`
            });

        } catch (err) {
            console.error('Error durante el login:', err);
            
            let errorMessage = 'Ocurrió un error inesperado.';
            if (err.response) {
                errorMessage = err.response.data.message || 'Error en la autenticación.';
            } else if (err.request) {
                errorMessage = 'Error de conexión con el servidor.';
            }

            // 4. Mostrar modal de ERROR
            setNotification({
                show: true,
                type: 'error',
                message: errorMessage
            });
        }
    };

    const handleCloseModal = () => {
        setNotification({ ...notification, show: false });
        if (redirectPath) {
            navigate(redirectPath, { replace: true });
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            
            {notification.show && (
                <NotificationModal 
                    type={notification.type} 
                    message={notification.message} 
                    onClose={handleCloseModal} 
                />
            )}

            <div className='w-1/2 h-2/3 flex rounded-lg border-[#F7F2FA] border-2 shadow-2xl'>
                <div className='w-1/2 h-full flex items-center justify-center'>
                    <img className='w-3/4' src="/logo-mediCloud.png" alt="Logo MediCloud" />
                </div>
                <div className='bg-[#F7F2FA] w-1/2 h-full flex items-center justify-center'>
                    <form className="w-3/4" onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center mb-8">LOG IN</h1>
                        
                        <div className='flex items-center border-[#BBB8C1] border-2 rounded-md h-11 p-3 mb-5'>
                            <FaAt className='mr-3 text-lg text-[#BBB8C1] font-light'/>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="text-[#817b87] focus:outline-none w-full bg-transparent text-[14px]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className='flex items-center border-[#BBB8C1] border-2 rounded-md h-11 p-3 mb-5'>
                            <FaLock className='mr-3 text-lg text-[#BBB8C1]'/>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="text-[#817b87] focus:outline-none w-full bg-transparent text-[14px]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="bg-[#429BDB] font-semibold text-white flex justify-center w-full rounded-md h-11 items-center p-3 mb-5 hover:bg-sky-600 transition duration-150"
                        >
                            Sign In
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
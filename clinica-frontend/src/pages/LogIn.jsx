import React, { useState } from 'react';
import { FaAt, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// URL base de tu API desde .env
const API_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = `${API_URL}/auth/login`; 

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpia errores anteriores

        try {
            // Petición POST con Axios (Si es 200/201, va al bloque try)
            const response = await axios.post(LOGIN_URL, {
                email: email,
                password: password,
            });

            // --- LÓGICA DE ÉXITO (Redirección) ---
            const data = response.data;
            
            // 1. Guarda el token con la clave CONSISTENTE
            // Usamos 'accessToken' para que coincida con lo que guarda la API (data.access_token)
            localStorage.setItem('accessToken', data.access_token);
            
            console.log('Login exitoso:', data.user);
            alert('¡Login Exitoso! Redirigiendo a Agenda.'); 
            
            // 2. ¡Redirección a /agenda!
            navigate('/agenda', { replace: true }); 
            // ------------------------------------

        } catch (err) {
            // --- LÓGICA DE ERROR (Axios maneja 4xx/5xx aquí) ---
            console.error('Error durante el login:', err);
            
            if (err.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                const errorMessage = err.response.data.message || 'Error al iniciar sesión. Credenciales inválidas.';
                setError(errorMessage);
            } else if (err.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                setError('No se pudo conectar con el servidor. Por favor, revisa la conexión.');
            } else {
                // Algo más causó el error
                setError('Ocurrió un error inesperado al procesar la solicitud.');
            }
        }
    };

    return (
        // ... (El resto del JSX de tu componente LogIn es correcto)
        <div className='flex items-center justify-center h-screen'>
            {/* ... Contenido visual ... */}
            <div className='w-1/2 h-2/3 flex rounded-lg border-[#F7F2FA] border-2 shadow-2xl'>
                <div className='w-1/2 h-full flex items-center justify-center'>
                    <img className='w-3/4' src="/logo-mediCloud.png" alt="Logo MediCloud" />
                </div>
                <div className='bg-[#F7F2FA] w-1/2 h-full flex items-center justify-center'>
                    <form className="w-3/4" onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center mb-8">LOG IN</h1>
                        {/* Mensaje de error */}
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>} 
                        
                        {/* Campo Email */}
                        <div className='flex items-center border-[#BBB8C1] border-2 rounded-md h-11 p-3 mb-5'>
                            <FaAt className='mr-3 text-lg text-[#BBB8C1] font-light'/>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="text-[#817b87] focus:outline-none w-full bg-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className='flex items-center border-[#BBB8C1] border-2 rounded-md h-11 p-3 mb-5'>
                            <FaLock className='mr-3 text-lg text-[#BBB8C1]'/>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="text-[#817b87] focus:outline-none w-full bg-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Botón Submit */}
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
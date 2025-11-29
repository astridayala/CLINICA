import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // La clave debe coincidir con la clave que se guarda en LogIn.jsx
    const isAuthenticated = localStorage.getItem('accessToken'); 

    // 2. Si no está autenticado, redirige al / (que es tu LogIn)
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // 3. Si está autenticado, renderiza el contenido anidado de la ruta (el <Outlet />)
    return <Outlet />;
};

export default ProtectedRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const isAuthenticated = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole'); 

    // 1. Si no hay token, fuera.
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // 2. Si se requieren roles específicos y el usuario NO tiene ese rol
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    // 3. Si tiene token y el rol correcto, pasa.
    return <Outlet />;
};

export default ProtectedRoute;
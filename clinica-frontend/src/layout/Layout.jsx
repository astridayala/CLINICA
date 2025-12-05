import React from "react";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Layout() {
    const navigate = useNavigate();

    /**
     * Función para cerrar la sesión (Logout).
     */
    const handleSignOut = () => {
        // 1. Eliminar el token de acceso del almacenamiento local
        localStorage.removeItem('accessToken'); 
        
        // 2. Redirigir al usuario a la ruta de login ('/')
        navigate('/', { replace: true });
        
        console.log("Sesión cerrada. Token eliminado.");
    };
    return(
        <div className="flex  h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="flex-none">
                <SideNav onSignOut={handleSignOut} />
            </div>
            <div className="flex-grow h-screen overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}
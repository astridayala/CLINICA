import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClinicalNotes from './pages/ClinicalNotes'
import Layout from './layout/Layout'
import LogIn from './pages/LogIn'
import Agenda from './pages/Agenda'
import PatientDetail from './pages/PatientDetail'
import ProtectedRoute from './scripts/ProtectedRoute.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx' // <--- Importa tu Admin

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA */}
        <Route path="/" element={<LogIn />} />
          
        {/* --- ZONA DE DOCTORES --- */}
        <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
            <Route element={<Layout />}> 
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/clinicalNotes" element={<ClinicalNotes />} />
                <Route path="/patients/:id" element={<PatientDetail />} />
            </Route>
        </Route>

        {/* --- ZONA DE ADMIN --- */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
             <Route path="/admin" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClinicalNotes from './pages/ClinicalNotes'
import Layout from './layout/Layout'
import LogIn from './pages/LogIn'
import Agenda from './pages/Agenda'
import PatientDetail from './pages/PatientDetail'
import ProtectedRoute from './scripts/ProtectedRoute.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Ruta de Acceso Público: LogIn */}
        <Route path="/" element={<LogIn />} />
          
          {/* 2. Nivel de Protección: Todas las rutas aquí dentro están protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* 3. Nivel de Layout: Aplica el layout a todas las rutas protegidas */}
            <Route element={<Layout />}> 
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/clinicalNotes" element={<ClinicalNotes />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
        </Route>

        </Route>
      </Routes>
</BrowserRouter>
)
}

export default App
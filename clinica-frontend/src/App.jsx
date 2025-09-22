import React from 'react'
import { Router, BrowserRouter, Routes, Route } from 'react-router-dom'
import ClinicalNotes from './pages/ClinicalNotes'
import Layout from './layout/Layout'
import LogIn from './pages/LogIn'
import Agenda from './pages/Agenda'
import PatientDetail from './pages/PatientDetail'

const App  = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route element={<Layout />}>
            <Route path= "/agenda" element={<Agenda />} />
            <Route path="/clinicalNotes" element={<ClinicalNotes />} />

            <Route path="/patients/:id" element={<PatientDetail />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
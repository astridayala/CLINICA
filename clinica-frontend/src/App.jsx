import React from 'react'
import { Router, BrowserRouter, Routes, Route } from 'react-router'
import IndexPage from './pages/IndexPage'
import SideNav from './components/SideNav'
import ClinicalNotes from './pages/ClinicalNotes'
import Layout from './layout/Layout'
import LogIn from './pages/LogIn'

const App  = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/medicloud" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="clinicalNotes" element={<ClinicalNotes />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
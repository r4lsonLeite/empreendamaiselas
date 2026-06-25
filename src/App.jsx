import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Marketplace from './pages/Marketplace'
import AdminPanel from './pages/PainelAdministrativo'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Diagnostico from './pages/Diagnostico'
import Mentorias from './pages/Mentorias'
import Trilas from './pages/Trilhas'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/Diagnostico" element={<Diagnostico/>}/>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
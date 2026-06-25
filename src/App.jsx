import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Diagnostico from './pages/Diagnostico'
import Marketplace from './pages/Marketplace'
import Mentorias from './pages/Mentorias'
import Trilhas from './pages/Trilhas'
import PainelAdministrativoVisaoGeral from './pages/PainelAdministrativoVisaoGeral'
import PainelEmpreendedora from './pages/PainelEmpreendedora'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/diagnostico" element={<Diagnostico />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/mentorias" element={<Mentorias />} />
      <Route path="/trilhas" element={<Trilhas />} />
      <Route path="/admin" element={<PainelAdministrativoVisaoGeral />} />
      <Route path="/painel-empreendedora" element={<PainelEmpreendedora />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App

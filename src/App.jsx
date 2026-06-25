import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { getAuthToken } from './services/api'
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
  const isAuthenticated = Boolean(getAuthToken())

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/diagnostico" element={<ProtectedRoute><Diagnostico /></ProtectedRoute>} />
      <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
      <Route path="/mentorias" element={<ProtectedRoute><Mentorias /></ProtectedRoute>} />
      <Route path="/trilhas" element={<ProtectedRoute><Trilhas /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><PainelAdministrativoVisaoGeral /></ProtectedRoute>} />
      <Route path="/painel-empreendedora" element={<ProtectedRoute><PainelEmpreendedora /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App

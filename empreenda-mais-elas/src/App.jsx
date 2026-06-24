import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Marketplace from './pages/marketplace'
import AdminPanel from './pages/paineladmin'
import Carrinho from './pages/Carrinho'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
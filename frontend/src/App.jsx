import { Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App

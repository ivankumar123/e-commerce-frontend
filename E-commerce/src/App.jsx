import { Routes, Route } from 'react-router'
import { Homepage } from '/pages/Homepage'
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="Checkout" element={<h1>Checkout</h1>} />
    </Routes>
  
    
  )
}

export default App

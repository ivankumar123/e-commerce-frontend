import { Routes, Route } from 'react-router'
import { Homepage } from '/pages/Homepage.jsx'
import { Checkout } from '/pages/Checkout.jsx'
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="Checkout" element={<Checkout />} />
    </Routes>
  
    
  )
}

export default App

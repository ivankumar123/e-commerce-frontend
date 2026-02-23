import { Routes, Route } from 'react-router'
import { Homepage } from '/pages/Homepage.jsx'
import { Checkout } from '/pages/Checkout.jsx'
import { Orderspage } from '/pages/Orderspage.jsx'
import { Tracking } from '/pages/Tracking.jsx'
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="Checkout" element={<Checkout />} />
      <Route path="orders" element={<Orderspage />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  
    
  )
}

export default App

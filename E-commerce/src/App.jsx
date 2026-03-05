import { Homepage } from '../pages/Homepage'
import axios from "axios";
import { useEffect , useState } from "react";
import { Checkout } from '../pages/Checkout'
import { Orders } from '../pages/Orders'
import { Tracking } from '../pages/Tracking'
import { Routes, Route } from 'react-router'  
import './App.css'

function App() {

  const [ cart, setcart ] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product")
      .then((response) => {
          setcart(response.data);
        });
        
        
    }, []);

  return (
    
      <Routes>
        <Route index element={<Homepage cart= {cart}/>} />
        <Route path="/cart" element={<Checkout cart= {cart} />} />
        <Route path="/orders" element={<Orders cart={cart} />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>    
  )
}

export default App

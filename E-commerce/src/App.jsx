import { Homepage } from "../pages/Home/Homepage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Checkout } from "../pages/Checkout/Checkout";
import { Orders } from "../pages/Orders/Orders";
import { Tracking } from "../pages/Tracking/Tracking";
import { Routes, Route } from "react-router";
import "./App.css";

function App() {
  const [cart, setcart] = useState([]);

  const loadcart = async () => {
      const cart = await axios.get("/api/cart-items?expand=product");
      setcart(cart.data);
    };

  useEffect(() => {
    
    loadcart();

  }, []);

  return (
    <Routes>
      <Route index element={<Homepage cart={cart} loadcart={loadcart} />} />
      <Route path="/cart" element={<Checkout cart={cart} loadcart={loadcart} />} />
      <Route path="/orders" element={<Orders cart={cart} loadcart={loadcart} />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
  );
}

export default App;

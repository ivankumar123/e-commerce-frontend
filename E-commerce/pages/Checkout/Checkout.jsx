import "./Checkout.css";
import "./Checkout-header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Ordersum } from "./Ordersum";
import { Paymentsum } from "./paymentsum";
import { Checkoutheader } from "./Checkoutheader";

export function Checkout({ cart,  loadcart }) {
  const [deliveryoptions, setdeliveryoptions] = useState([]);
  const [paymentsum, setpaymentsum] = useState([]);

  useEffect(() => {
    const del = async () => {
      let getdeliveryoptions = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
       setdeliveryoptions(getdeliveryoptions.data);


      getdeliveryoptions = await axios.get("/api/payment-summary")
      setpaymentsum(getdeliveryoptions.data);  
    };

    del();  
    
  }, [cart]);

  return (
    <>
      <Checkoutheader/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
        <Ordersum cart={cart} deliveryoptions={deliveryoptions} loadcart={loadcart}/> 

         <Paymentsum paymentsum={paymentsum} loadcart={loadcart}/>
        </div>
      </div>
    </>
  );
}

import axios from "axios";
import { useEffect , useState } from "react";
import { Productgrid } from "./Productgrid";
import "./Homepage.css";
import { Header } from "../../components/Header";



export function Homepage( {cart, loadcart} ) {
    const [products, setproducts ] = useState([]);
    
   
    useEffect(() => {
      const getproducts = async () => {
       const products = await axios.get("/api/products")
       setproducts(products.data);
        
      };
      
      getproducts();  
               
    }, []);
   

  return (
    <>
      <title>E- commerce</title>
      <Header cart={cart} />

      <div className="home-page">

       <Productgrid products={products} loadcart={loadcart}/> 
        
      </div>
    </>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import AddedToCart from "./Components/AddedToCart";
import Payment from "./Components/Payment";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cart cart={cart} setCart={setCart} />} /> 
        <Route path="/added-cart" element={<AddedToCart cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;

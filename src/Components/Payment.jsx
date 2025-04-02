import { useState } from "react";
import "./payment.css";

function Payment({ cart }) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("visa");

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const discountedPrice = totalPrice - discount;

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(totalPrice * 0.1);
    } else {
      alert("Invalid coupon code");
    }
  };

  const handlePayment = () => {
    alert(`Payment of $${discountedPrice.toFixed(2)} via ${paymentMethod} successful!`);
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div className="payment-summary">
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <input 
          type="text" 
          placeholder="Enter coupon code" 
          value={coupon} 
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={applyCoupon}>Apply Coupon</button>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Final Price: ${discountedPrice.toFixed(2)}</p>
      </div>
      <div className="payment-methods">
        <label>
          <input 
            type="radio" 
            value="visa" 
            checked={paymentMethod === "visa"} 
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Visa
        </label>
        <label>
          <input 
            type="radio" 
            value="cod" 
            checked={paymentMethod === "cod"} 
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>
      <button onClick={handlePayment} className="pay-button">Proceed to Pay</button>
    </div>
  );
}

export default Payment;

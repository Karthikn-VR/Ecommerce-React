import { useNavigate } from "react-router-dom";
import "./cart.css";

function AddedToCart({ cart }) {
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="cart-container">
      <header className="main-header">
        <div className="container">
          <h1 className="logo">Your Cart</h1>
          <button className="back-btn" onClick={() => navigate("/")}>← Back to Shopping</button>
        </div>
      </header>

      <main className="container">
        <section className="cart-section">
          <h2>Cart Items ({cart.length})</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <div className="product-grid">
              {cart.map((product, index) => (
                <article className="product-card" key={index}>
                  <div className="product-image-container">
                    <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <div className="price-rating">
                      <span className="price">${product.price.toFixed(2)}</span>
                      <span className="rating">⭐ {product.rating?.rate || "N/A"} ({product.rating?.count || 0})</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section><br></br>
        
      
        <section className="total-price-section">
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <button className="back-btn" onClick={() => navigate("/payment")}>Pay Now</button>
        </section>
      </main>

      <footer className="main-footer">
        <div className="container">
          <p>&copy; Urban Alpha</p>
        </div>
      </footer>
    </div>
  );
}

export default AddedToCart;

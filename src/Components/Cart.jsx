import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";

function Cart({ cart = [], setCart }) { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); 
  };

  const goToCart = () => {
    navigate("/added-cart");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="cart-container">
      {loading ? (
        <p>Loading products 🤙...</p>
      ) : (
        <div>
          {/* Header */}
          <header className="main-header">
            <div className="container">
              <h1 className="logo">Urban Alpha</h1>
              <nav className="main-nav">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="#">Products</Link></li>
                  <li><Link to="#">Categories</Link></li>
                  <li><Link to="#">About</Link></li>
                  <li>
                    <span className="login-btn" onClick={goToLogin}>Log-in</span>
                  </li>
                </ul>
              </nav>
              <div className="cart-icon" onClick={goToCart} style={{ cursor: "pointer" }}>
                <span>🛒</span>
                <span className="cart-count">{cart.length}</span> 
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container">
            <section className="product-section">
              <h2>Featured Products</h2><br></br>
              <div className="product-grid">
                {products.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-container">
                      <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                      <button className="wishlist-btn">♥</button>
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{product.title}</h3>
                      <div className="price-rating">
                        <span className="price">${product.price.toFixed(2)}</span>
                        <span className="rating">⭐ {product.rating?.rate || "N/A"} ({product.rating?.count || 0})</span>
                      </div>
                      <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="main-footer">
            <div className="container">
              <p>&copy; Urban Alpha</p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Cart;

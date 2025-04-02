import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMessage(result.message);

      if (result.success) {
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setMessage("Server error. Try again.");
    }
  };

  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMessage(result.message);

      if (result.success) {
        setIsLogin(true);
      }
    } catch (error) {
      setMessage("Error signing up. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{isLogin ? "Login" : "Signup"}</h2>

        {message && <p className="message">{message}</p>}

        {isLogin ? (
          <form className="login-form" onSubmit={handleLogin}>
            <input type="email" name="email" className="login-input" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" className="login-input" placeholder="Password" onChange={handleChange} required />
            <button type="submit" className="login-button">Login</button>
          </form>
        ) : (
          <form className="signup-form" onSubmit={handleSignup}>
            <input type="email" name="email" className="signup-input" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" className="signup-input" placeholder="Password" onChange={handleChange} required />
            <button type="submit" className="signup-button">Signup</button>
          </form>
        )}

        <p className="toggle-text">
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

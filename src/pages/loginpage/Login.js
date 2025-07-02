import React, { useState } from "react";
import './Login.css';
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin123@gmail.com" && password === "admin123") {
      navigate("/home");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
    
      <div className="status">
        <div className="dot"></div>
        Web Pulse
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="forgot-password">Forgot Password?</a>
          <button type="submit">Login</button>
        </form>

        <p className="ptop-margin">Don't have an account?</p>
        <Link to="/register" className="register-btn">Register</Link>
      </div>
    </>
  );
}

export default Login;

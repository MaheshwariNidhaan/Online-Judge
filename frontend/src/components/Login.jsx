import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-body");
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result.data.success);
        if (result.data.success === true) navigate("/about");
      })
      .catch((err) => {
        console.error("Error during login:", err);
      });
  };

  const handleSignupClick = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="login-container">
      <h1 className="website-title">Webcode: Online Judge</h1>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <button
            type="button"
            className="signup-button"
            onClick={handleSignupClick}
          >
            Don't have an account?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

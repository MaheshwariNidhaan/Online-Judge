import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("signup-body");
    return () => {
      document.body.classList.remove("signup-body");
    };
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h1 className="website-title">Webcode : Online Judge</h1>
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
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
          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
        <button onClick={handleLoginClick} className="login-redirect-button">
          Already have an account?
        </button>
      </div>
    </div>
  );
}

export default Signup;

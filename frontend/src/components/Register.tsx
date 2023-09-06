import React, { useState } from "react";
import "./Register.css";
import Loader from './Loader'
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await axios.post('http://localhost:5000/auth/register', {
      name,
      email,
      password,
      cpassword
    })
    console.log(result);
    localStorage.setItem('token', result.data.token)
    navigate('/dashboard')
  }

  return (
    <div id="register" className="main-card">
      <form method="POST" id="register-form">
        <h2>REGISTER</h2>
        <div id="register-name" className="register-item">
          <span>Name: </span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div id="register-email" className="register-item">
          <span>Email: </span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div id="register-password" className="register-item">
          <span>Password: </span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id="register-confirmpassword" className="register-item">
          <span>Confirm Password: </span>
          <input
            type="password"
            name="cpassword"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
        </div>
        <button type="submit" id="register-button" onClick={handleRegister}>Register</button>
      </form>
      <div className="side">
        <span className="reg-text">
          Take control of your finances with <span className="bold" style={{color:"rgba(255, 215, 00)"}}>ExpenseEase</span>
        </span>
        <br />
        <span className="reg-text bold">
          Register now
        </span>
      </div>
    </div>
  );
};

export default Register;

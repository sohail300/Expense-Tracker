import React, { useState, useEffect } from "react";
import "./Login.css";
import Loader from './Loader'
import Lock from '../images/lock-outline.svg'
import baseURL from './config.js'
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const api = axios.create({
    baseURL
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await api.post('/auth/login', {
      email,
      password
    })
    console.log(result);
    localStorage.setItem('token', result.data.token)
    navigate('/dashboard')
  }

  return (
    <div id="login" className="main-card">
      <form method="POST" id="login-form">
        <div id="login-email" className="login-item">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div id="login-password" className="login-item">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" id="login-button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div className="side-login">
        <div className="wrapper">
          <div className="circle">
          <img src={Lock} alt=""/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState,useEffect } from "react";
import "./Login.css";
import { NavLink,useNavigate } from "react-router-dom";

const Login = () => {
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const handleLogin =async (e)=>{
    console.log("Inside Handle Login")
    e.preventDefault();

    const res =await fetch('/login',{
          method : "POST",
          credentials: 'include',
          headers : {
              "Content-Type":"application/json"
          },
          body :JSON.stringify({
              email:email,
              password:password
          })
        })

        const data =await res.json();
        console.log(data)
        console.log(res.status)

        if(!data || res.status === 400){
          console.log("Invalid Registration")
        } else {
          // dispatch({type: "USER",payload:true})
          console.log("Login Successful")
          navigate('/profile');
        }
  }

  return (
    <div id="login" className="main-card">
      <form method="POST" id="login-form">
      <div id="login-email" className="login-item">
        <label>Email: </label>
        <input
          type="email"
          name="email"
          id=""
          value={email}
          onChange={handleEmail}
        />
      </div>
      <div id="login-password" className="login-item">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          id=""
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button type="submit" id="login-button" onClick={handleLogin}>
        Login
      </button>
      </form>
    </div>
  );
};

export default Login;

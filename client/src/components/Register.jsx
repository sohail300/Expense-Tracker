import React, { useState } from "react";
import "./Register.css";
import { NavLink,useNavigate } from "react-router-dom";

const Register = () => {
  const navigate= useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email:"",
    password:"",
    confirmpassword:"" 
  });

  function handleChanges(e) {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.value);
  }

  const handleRegister =async (e)=>{
    e.preventDefault();

    const {name,email,password,confirmpassword} = details;

    const res =await fetch('/register',{

      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      body : JSON.stringify({
        name : name,
        email : email,
        password : password,
        confirmpassword : confirmpassword
      })
    })

    const data =await res.json();
    if(!data || data.status === 422) {
      // window.alert("invalid registraion")
      console.log("Invalid registration")
    } else {
      // window.alert(" registraion successful")
      console.log("registration successful")
      navigate('/login')
    }
  }

  return (
    <div id="register" className="main-card">
    <form method="POST" id="register-form">
    <div id="register-name" className="register-item">
          <span>Name: </span>
          <input
            type="text"
            name="name"
            id=""
            value={details.name}
            onChange={handleChanges}
          />
        </div>
        <div id="register-email" className="register-item">
          <span>Email: </span>
          <input
            type="email"
            name="email"
            id=""
            value={details.email}
            onChange={handleChanges}
          />
        </div>
        <div id="register-password" className="register-item">
          <span>Password: </span>
          <input
            type="password"
            name="password"
            id=""
            value={details.password}
            onChange={handleChanges}
          />
        </div>
        <div id="register-confirmpassword" className="register-item">
          <span>Confirm Password: </span>
          <input
            type="password"
            name="confirmpassword"
            id=""
            value={details.confirmPassword}
            onChange={handleChanges}
          />
        </div>
        <button type="submit" id="register-button" onClick={handleRegister}>Register</button> 
    </form>
    </div>
  );
};

export default Register;

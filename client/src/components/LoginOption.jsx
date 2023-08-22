import React from "react";
import { NavLink } from "react-router-dom";
import "./LoginOption.css";

const LoginOptions = () => {

  return (
    <>
      <div className="loginoptions main-card">
        <div id="email-signin">
          <div id="login-container" className="email-signin-item">
            <p>Already registered?</p>
            <NavLink className="login-option-button" to='/login'>Login</NavLink>
          </div>
          <div id="register-container" className="email-signin-item">
            <p>Not registered yet?</p>
            <NavLink className="login-option-button" to='/register'>Register</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginOptions;

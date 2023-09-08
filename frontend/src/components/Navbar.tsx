import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import baseURL from './config.js'
import axios from "axios";

const Navbar = () => {
  const [name, setName] = useState("user");

  const api = axios.create({
    baseURL
  });

  async function getProfile() {
    const result = await api.get("/auth/getprofile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (result.data.name != null) {
      setName(result.data.name);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <aside className="card glassmorphism">
        <div className="intro">
          <img
            src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
            alt=""
          />
          <p className="name">{name}</p>
        </div>
        <div className="nav-links">
          <NavLink className="link" to="/profile">
            Profile
          </NavLink>
          <NavLink className="link" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="link" to="/transactions">
            Transactions
          </NavLink>
          <NavLink className="link" to="/income">
            Income
          </NavLink>
          <NavLink className="link" to="/expenses">
            Expenses
          </NavLink>
          <NavLink className="link" to="/contact">
            Contact Us
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

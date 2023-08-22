import React,{useEffect,useState} from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const [username,setUsername]=useState('');
  
  const callNavbarPage= async ()=>{
    try {
        const res=await fetch('/navbar',{
          method:"GET",
          headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        });

        const data=await res.json();
        console.log('Displaying Data');
        console.log(data)
        setUsername(data.name)

        if(!res.status === 200){
          const error=new Error(res.error);
          throw error;
        }
    } catch (e){
        console.log(e);
        setUsername('User')
    }
  }

  useEffect(() => {
    callNavbarPage();
  },[])

  return (
    <>
      <aside className="card glassmorphism">
        <div className="intro">
          <img
            src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
            alt="user-image"
          />
          <p className="name">{username}</p>
        </div>
        <div className="nav-links">
          <NavLink className="link" to="/login">
            Login
          </NavLink>
          <NavLink className="link" to="/register">
            Register
          </NavLink>
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
          <NavLink className="link" to="/logout">
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

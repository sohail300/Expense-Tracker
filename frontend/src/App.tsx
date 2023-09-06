import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Register />}></Route>
        <Route exact path="register" element={<Register />}></Route>
        <Route exact path="login" element={<Login />}></Route>
        <Route exact path="profile" element={<Profile />}></Route>
        <Route exact path="dashboard" element={<Dashboard />}></Route>
        <Route exact path="transactions" element={<Transaction />}></Route>
        <Route exact path="income" element={<Income />}></Route>
        <Route exact path="expenses" element={<Expense />}></Route>
        <Route exact path="contact" element={<Contact />}></Route>
        <Route exact path="logout" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;

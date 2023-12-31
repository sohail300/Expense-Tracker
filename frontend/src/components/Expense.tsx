import React, { useState, useEffect } from "react";
import "./Expense.css";
import baseURL from './config.js'
import expensepng from "../images/expensepng.png";
import Login from './Login'
import Loader from './Loader'
import axios from "axios";

const Expense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [signedUp, setSignedUp] = useState(null);

  const api = axios.create({
    baseURL
  });

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleAmount(e) {
    setAmount(e.target.value);
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  async function getData() {
    const result = await api.get('/auth/me', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    setSignedUp(result.data.id)
    setIsLoading(false);
  }

  async function postExpense(e) {
    e.preventDefault();
    const result = await api.post('/api/expense', {
      title,
      amount,
      date,
      description
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    console.log(result)
    setTitle("")
    setAmount("")
    setDate("")
    setDescription("")
    alert("Submitted!")
  }

  useEffect(() => {
    getData();
  }, [])

  if (!signedUp) {
    return (
      <Login />
    )
  } else if(isLoading){
      return (
        <Loader />
      )
    }

  return (
    <>
      <div id="expense-container" className="main-card">
        <form id="expense-form" method="POST">
          <h1>Expense</h1>
            <input
              type="text"
              name="expense-title"
              id="title" className="expense-item"
              value={title} placeholder="Title"
              onChange={handleTitle}
            />
            <input
              type="number"
              name="expense-amount"
              id="amount" className="expense-item"
              value={amount} placeholder="Amount"
              onChange={handleAmount}
            />
            <input
              type="date"
              name="expense-date"
              id="date" className="expense-item"
              value={date} placeholder="Date"
              onChange={handleDate}
            />
            
            <textarea name="expense-description" id="description" className="expense-item" cols={30} rows={5} value={description} placeholder="Description" onChange={handleDescription} />

          <button id="expense-button" onClick={postExpense}>Submit</button>
        </form>
        <div id="image">
          <img src={expensepng} alt="" />
        </div>
      </div>
    </>
  );
}

export default Expense;

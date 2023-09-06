import React, { useState, useEffect } from "react";
import "./Expense.css";
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
    const result = await axios.get('http://localhost:5000/auth/me', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    setSignedUp(result.data.id)
    setIsLoading(false);
  }

  async function postExpense(e) {
    e.preventDefault();
    const result = await axios.post('http://localhost:5000/api/expense', {
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
          <div id="title" className="expense-item">
            <span>Title</span>
            <input
              type="text"
              name="expense-title"
              id=""
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div id="amount" className="expense-item">
            <span>Amount</span>
            <input
              type="number"
              name="expense-amount"
              id=""
              value={amount}
              onChange={handleAmount}
            />
          </div>
          <div id="date" className="expense-item">
            <span>Date</span>
            <input
              type="date"
              name="expense-date"
              id=""
              value={date}
              onChange={handleDate}
            />
          </div>
          <div id="description" className="expense-item">
            <span>Description</span>
            <input
              type="text"
              name="expense-description"
              id=""
              value={description}
              onChange={handleDescription}
            />
          </div>
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
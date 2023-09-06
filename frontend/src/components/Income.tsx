import React, { useState, useEffect } from "react";
import "./Income.css";
import incomepng from "../images/incomepng.png";
import Login from './Login'
import Loader from './Loader'
import axios from "axios";

const Income = () => {
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

  async function postIncome(e) {
    e.preventDefault();
    const result = await axios.post('http://localhost:5000/api/income', {
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
      <div id="income-container" className="main-card">
        <form id="income-form" method="POST">
          <div id="title" className="income-item">
            <span>Title</span>
            <input
              type="text"
              name="income-title"
              id=""
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div id="amount" className="income-item">
            <span>Amount</span>
            <input
              type="number"
              name="income-amount"
              id=""
              value={amount}
              onChange={handleAmount}
            />
          </div>
          <div id="date" className="income-item">
            <span>Date</span>
            <input
              type="date"
              name="income-date"
              id=""
              value={date}
              onChange={handleDate}
            />
          </div>
          <div id="description" className="income-item">
            <span>Description</span>
            <input
              type="text"
              name="income-description"
              id=""
              value={description}
              onChange={handleDescription}
            />
          </div>
          <button id="income-button" onClick={postIncome}>Submit</button>
        </form>
        <div id="image">
          <img src={incomepng} alt="" />
        </div>
      </div>
    </>
  );
}

export default Income;

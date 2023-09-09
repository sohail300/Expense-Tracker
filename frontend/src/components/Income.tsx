import React, { useState, useEffect } from "react";
import "./Income.css";
import incomepng from "../images/incomepng.png";
import Login from './Login'
import Loader from './Loader'
import baseURL from './config.js'
import axios from "axios";

const Income = () => {
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

  async function postIncome(e) {
    e.preventDefault();
    const result = await api.post('/api/income', {
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
      <div id="income-container" className="main-card">
        <form id="income-form" method="POST">
      <h1>Income</h1>
            <input
              type="text"
              name="income-title"
              id="title" className="income-item"
              value={title} placeholder="Title"
              onChange={handleTitle}
            />

            <input
              type="number"
              name="income-amount"
              id="amount" className="income-item"
              value={amount} placeholder="Amount"
              onChange={handleAmount}
            />

            <input
              type="date"
              name="income-date"
              id="date" className="income-item"
              value={date} placeholder="Date"
              onChange={handleDate}
            />
            
            <textarea name="income-description" id="description" className="income-item" cols={30} rows={5} value={description} placeholder="Description" onChange={handleDescription} />

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

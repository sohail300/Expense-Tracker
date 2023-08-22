import React, { useState } from "react";
import "./Expense.css";
import expensepng from "../images/expensepng.png";

const Expense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

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
          <button id="expense-button">Submit</button>
        </form>
        <div id="image">
          <img src={expensepng} alt="" />
        </div>
      </div>
    </>
  );
};

export default Expense;

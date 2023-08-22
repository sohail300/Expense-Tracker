import React, { useState } from "react";
import "./Income.css";
import incomepng from "../images/incomepng.png";

const Income = () => {
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
          <button id="income-button">Submit</button>
        </form>
        <div id="image">
          <img src={incomepng} alt="" />
        </div>
      </div>
    </>
  );
};

export default Income;

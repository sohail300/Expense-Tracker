import React, { useEffect, useState } from "react";
import './Dashboard.css'
import { NavLink, useNavigate } from "react-router-dom";
import PieChart from "./Piechart";
import Login from './Login'
import Loader from './Loader'
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(null);
  const [transactionArray, setTransactionArray] = useState([])
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [profileLoading, setProfileLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    const result = await axios.get('http://localhost:5000/auth/me', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    console.log(signedUp)
    console.log(result.data)
    setSignedUp(result.data.id)
    console.log(signedUp)
    setProfileLoading(false);
  }

  async function getTransactions() {
    const result = await axios.get('http://localhost:5000/api/transactions', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    setTransactionArray(result.data);
    setIsLoading(false)
  }

  async function calculateData() {
    let temp1 = 0;
    transactionArray.map(item => {
      if (item.type === 'income') {
        temp1 = temp1 + item.amount;
      }
    })
    setIncome(temp1);

    let temp2 = 0;
    transactionArray.map(item => {
      if (item.type === 'expense') {
        temp2 = temp2 + item.amount;
      }
    })
    setExpense(temp2);

    setBalance(temp1 - temp2);
  }

  useEffect(() => {
    getData();
    getTransactions();
  }, [])

  useEffect(() => {
    calculateData();
  }, [transactionArray])

  if (!signedUp) {
    return (
      <Login />
    )
  } else if (isLoading) {
    return (
      <Loader />
    )
  }

    return (
      <>
        <div id="dashboard" className="main-card">
        <h1 style={{color:"#fff",marginTop:"-10px",fontSize:"36px"}}>Dashboard</h1>
          <div id="pie-container">
            <div id="pie">
            <PieChart income={income} expense={expense} balance={balance}/>
            </div>
            <div id="recent">
              <span className="recent-heading">Recent History</span>
              {
                transactionArray.map((item, index) => {
                  if (index < 3) {
                    if (item.type === 'income') {
                      return (
                        <div className="recent-item">
                          <span className="title">{item.title}</span>
                          <span className="amount green">{item.amount}</span>
                        </div>
                      )
                    } else {
                      return (
                        <div className="recent-item">
                          <span className="title">{item.title}</span>
                          <span className="amount red">{item.amount}</span>
                        </div>
                      )
                    }
                  } else {
                    return (
                      <></>
                    )
                  }
                })
              }
            </div>
          </div>

          <div id="two-columns">
            <div id="income" className="details">
              <span className="details-title">Total Income</span>
              <span className="details-amount">{income}</span>
            </div>
            <div id="expenses" className="details">
              <span className="details-title">Total Expenses</span>
              <span className="details-amount">{expense}</span>
            </div>
          </div>

          <div id="balance" className="details">
            <span className="details-title">Total Balance</span>
            <span className="details-amount">{balance}</span>
          </div>
        </div>
      </>
    );
  }

  export default Dashboard;

import React, { useEffect, useState } from "react";
import './Transaction.css'
import Login from './Login'
import Loader from './Loader'
import baseURL from './config.js'
import axios from "axios";

const Transaction = () => {
  const [signedUp, setSignedUp] = useState(null);
  const [transactionArray, setTransactionArray] = useState([])
  const [profileLoading, setProfileLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true);

  const api = axios.create({
    baseURL
  });

  async function getData() {
    const result = await api.get('/auth/me', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    setSignedUp(result.data.id)
    setProfileLoading(false);
  }

  async function getTransactions() {
    const result = await api.get('/api/transactions', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    console.log(result.data);
    setTransactionArray(result.data);
    setIsLoading(false)
  }

  useEffect(() => {
    getData();
    getTransactions();
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
        <div id="transaction" className='main-card'>
        <h1 style={{color:"#fff",margin:"2px"}}>Transactions</h1>
          {
            transactionArray.map(item => {
              if (item.type === 'income') {
                return (
                  <div className="transaction-item">
                    <span className="title">{item.title}</span>
                    <span className="amount green">{item.amount}</span>
                  </div>
                )
              } else {
                return (
                  <div className="transaction-item">
                    <span className="title">{item.title}</span>
                    <span className="amount red">{item.amount}</span>
                  </div>
                )
              }
            })
          }
          {/* <div className="transaction-item">
            <span className="title">Rent</span>
            <span className="amount">-50</span>
          </div>
          <div className="transaction-item">
            <span className="title">Freelancing</span>
            <span className="amount">+200</span>
          </div>
          <div className="transaction-item">
            <span className="title">Food</span>
            <span className="amount">-50</span>
          </div>
          <div className="transaction-item">
            <span className="title">Rent</span>
            <span className="amount">-50</span>
          </div>
          <div className="transaction-item">
            <span className="title">Freelancing</span>
            <span className="amount">+200</span>
          </div>
          <div className="transaction-item">
            <span className="title">Food</span>
            <span className="amount">-50</span>
          </div> */}

        </div>
      </>
    )
  }

export default Transaction
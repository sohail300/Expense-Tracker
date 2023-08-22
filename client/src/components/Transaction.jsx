import React from 'react'
import './Transaction.css'

const Transaction = () => {
  return (
    <>
        <div id="transaction" className='main-card'>
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
            </div>
            
        </div>
    </>
  )
}

export default Transaction
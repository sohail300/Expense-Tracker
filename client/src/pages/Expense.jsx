import React from 'react'
import Navbar from '../components/Navbar'
import Expenses from '../components/Expense'
import Footer from '../components/Footer'

const Expense = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <div className='display-flex-horizontal'>
      <Navbar />
      <Expenses />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default Expense
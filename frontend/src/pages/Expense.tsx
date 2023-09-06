import React from 'react'
import Navbar from '../components/Navbar'
import Expenses from '../components/Expense'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'

const Expense = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <Topbar />
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
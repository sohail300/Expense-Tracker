import React from 'react'
import Navbar from '../components/Navbar'
import Transactions from '../components/Transaction'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'

const Transaction = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <Topbar />
    <div className='display-flex-horizontal'>
      <Navbar />
      <Transactions />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default Transaction
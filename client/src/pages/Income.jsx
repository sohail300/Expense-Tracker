import React from 'react'
import Navbar from '../components/Navbar'
import Incomes from '../components/Income'
import Footer from '../components/Footer'

const Income = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <div className='display-flex-horizontal'>
      <Navbar />
      <Incomes />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default Income
import React from 'react'
import Navbar from '../components/Navbar'
import Incomes from '../components/Income'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'

const Income = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <Topbar />
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
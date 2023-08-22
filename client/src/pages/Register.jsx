import React from 'react'
import Navbar from '../components/Navbar'
import Registers from '../components/Register'
import Footer from '../components/Footer'

const Register = () => {

  return (
    <>
    <div className='display-flex-vertical'>
    <div className='display-flex-horizontal'>
      <Navbar />
      <Registers />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default Register
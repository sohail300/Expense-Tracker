import React from 'react'
import Navbar from '../components/Navbar'
import LoginOptions from '../components/LoginOption'
import Footer from '../components/Footer'

const LoginOption = () => {

  return (
    <>
    <div className='display-flex-vertical'>
    <div className='display-flex-horizontal'>
      <Navbar />
      <LoginOptions />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default LoginOption
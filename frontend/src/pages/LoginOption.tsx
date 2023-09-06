import React from 'react'
import Navbar from '../components/Navbar'
import LoginOptions from '../components/LoginOption'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'

const LoginOption = () => {

  return (
    <>
    <div className='display-flex-vertical'>
    <Topbar />
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
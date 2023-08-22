import React from 'react'
import Navbar from '../components/Navbar'
import Logins from '../components/Login'
import Footer from '../components/Footer'

const Login = () => {

  return (
    <>
    <div className='display-flex-vertical'>
    <div className='display-flex-horizontal'>
      <Navbar />
      <Logins />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default Login
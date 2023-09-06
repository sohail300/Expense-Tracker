import React from 'react'
import Navbar from '../components/Navbar'
import Logins from '../components/Login'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'

const Login = () => {

  return (
    <>
    <div className='display-flex-vertical'>
    <Topbar />
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
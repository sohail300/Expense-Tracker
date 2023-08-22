import React from 'react'
import Navbar from '../components/Navbar'
import Contacts from '../components/Contact'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <div className='display-flex-horizontal'>
      <Navbar />
      <Contacts />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default Contact
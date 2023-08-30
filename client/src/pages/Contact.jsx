import React from 'react'
import Navbar from '../components/Navbar'
import Contacts from '../components/Contact'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'

const Contact = () => {
  return (
    <>
      <div className='display-flex-vertical'>
          <Topbar />
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
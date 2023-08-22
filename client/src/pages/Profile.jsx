import React from 'react'
import Navbar from '../components/Navbar'
import Profiles from '../components/Profile'
import Footer from '../components/Footer'

const Profile = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <div className='display-flex-horizontal'>
      <Navbar />
      <Profiles />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default Profile
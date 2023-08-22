import React from 'react'
import Navbar from '../components/Navbar'
import Dashboards from '../components/Dashboard'
import Footer from '../components/Footer'

const Dashboard = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <div className='display-flex-horizontal'>
      <Navbar />
      <Dashboards />
    </div>
      <Footer />
    </div>
    </>
  )
}

export default Dashboard
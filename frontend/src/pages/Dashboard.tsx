import React from 'react'
import Navbar from '../components/Navbar'
import Dashboards from '../components/Dashboard'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'

const Dashboard = () => {
  return (
    <>
    <div className='display-flex-vertical'>
    <Topbar />
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
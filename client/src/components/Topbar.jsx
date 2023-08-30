import React from 'react'
import './Topbar.css'
import { useNavigate } from 'react-router-dom'

const Topbar = () => {
    const navigate=useNavigate();
    return (
        <div className='topbar'>
        <h2>ExpenseEase</h2>
        <div className='reg-btns-div'>
        <button className='reg-btns' onClick={()=>{navigate('/register')}}>Register</button>
        <button className='reg-btns' onClick={()=>{navigate('/login')}}>Login</button>
        </div>
        </div>
        )

    // return (
    //     <div className='topbar'>
    //     <h2>ExpenseEase</h2>
    //     <div className='reg-btns-div'>
    //     <button className='reg-btns' onClick={()=>{navigate('/')}}>Logout</button>
    //     </div>
    //     </div>
    //     )
}

export default Topbar
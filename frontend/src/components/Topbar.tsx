import React, { useEffect } from 'react'
import './Topbar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Topbar = () => {
    const navigate = useNavigate();
    const [signedUp,setSignedUp]=useState(null);
    
    async function getData() {
        const result = await axios.get('http://localhost:5000/auth/me', {
            headers:
            {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        setSignedUp(result.data.id);
    }

    useEffect(() => {
        getData();
    }, [])

    function logout(){
        setSignedUp(null);
        localStorage.setItem('token',null);
        navigate('/login')
    }

    if(signedUp==null){
        return (
            <div className='topbar'>
            <h2 className='glow'>ExpenseEase</h2>
            <div className='reg-btns-div'>
                <button className='reg-btns' onClick={() => { navigate('/register') }}>Register</button>
                <button className='reg-btns' onClick={() => { navigate('/login') }}>Login</button>
            </div>
        </div>
    )
} else {
    return (
            <div className='topbar'>
            <h2>ExpenseEase</h2>
            <div className='reg-btns-div'>
            <button className='reg-btns' onClick={logout}>Logout</button>
            </div>
            </div>
            )
    }
}

export default Topbar
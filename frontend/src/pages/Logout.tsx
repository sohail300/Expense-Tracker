import React,{useEffect} from 'react'
import { NavLink,useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate= useNavigate();

  const callLogoutPage= async ()=>{
    try {
        const res=await fetch('/logout',{
          method:"GET",
          headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        });

        const data=await res.json();
        console.log('Displaying Data');
        console.log(data)

        if(res.status === 200){
          navigate('/login')
        }
    } catch (e){
        console.log(e);
    }
  }

  useEffect(() => {
    callLogoutPage();
  },[])

  return (
    <div>Logout</div>
  )
}

export default Logout
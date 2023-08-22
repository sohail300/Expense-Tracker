import React,{useEffect} from "react";
import './Dashboard.css'
import { NavLink,useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate= useNavigate();

  const callDashboardPage= async ()=>{
    try {
        const res=await fetch('/dashboard',{
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

        if(!res.status === 200){
          const error=new Error(res.error);
          throw error;
        }
    } catch (e){
        console.log(e);
        navigate('/login')
    }
  }

  useEffect(() => {
    callDashboardPage();
  },[])

  return (
    <>
      <div id="dashboard" className="main-card">
        <div id="pie-container">
          <div id="pie">
            <img
              src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
              alt="user-image"
            />
          </div>
          <div id="recent">
            <span>Recent History</span>
            <div className="recent-item">
              <span className="title">Rent</span>
              <span className="amount">-50</span>
            </div>
            <div className="recent-item">
              <span className="title">Freelancing</span>
              <span className="amount">+200</span>
            </div>
            <div className="recent-item">
              <span className="title">Food</span>
              <span className="amount">-50</span>
            </div>
          </div>
        </div>

        <div id="two-columns">
          <div id="income" className="details">
            <span className="details-title">Total Income</span>
            <span className="details-amount">1000</span>
          </div>
          <div id="expenses" className="details">
            <span className="details-title">Total Expenses</span>
            <span className="details-amount">200</span>
          </div>
        </div>

        <div id="balance" className="details">
          <span className="details-title">Total Balance</span>
          <span className="details-amount">800</span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

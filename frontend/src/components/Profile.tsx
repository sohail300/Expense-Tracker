import React, { useState } from "react";
import "./Profile.css";
import profilepng from "../images/profilepng.png";
import { useEffect } from "react";
import Login from './Login'
import Loader from './Loader'
import axios from 'axios'

const Profile = () => {
  const [name, setName] = useState('user');
  const [id, setId] = useState('')
  const [signedUp, setSignedUp] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    const result = await axios.get('http://localhost:5000/auth/me', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    setId(result.data.id)
    setSignedUp(result.data.id)
    setProfileLoading(false);
  }

  async function getProfile() {
    const result = await axios.get('http://localhost:5000/auth/getprofile', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    if (result.data.name != null) {
      setName(result.data.name);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
    getProfile();
  }, [])

  async function setProfile(e) {
    e.preventDefault();
    const result = await axios.put(`http://localhost:5000/auth/profile/${id}`, {
      name
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    console.log(result);
    window.location.reload();
  }

  if (!signedUp) {
    return (
      <Login />
    )
  } else if(isLoading){
      return (
        <Loader />
      )
    }

    return (
    <div id="profile" className="main-card">
      <form id="profile-form" method="post">
        <h1>Profile</h1>
        <div className="name profile-item">
          Name:
          <input type="text" name="" id="" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="photo profile-item">
          {/* <img
            src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
            alt=""
          /> */}
          {/* <input type="file" /> */}
        </div>
        <button id="profile-button" onClick={setProfile}>Update</button>
          <Header />
      </form>
      {/* <div className="side-profile">
      </div> */}
      {/* <div id="image">
        <img src={profilepng} alt="" />
      </div> */}
    </div>
  );
}

const Header = () => {
  return (
    <div className="header">
      {/* Waves Container */}
      <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      {/* Waves end */}
    </div>
  );
};

export default Profile;

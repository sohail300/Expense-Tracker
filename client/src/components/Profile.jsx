import React,{useState} from "react";
import "./Profile.css";
import profilepng from "../images/profilepng.png";

const Profile = () => {
  const [name,setName]=useState('')

  function handleName(e){
    setName(e.target.value);
  }

  return (
    <div id="profile" className="main-card">
      <form id="profile-form" method="post">
        <div className="name profile-item">
          Name:
          <input type="text" name="" id="" value={name} onChange={handleName} />
        </div>

        <div className="photo profile-item">
          <img
            src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
            alt="user-image"
          />
          <input type="file" />
        </div>
          <button className="profile-button">Upload</button>
      </form>
      <div id="image">
        <img src={profilepng} alt="" />
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import "./Contact.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Login from './Login'
import Loader from './Loader'

const Contact = () => {
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(null);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    const result = await axios.get('http://localhost:5000/auth/me', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    setSignedUp(result.data.id)
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

  async function submitContactUs(e) {
    e.preventDefault();
    const result = await axios.post('http://localhost:5000/contact/contact', {
      name, email, message
    }, {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('token')
      }
    })
    console.log(result);
    alert('Message sent!');
    setName('');
    setEmail('');
    setMessage('');
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
      <div id="contact" className="main-card">
        <form id="contact-form" method="POST">
          <div id="name" className="contact-item">
            <span>Name</span>
            <input type="text" name="contact-name" id="" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div id="email" className="contact-item">
            <span>Email</span>
            <input type="email" name="contact-email" id="" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div id="message" className="contact-item">
            <span>Message</span>
            <textarea name="contact-message" id="" cols="26" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
          </div>
          <button id="contact-button" onClick={submitContactUs}>Send</button>
        </form>
        <div className="side-contact">
        <span className="reg-heading-contact">
          Get In Touch
        </span>
        <br />
        <br />
        <span className="reg-text-contact">
          <a href="https://portfolio-sohail60.vercel.app/">https://portfolio-sohail60.vercel.app/</a>
        </span>
        <br />
        <span className="reg-text-contact">
          <a href="">sohailatwork10@gmail.com</a>
        </span>
      </div>
      </div>
    )
  }

export default Contact;

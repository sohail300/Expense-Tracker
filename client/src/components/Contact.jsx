import React,{useState} from "react";
import "./Contact.css";

const Contact = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [message,setMessage]=useState('')

    function handleName(e){
      setName(e.target.value);
    }

    function handleEmail(e){
      setEmail(e.target.value);
    }

    function handleMessage(e){
      setMessage(e.target.value);
    }

  return (
    <>
      <div id="contact" className="main-card">
      <form id="contact-form" method="POST">
        <div id="name" className="contact-item">
          <span>Name</span>
          <input type="text" name="contact-name" id="" value={name} onChange={handleName} />
        </div>
        <div id="email" className="contact-item">
          <span>Email</span>
          <input type="email" name="contact-email" id="" value={email} onChange={handleEmail} />
        </div>
        <div id="message" className="contact-item">
          <span>Message</span>
          <textarea name="contact-message" id="" cols="26" rows="5" value={message} onChange={handleMessage} ></textarea>
        </div>
        <button id="contact-button">Send</button>
      </form>
      </div>
    </>
  );
};

export default Contact;

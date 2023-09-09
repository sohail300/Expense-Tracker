import React, { useState, useEffect } from "react";
import "./Contact.css";
import axios from "axios";
import baseURL from './config.js'
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Loader from "./Loader";

const Contact = () => {
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const api = axios.create({
    baseURL
  });

  async function getData() {
    const result = await api.get("/auth/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setSignedUp(result.data.id);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  async function submitContactUs(e) {
    e.preventDefault();
    const result = await api.post(
      "/contact/contact",
      {
        name,
        email,
        message,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result);
    alert("Message sent!");
    setName("");
    setEmail("");
    setMessage("");
  }

  if (!signedUp) {
    return <Login />;
  } else if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="contact" className="main-card">
      <form id="contact-form" method="POST">
        <h1>Contact Us</h1>
        <input
          type="text"
          name="contact-name"
          id="name"
          className="contact-item"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="contact-email"
          id="name"
          className="contact-item"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="contact-message"
          id="name"
          className="contact-item"
          cols="26"
          rows="5"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button id="contact-button" onClick={submitContactUs}>
          Send
        </button>
      </form>
      <div className="side-contact">
        <span className="reg-heading-contact">Get In Touch</span>
        <br />
        <br />
        <span className="reg-text-contact">
          <a
            href="https://portfolio-sohail60.vercel.app/"
            style={{ color: "#fff" }}
          >
            https://portfolio-sohail60.vercel.app/
          </a>
        </span>
        <br />
        <span className="reg-text-contact">
          <a href="" style={{ color: "#fff" }}>
            sohailatwork10@gmail.com
          </a>
        </span>
      </div>
    </div>
  );
};

export default Contact;

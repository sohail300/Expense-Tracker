import React from "react";
import Navbar from "../components/Navbar";
import Registers from "../components/Register";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

const Register = () => {
  return (
    <>
      <div className="display-flex-vertical">
        <Topbar />
        <div className="display-flex-horizontal">
          <Navbar />
          <Registers />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;

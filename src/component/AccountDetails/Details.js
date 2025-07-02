import React, { useState } from "react";
import "./Details.css";
import Navbar from '../navbar/Navbar';
import { useNavigate, Link } from "react-router-dom";

function AccountDetails() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");

  const handleSave = () => {
    console.log("Saved Info:", {
      fullName,
      email,
      mobileNumber,
    });
  };

  return (
    <>
  <Navbar />
  <div className="wrapper">
  <div className="page-wrapper top-gap">
    <div className="account-container">
      <h2>Account Details.</h2>
      <div className="card">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

          <div className="form-group">
            <label>E-mail Address</label> 
              <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

        <div className="form-group">
          <label>Mobile No.</label>
          <input
            type="number"
            placeholder="Enter your mobile"
            value={mobileNumber}
            onChange={(e) => setmobileNumber(e.target.value)}
          />
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save changes
        </button>
      </div>
    </div>
  </div>
  </div>
</>

  );
}

export default AccountDetails;

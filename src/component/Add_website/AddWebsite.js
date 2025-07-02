import React, { useState, useRef, useEffect } from 'react';
import './AddWebsite.css';
import Navbar from '../navbar/Navbar'; 
import { Link } from "react-router-dom";

function AddWebsite() {
  const [url, setUrl] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [email3, setEmail3] = useState('');
  const [name, setName] = useState('');
  const [interval, setInterval] = useState(2); // default index for 5min

  const intervalLabels = [
    "1 minute", "5 minutes","30 minutes",
    "1 hour", "12 hours", "24 hours"
  ];
  const shortLabels = ["1m", "5m", "30m", "1h", "12h", "24h"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      url,
      name,
      email1,
      email2,
      email3,
      interval: intervalLabels[interval],
    };
    console.log("Form Data Submitted:", data);
  };

  return (
    <>
      <Navbar />
      
      <div className="wrapper">
      <div className="dashboard top-gap">
      <main className="main-content">
      <form className="addweb-form" onSubmit={handleSubmit}>
        <h2>Add Websites</h2>
        <div className="card">
          
          <div className="form-group">
            <label>Website Name:</label>
            <input
              type="text"
              placeholder="Name of website"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Website URL:</label>
            <input
              type="url"
              placeholder="https://"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Notify me in Email:</label>
            <input
              type="email"
              placeholder="Enter your email 1"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email 2"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email 3"
              value={email3}
              onChange={(e) => setEmail3(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="monitor-title">Website Monitor Interval</label>
            <div className="monitor-desc">
              Your websites will be checked every <b>{intervalLabels[interval]}</b>. We recommend to use at least 1-minute checks.
            </div>

            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="5"
                value={interval}
                className="slider"
                onChange={(e) => setInterval(parseInt(e.target.value))}
              />
            </div>

            <div className="labels">
              {shortLabels.map((label, idx) => (
                <span key={idx}>{label}</span>
              ))}
            </div>
          </div>

         <button
            type="submit"
              className="create-btn"
              disabled={
              !name.trim() ||
              !url.trim() ||
              (!email1.trim() && !email2.trim() && !email3.trim())
            }
            >
            <Link to="/listing" className='add-btn'>Create</Link>
          </button>

          <button type="button" className="cancel-btn"><Link to="/listing" className='add-btn'>Cancel</Link></button>
  
        </div>
      </form>
      </main>
      </div>
      </div>
    </>
  );
}

export default AddWebsite;

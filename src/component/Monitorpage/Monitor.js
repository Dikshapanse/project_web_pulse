import React, { useState } from 'react';
import './Monitor.css';
import Navbar from '../navbar/Navbar'; 
import { useNavigate, Link } from "react-router-dom";

function MonitorForm() {      
  const [url, setUrl] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [email3, setEmail3] = useState('');
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('5min');
  
    const handleSubmit = (e) => {
    e.preventDefault();   

    const data = {
      url,
      name,
      email1,
      email2,
      email3,
      interval,
    };
  };

  return (
    <>
    <Navbar />
      <div className="main-content">       
      </div>
    <form className="monitor-form" onSubmit={handleSubmit}>
      <h2>Add Websites</h2>
      <div className="card">
        <label>Website Name:</label>
        <input
          type="text"
          placeholder="Name of website"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label> Website URL:</label>
        <input
          type="url"
          placeholder="https://"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <label> Notify me in email:</label>
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
        placeholder="Enter your email 1"
        value={email3}
        onChange={(e) => setEmail3(e.target.value)}
        required
      />

      <label>Monitor Interval:</label>
      <select value={interval} onChange={(e) => setInterval(e.target.value)}>
        <option value="30s" disabled>30s (Paid)</option>
        <option value="1min" disabled>1min (Paid)</option>
        <option value="5min">5min</option>
        <option value="30min">30min</option>
        <option value="1h">1h</option>
        <option value="12h">12h</option>
        <option value="24h">24h</option>
      </select>

      <button type="submit">Create </button>
      <button type="submit">Cancel </button>
      </div>
    </form>
    </>
  );
}

export default MonitorForm;

import React from 'react';
import Navbar from '../navbar/Navbar';
import { Link } from "react-router-dom";
import './WebDetails.css';

function WebDetail() {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="dashboard-container top-gap">

            <div className="website-header">
                <div className="website-title">
                    <span className="green-dot">🟢</span>
                    <h2>YouTube</h2>
                    <a className='atag' href="https://www.youtube.com/" target="_blank" rel="noreferrer">www.youtube.com/</a>
                </div>
                <div className="website-actions">
                    <button>Pause</button>
                    <button>Edit</button>
                </div>
            </div>

            <div className="status-info">
                <div className="status-card">
                    <h4 className='inpadding'>Current Status</h4>
                    <p className="green inpadding">Up</p>
                    <span className='inpadding'>Currently up for 0h 8m 26s</span>
                </div>
                <div className="status-card">
                    <h4 className='inpadding'>Last Check</h4>
                    <p className='inpadding'>Coming soon</p>
                    <span className='inpadding'>Checked every 5 minutes</span>
                </div>
            </div>

            <div className="uptime-stats">
                <div className="uptime-card">
                    <h4>Last 24 hours</h4>
                    <div className="bar full"></div>
                    <p>0 incidents, 0m down</p>
                </div>
                <div className="uptime-card">
                    <h4>Last 7 days</h4>
                    <p className="green inpadding">100%</p>
                </div>
                <div className="uptime-card">
                    <h4>Last 30 days</h4>
                    <p className="green inpadding">100%</p>
                </div>
            </div>

            <div className="response-time">
                <div className="header">
                    <h4>Response Time</h4>
                </div>
                <div className="graph">📈 Graph placeholder (replace with chart if needed)</div>
                <div className="stats">
                    <p><strong>Average:</strong> 221 ms</p>
                    <p><strong>Minimum:</strong> 221 ms</p>
                    <p><strong>Maximum:</strong> 221 ms</p>
                </div>
            </div>
        </div>
       </div>
    </>
  );
}

export default WebDetail;

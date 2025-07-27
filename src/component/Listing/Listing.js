import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../navbar/Navbar';
import { Link } from "react-router-dom";
import './Listing.css';

const monitorData = [
  { id: 1, name: 'YouTube', url: 'www.youtube.com/', status: 'Up 4 min, 20 sec', uptime: '100%', isUp: true },
  { id: 2, name: 'YouTube', url: 'www.youtube.com/', status: 'Preparing... 27 sec', uptime: '0%', isUp: false },
  { id: 3, name: 'Google', url: 'www.google.com/', status: 'Preparing... 47 sec', uptime: '0%', isUp: false },
  { id: 4, name: 'Facebook', url: 'www.facebook.com/', status: 'Up 1 min, 55 sec', uptime: '100%', isUp: true },
  { id: 5, name: 'Facebook', url: 'www.facebook.com/', status: 'Preparing... 30 sec', uptime: '0%', isUp: false },
  { id: 6, name: 'Google', url: 'www.google.com/', status: 'Up 4 min, 17 sec', uptime: '100%', isUp: true },
  { id: 7, name: 'Telegram', url: 'www.telegram.org/', status: 'Up 3 min, 21 sec', uptime: '100%', isUp: true },
];

function Listing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null); 

  const toggleMenu = (id) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  // useEffect to close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredMonitors = monitorData.filter((monitor) =>
    monitor.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="dashboard top-gap">
          <main className="main-content">
            <header className="dashboard-header">
              <h1>Website Listing</h1>
              <div className="controls-with-status">
                <div className="controls">
                  <input
                    type="text"
                    placeholder="Search by URL, Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select className="filter-select">
                    <option value="">All</option>
                    <option value="up">Up</option>
                    <option value="down">Down</option>
                  </select>
                  <Link to="/monitor" className="add-button">+ Add Website</Link>
                </div>
                <div className="status-widget">
                  <div className="status-header">
                    <div className="status-circle">⬆</div>
                    <h3>Current Status</h3>
                  </div>
                  <p>2 Up, 0 Down, 0 Paused</p>
                </div>
              </div>
            </header>

            <section className="monitor-list">
              {filteredMonitors.map((monitor) => (
                <div className="monitor-card" key={monitor.id}>
                  <div className={`status-dot ${monitor.isUp ? 'up' : 'down'}`}></div>
                  <div className="monitor-info">
                    <div className="name-url-line">
                      <strong>{monitor.name}</strong>
                      <span className="url-text-inline">{monitor.url}</span>
                    </div>
                    <p>{monitor.status}</p>
                  </div>
                  <div className='time-set'>
                    <span>5 min</span>
                  </div>
                  <div className="monitor-meta">
                    <div className="uptime-bar">
                      <div className="uptime-fill"
                        style={{
                          width: monitor.uptime,
                          backgroundColor: monitor.isUp ? '#00ff88' : 'red'
                        }}
                      ></div>
                    </div>
                    <span>{monitor.uptime}</span>
                  </div>

                  <div className="menu-container" ref={menuRef}>
                    <button className="menu-button" onClick={() => toggleMenu(monitor.id)}>
                      &#8942;
                    </button>
                    {openMenuId === monitor.id && (
                      <div className="menu-dropdown">
                        <div className="menu-item">Pause</div>
                        <div className="menu-item">Edit</div>
                        <div className="menu-item">Delete</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Listing;

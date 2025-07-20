import React from 'react';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const WebsiteCard = ({ site }) => {
  return (
    <div className="website-card">
      <h2 className="website-title">{site.name}</h2>
      <p className="website-url">{site.url}</p>
      <div className="website-details">
        <p>Status: <span className="status">{site.status}</span></p>
        <p>Last Check: {site.lastCheck}</p>
        <p>Uptime 24h: {site.uptime['24h']}</p>
        <p>Uptime 7d: {site.uptime['7d']}</p>
        <p>Uptime 30d: {site.uptime['30d']}</p>
        <p>Response Time: <span className="response-time">{site.responseTime}</span></p>
      </div>
    </div>
  );
};

const ResponseChart = () => {
  const data = [
    { time: '12:00', response: 220 },
    { time: '12:05', response: 215 },
    { time: '12:10', response: 210 },
    { time: '12:15', response: 221 },
    { time: '12:20', response: 218 },
  ];

  return (
    <div className="chart-container">
      <h2 className="chart-title">Response Time (Last Hour)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="response" stroke="#38bdf8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();  

  const websites = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com',
      status: 'Up',
      lastCheck: '1 min ago',
      uptime: { '24h': '100%', '7d': '100%', '30d': '100%' },
      responseTime: '221 ms',
    },
    {
      name: 'Google',
      url: 'https://www.google.com',
      status: 'Up',
      lastCheck: '2 min ago',
      uptime: { '24h': '100%', '7d': '100%', '30d': '100%' },
      responseTime: '210 ms',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com',
      status: 'Up',
      lastCheck: '2 min ago',
      uptime: { '24h': '100%', '7d': '100%', '30d': '100%' },
      responseTime: '213 ms',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="dashboard-container top-gap">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-heading">Web Pulse Dashboard</h1>
                        <button className="add-website-btn" onClick={() => navigate('/monitor')}>+ Add Website</button>
                </div>
                <div className="card-grid">
                    {websites.map((site, idx) => (
                        <WebsiteCard key={idx} site={site} />
                    ))}
                    </div>
                    <ResponseChart />
                </div>
            </div>
      </div>
      
    </>
  );
};

export default Dashboard;

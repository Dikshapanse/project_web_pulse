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

const ResponseChart = () => {
  const data = [
    { time: '12:00', response: 220 },
    { time: '12:05', response: 215 },
    { time: '12:10', response: 210 },
    { time: '12:15', response: 221 },
    { time: '12:20', response: 218 },
    { time: '12:25', response: 238 },
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
    {
      name: 'Telegram',
      url: 'https://www.telegram.org',
      status: 'Down',
      lastCheck: '2 min ago',
      uptime: { '24h': '100%', '7d': '100%', '30d': '100%' },
      responseTime: '224 ms',
    },
  ];

  const totalWebsites = websites.length;
  const totalUp = websites.filter(site => site.status === 'Up').length;
  const totalDown = totalWebsites - totalUp;

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="dashboard-container top-gap">
          <div className="dashboard-header">
            <h1 className="dashboard-heading">Dashboard</h1>
          </div>

          <div className="summary-cards">
            <div className="summary-card total">
              <h3>Total Websites</h3>
              <p>{totalWebsites}</p>
            </div>
            <div className="summary-card up">
              <h3>Up</h3>
              <p>{totalUp}</p>
            </div>
            <div className="summary-card down">
              <h3>Down</h3>
              <p>{totalDown}</p>
            </div>
          </div>

          <ResponseChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

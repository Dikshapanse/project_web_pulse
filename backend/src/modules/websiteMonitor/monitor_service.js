const cron = require('node-cron');
const axios = require('axios');
const pool = require('../../config/db');

const checkWebsites = async () => {
    console.log('Running website status check...');
    try {
        // Fetch websites that are NOT paused and are due for a check
        // For simplicity, we check all non-paused websites every minute 
        // OR we can check websites where (now - last_check_time) >= interval_minutes
        const [websites] = await pool.query(
            'SELECT * FROM websites WHERE is_paused = FALSE'
        );

        for (const website of websites) {
            const now = new Date();
            const lastCheck = website.last_check_time ? new Date(website.last_check_time) : new Date(0);
            const intervalMs = (website.interval_minutes || 5) * 60 * 1000;

            if (now - lastCheck >= intervalMs) {
                await monitorWebsite(website);
            }
        }
    } catch (error) {
        console.error('Error in checkWebsites cron job:', error);
    }
};

const monitorWebsite = async (website) => {
    const startTime = Date.now();
    let status = 'down';
    let httpCode = null;
    let responseTime = null;

    try {
        const response = await axios.get(website.url, { 
            timeout: 10000, 
            validateStatus: () => true // Accept any status code to record it
        });
        
        responseTime = Date.now() - startTime;
        httpCode = response.status;
        
        if (httpCode >= 200 && httpCode < 300) {
            status = 'up';
        } else {
            status = 'down';
        }
    } catch (error) {
        responseTime = Date.now() - startTime;
        status = 'down';
        if (error.response) {
            httpCode = error.response.status;
        } else {
            // No response (timeout, DNS error, etc.)
            httpCode = null;
        }
    }

    try {
        // Update website record
        await pool.query(
            'UPDATE websites SET last_status = ?, last_http_code = ?, last_response_time = ?, last_check_time = NOW() WHERE id = ?',
            [status, httpCode, responseTime, website.id]
        );

        // Record the check in logs
        await pool.query(
            'INSERT INTO check_logs (website_id, status, http_code, response_time) VALUES (?, ?, ?, ?)',
            [website.id, status, httpCode, responseTime]
        );

        // Calculate and update uptime percentage
        const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM check_logs WHERE website_id = ?', [website.id]);
        const [[{ upCount }]] = await pool.query('SELECT COUNT(*) as upCount FROM check_logs WHERE website_id = ? AND status = "up"', [website.id]);
        
        const uptimePct = (upCount / total) * 100;
        await pool.query('UPDATE websites SET uptime_pct = ? WHERE id = ?', [uptimePct, website.id]);

        console.log(`Checked ${website.url}: ${status} (${httpCode}) - ${responseTime}ms - Uptime: ${uptimePct.toFixed(2)}%`);
        
    } catch (dbError) {
        console.error(`Error updating website ${website.id} status in DB:`, dbError);
    }
};

// Run every minute
const initMonitor = () => {
    cron.schedule('* * * * *', checkWebsites);
    console.log('Website monitoring service initialized');
    // Run an initial check immediately
    checkWebsites();
};

module.exports = { initMonitor };

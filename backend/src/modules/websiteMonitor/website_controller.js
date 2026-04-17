const pool = require('../../config/db');

// Add a new website for monitoring
exports.addWebsite = async (req, res) => {
    try {
        const { name, url, interval_minutes, email1, email2, email3 } = req.body;
        const user_id = req.user.id;

        if (!name || !url || !email1) {
            return res.status(400).json({ message: 'Name, URL, and at least one email are required' });
        }

        const [result] = await pool.query(
            'INSERT INTO websites (user_id, name, url, interval_minutes, email1, email2, email3) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_id, name, url, interval_minutes || 5, email1, email2, email3]
        );

        res.status(201).json({ message: 'Website added successfully', id: result.insertId });
    } catch (error) {
        console.error('Add Website Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all websites for the current user
exports.getUserWebsites = async (req, res) => {
    try {
        const user_id = req.user.id;

        const [websites] = await pool.query(
            'SELECT * FROM websites WHERE user_id = ? ORDER BY created_at DESC',
            [user_id]
        );

        res.json(websites);
    } catch (error) {
        console.error('Get Websites Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Pause/Resume website monitoring
exports.togglePause = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const [websites] = await pool.query('SELECT is_paused FROM websites WHERE id = ? AND user_id = ?', [id, user_id]);
        
        if (websites.length === 0) {
            return res.status(404).json({ message: 'Website not found' });
        }

        const newPauseStatus = !websites[0].is_paused;
        await pool.query('UPDATE websites SET is_paused = ? WHERE id = ?', [newPauseStatus, id]);

        res.json({ message: `Monitoring ${newPauseStatus ? 'paused' : 'resumed'}`, is_paused: newPauseStatus });
    } catch (error) {
        console.error('Toggle Pause Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a website
exports.deleteWebsite = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const [result] = await pool.query('DELETE FROM websites WHERE id = ? AND user_id = ?', [id, user_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Website not found or unauthorized' });
        }

        res.json({ message: 'Website deleted successfully' });
    } catch (error) {
        console.error('Delete Website Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Update a website's details
exports.updateWebsite = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, url, interval_minutes, email1, email2, email3 } = req.body;
        const user_id = req.user.id;

        const [result] = await pool.query(
            'UPDATE websites SET name = ?, url = ?, interval_minutes = ?, email1 = ?, email2 = ?, email3 = ? WHERE id = ? AND user_id = ?',
            [name, url, interval_minutes, email1, email2, email3, id, user_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Website not found or unauthorized' });
        }

        res.json({ message: 'Website updated successfully' });
    } catch (error) {
        console.error('Update Website Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single website by ID
exports.getWebsiteById = async (req, res) => {
    try {

        const { id } = req.params;
        const user_id = req.user.id;

        const [websites] = await pool.query(
            'SELECT * FROM websites WHERE id = ? AND user_id = ?',
            [id, user_id]
        );

        if (websites.length === 0) {
            return res.status(404).json({ message: 'Website not found' });
        }

        res.json(websites[0]);
    } catch (error) {
        console.error('getWebsiteById Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get recent activity (logs) for the current user's websites
exports.getActivity = async (req, res) => {
    try {
        const user_id = req.user.id;

        const [logs] = await pool.query(
            `SELECT l.*, w.name as website_name 
             FROM check_logs l 
             JOIN websites w ON l.website_id = w.id 
             WHERE w.user_id = ? 
             ORDER BY l.check_time DESC 
             LIMIT 10`,
            [user_id]
        );

        res.json(logs);
    } catch (error) {
        console.error('Get Activity Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: Full name
 *         email:
 *           type: string
 *           format: email
 *           description: Unique email address
 *         password:
 *           type: string
 *           description: User password
 *         role_id:
 *           type: integer
 *           description: Role ID (1=user, 2=admin)
 *         dial_code:
 *           type: string
 *           description: Country dial code
 */

// Registration API
/**
 * @swagger
 * /api/userauth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
exports.register = async (req, res) => {
    try {
        const { name, email, password, dial_code, mobile } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Get default user role
        const [roles] = await pool.query('SELECT role_id FROM role WHERE role_name = "user"');
        const role_id = roles.length > 0 ? roles[0].role_id : 1;

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password_hash, role_id, dial_code, mobile) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, password_hash, role_id, dial_code || null, mobile || null]
        );

        res.status(201).json({ 
            message: 'User registered successfully', 
            userId: result.insertId 
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login API
/**
 * @swagger
 * /api/userauth/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const [users] = await pool.query('SELECT u.*, r.role_name FROM users u JOIN role r ON u.role_id = r.role_id WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_key_123';
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role_name },
            jwtSecret,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role_name
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout API
/**
 * @swagger
 * /api/userauth/logout:
 *   post:
 *     summary: User Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
exports.logout = (req, res) => {
    // For JWT, server-side logout is mostly relevant only for refreshing logic or token blacklisting.
    // For simplicity, we celebrate the client side to clear the token.
    res.json({ message: 'Logged out successfully. Please clear your token on client side.' });
};

// Profile Update API
/**
 * @swagger
 * /api/userauth/profile:
 *   put:
 *     summary: Update User Profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dial_code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
exports.profileUpdate = async (req, res) => {
    try {
        const { name, dial_code, mobile } = req.body;
        const userId = req.user.id; // From authMiddleware
        console.log("Profile update request body:", req.body, "userId:", userId);

        if (!name && !dial_code && !mobile) {
            return res.status(400).json({ message: 'Please provide name, dial_code, or mobile to update' });
        }

        let query = 'UPDATE users SET ';
        const params = [];
        if (name) {
            query += 'name = ?, ';
            params.push(name);
        }
        if (dial_code) {
            query += 'dial_code = ?, ';
            params.push(dial_code);
        }
        if (mobile !== undefined) {
            query += 'mobile = ?, ';
            params.push(mobile);
        }
        query = query.slice(0, -2); // Remove trailing comma
        query += ' WHERE id = ?';
        params.push(userId);
        
        console.log("Executing Update Query:", query);
        console.log("With params:", params);

        const [updateResult] = await pool.query(query, params);
        console.log("Update result:", updateResult);

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile Update Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User Profile API

/**
 * @swagger
 * /api/userauth/profile:
 *   get:
 *     summary: Get User Profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 */
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Fetching profile for user ID:", userId);
        const [users] = await pool.query('SELECT id, name, email, dial_code, mobile, role_id FROM users WHERE id = ?', [userId]);
        
        if (users.length === 0) {
            console.log("Profile not found for user ID:", userId);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("Profile found:", users[0]);


        res.json(users[0]);
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



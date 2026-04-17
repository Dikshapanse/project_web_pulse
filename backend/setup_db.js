const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  let connection;
  try {
    // Connect to MySQL server
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '' // Default XAMPP password
    });

    console.log('Connected to MySQL.');

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS web_pulse');
    console.log('Database `web_pulse` checked/created.');

    // Switch to database
    await connection.query('USE web_pulse');

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table `users` checked/created.');

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Database setup failed:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

setupDatabase();

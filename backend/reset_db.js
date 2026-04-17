const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function resetDatabase() {
    console.log("Starting full database reset...");
    let connection;

    try {
        // Connect WITHOUT database to drop and create it
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root', // Make sure your XAMPP user is root
            password: '', // Make sure your XAMPP password is empty
            multipleStatements: true
        });

        console.log('Connected to MySQL server.');

        try {
            console.log('Attempting to drop existing database `web_pulse`...');
            await connection.query('DROP DATABASE IF EXISTS web_pulse');
            console.log('Successfully dropped `web_pulse` (if it existed).');
        } catch (dropErr) {
            console.error('\nERROR: Failed to drop the database. This usually means the data files are too corrupted (e.g., Table does not exist in engine).');
            console.error('ACTION REQUIRED: Please go to C:\\xampp\\mysql\\data and MANUALLY DELETE the `web_pulse` folder, then run this script again.\n');
            throw dropErr;
        }

        // Create database
        await connection.query('CREATE DATABASE web_pulse');
        console.log('Database `web_pulse` created successfully.');

        // Use the database
        await connection.query('USE web_pulse');

        // Create migration_meta
        await connection.query(`
            CREATE TABLE IF NOT EXISTS migration_meta (
                id INT AUTO_INCREMENT PRIMARY KEY,
                migration_name VARCHAR(255) NOT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Table `migration_meta` created.');

        // Create role
        await connection.query(`
            CREATE TABLE IF NOT EXISTS role (
                role_id INT AUTO_INCREMENT PRIMARY KEY,
                role_name VARCHAR(255) NOT NULL UNIQUE
            );
        `);
        await connection.query(`INSERT IGNORE INTO role (role_name) VALUES ('user'), ('admin');`);
        console.log('Table `role` created with default records.');

        // Create users
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role_id INT DEFAULT NULL,
                dial_code VARCHAR(10) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (role_id) REFERENCES role(role_id)
            );
        `);
        console.log('Table `users` created.');

        // Create websites
        await connection.query(`
            CREATE TABLE IF NOT EXISTS websites (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                url VARCHAR(2048) NOT NULL,
                interval_minutes INT DEFAULT 5,
                is_paused BOOLEAN DEFAULT FALSE,
                last_status ENUM('up', 'down', 'unknown') DEFAULT 'unknown',
                last_http_code INT DEFAULT NULL,
                last_response_time INT DEFAULT NULL,
                last_check_time DATETIME DEFAULT NULL,
                uptime_pct FLOAT DEFAULT 100.0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
        console.log('Table `websites` created.');

        // Mark migrations as applied
        await connection.query(`
            INSERT INTO migration_meta (migration_name) VALUES 
            ('001_create_migration_meta_table.sql'),
            ('002_create_role_table.sql'),
            ('003_modify_users_table.sql'),
            ('004_create_websites_table.sql');
        `);

        console.log('\n✅ Full database reset completed successfully! You can now start using the app.');

    } catch (err) {
        console.error('\n❌ An error occurred during database reset:', err.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log('MySQL connection closed.');
        }
    }
}

resetDatabase();

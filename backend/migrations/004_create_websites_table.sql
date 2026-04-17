-- Migration: 004_create_websites_table
-- Description: Create table for storing website monitoring data

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


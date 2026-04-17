-- Migration: 005_create_check_logs_table
-- Description: Create table for storing individual check results

CREATE TABLE IF NOT EXISTS check_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  website_id INT NOT NULL,
  status ENUM('up', 'down') NOT NULL,
  http_code INT,
  response_time INT,
  check_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE
);

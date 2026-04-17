-- Migration: 001_create_role_table
-- Description: Create roles table and insert default roles

CREATE TABLE IF NOT EXISTS role (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(255) NOT NULL UNIQUE
);

-- Insert default roles
INSERT IGNORE INTO role (role_name) VALUES ('user'), ('admin');

-- Migration: 002_create_migration_meta_table
-- Description: Create table to track applied migrations

CREATE TABLE IF NOT EXISTS migration_meta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  migration_name VARCHAR(255) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

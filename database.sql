CREATE DATABASE attendance_tracker;

USE attendance_tracker;

CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  present BOOLEAN NOT NULL
);

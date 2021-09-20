DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INT Primary Key AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP 
  
);
CREATE TABLE role (
  id INT Primary Key AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department INT,
  FOREIGN KEY (department) REFERENCES department(id) ON DELETE SET NULL,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP 
 );

CREATE TABLE employee (
  id INT Primary Key AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role INT,
  FOREIGN KEY (role) REFERENCES role(id) 
  ON DELETE SET NULL,
  manager_id INT,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) 
  ON DELETE SET NULL,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 
-- For creating organization table
CREATE DATABASE CMS;

USE CMS;

CREATE TABLE user (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL,
    city VARCHAR(50),
    phone VARCHAR(15)
);

CREATE TABLE organizations (
    org_id SERIAL PRIMARY KEY,
    org_name VARCHAR(255) NOT NULL,
    org_email VARCHAR(255) NOT NULL UNIQUE,
    org_contact VARCHAR(15) NOT NULL,
    org_headOffice TEXT NOT NULL,
    org_password TEXT NOT NULL,
    org_pincode VARCHAR(10) NOT NULL,
    org_manager_name VARCHAR(255) NOT NULL,
    manager_email VARCHAR(255) NOT NULL,
    manager_contact VARCHAR(15) NOT NULL
);
  
CREATE TABLE delivery_staff ( 
	staff_id VARCHAR(50) NOT NULL PRIMARY KEY,
    org_name VARCHAR(255) NOT NULL,      
    staff_name VARCHAR(100) NOT NULL,     
    staff_city VARCHAR(100) NOT NULL,     
    staff_contact VARCHAR(15) NOT NULL,   
    staff_email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE branches (
    branch_id VARCHAR(50) PRIMARY KEY,
    org_name VARCHAR(255) NOT NULL,
    branch_city VARCHAR(100) NOT NULL,
    branch_state VARCHAR(100) NOT NULL,
    branch_email VARCHAR(100) NOT NULL,
    branch_contact VARCHAR(10) NOT NULL
);

CREATE TABLE services (
    service_id VARCHAR(50) PRIMARY KEY,
    org_name VARCHAR(255) NOT NULL,
    service_name VARCHAR(255) NOT NULL
);

CREATE TABLE warehouses (
    warehouse_id VARCHAR(50) PRIMARY KEY,
    org_name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL
);

CREATE TABLE parcels (
    parcel_id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    username VARCHAR(255),
    org_name VARCHAR(255) NOT NULL,
    parcel_qty INT NOT NULL,
    parcel_cost DECIMAL(10, 2) NOT NULL,
    parcel_description TEXT NOT NULL,
    warehouse_id VARCHAR(255) NOT NULL,
    delivery_staff VARCHAR(255) NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(warehouse_id),
    FOREIGN KEY (delivery_staff) REFERENCES delivery_staff(staff_id)
);

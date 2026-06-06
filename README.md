# Smart Electronics Shop

## Project Information

**Student Name:** Nassour Nourene Adam
**Registration Number:** 23921/2024
**Course Code:** EWA408510 – E-Commerce and Web Application
**Academic Year:** 2025–2026

---

## Project Overview

Smart Electronics Shop is a modern e-commerce web application developed to allow customers to browse electronic products, add items to a shopping cart, place orders online, and communicate with the business. The project was developed as part of the E-Commerce and Web Application Final Examination Project.

The platform provides a user-friendly shopping experience through a responsive web interface and demonstrates practical implementation of web development, deployment, containerization, and continuous integration technologies.

---

## Problem Statement

Many local businesses still depend entirely on physical stores to sell products. This limits their customer reach and creates challenges for customers who want to browse products and place orders remotely.

Smart Electronics Shop addresses this problem by providing an online platform where customers can:

* Browse products online
* Search and filter products
* Add products to a shopping cart
* Complete the checkout process
* Contact the business easily

---

## Objectives

### General Objective

To develop a modern e-commerce web application for selling electronic products online.

### Specific Objectives

* Display electronic products online
* Implement shopping cart functionality
* Enable online checkout
* Store product and order information
* Deploy the application online
* Implement CI/CD using GitHub Actions
* Containerize the application using Docker

---

## Features

### Home Page

Provides navigation and introduction to the online store.

### Product Management

Displays products with images, prices, descriptions, and categories.

### Shopping Cart

Allows customers to add, remove, and update products.

### Checkout

Collects customer details and processes orders.

### Order Confirmation

Confirms successful order placement.

### About Us

Provides information about the company.

### Contact Us

Provides communication channels for customers.

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* SQLite

### Version Control

* Git
* GitHub

### CI/CD

* GitHub Actions

### Containerization

* Docker
* Docker Compose

### Deployment

* Render

---

## System Architecture

The application follows a client-server architecture.

### Frontend

The frontend consists of responsive HTML, CSS, and JavaScript pages that interact with customers.

### Backend

The backend uses Node.js and Express.js to provide APIs for product management and order processing.

### Database

SQLite stores products and order information.

### Deployment

The application is deployed on Render and connected to GitHub for automatic updates.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/nassournoureneadamtodje-boop/smart-electronics-shop.git
```

### Navigate to Project

```bash
cd smart-electronics-shop
```

### Install Dependencies

```bash
npm install
```

### Start Application

```bash
npm start
```

### Open Browser

```text
http://localhost:5000
```

---

## Docker Usage

Build Docker Image:

```bash
docker build -t smart-electronics-shop .
```

Run Container:

```bash
docker run -p 5000:5000 smart-electronics-shop
```

---

## CI/CD

GitHub Actions was configured to automate Continuous Integration.

The workflow automatically:

* Installs dependencies
* Validates the application
* Runs checks on every push to GitHub

---

## GitHub Repository

Repository Link:

https://github.com/nassournoureneadamtodje-boop/smart-electronics-shop

---

## Live Deployment

Application URL:

https://smart-electronics-shop.onrender.com

---

## Challenges Encountered

During development several challenges were encountered:

* Git configuration issues
* GitHub authentication
* Deployment configuration
* API integration after deployment
* Docker configuration
* CI/CD workflow setup

All challenges were resolved through testing and debugging.

---

## Future Improvements

* Mobile Money Integration
* Stripe/PayPal Payment Gateway
* User Authentication
* Product Reviews and Ratings
* Admin Dashboard
* Analytics Dashboard
* AI Product Recommendations

---

## Conclusion

The Smart Electronics Shop project successfully demonstrates the development of a professional e-commerce platform using modern web technologies. The project fulfills all requirements including GitHub integration, deployment, CI/CD implementation, and Docker containerization.

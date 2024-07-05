---

# Job Portal Application

## Overview

This project is a comprehensive job portal application built with Node.js. It provides a platform for job seekers to search for jobs and for employers to post job openings. The application includes user registration, login, authorization, job posting, and job searching/filtering features.

## Features

- **User Registration and Login**: Secure user registration and login system with password encryption.
- **Authorization**: Role-based access control for job seekers and employers.
- **Job Posting**: Employers can create, update, and manage job postings.
- **Job Searching and Filtering**: Job seekers can search and filter jobs based on various criteria.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and job data.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **bcrypt**: For password hashing.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/job-portal.git
   cd job-portal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the application:

   ```bash
   npm start
   ```

   The application will be running at `http://localhost:8080`.

## API Endpoints

### Authentication

- **POST /api/v1/userregister**: Register a new user
- **POST /api/v1/user/login**: Log in a user

### Job Postings

- **GET /api/jobs**: Get all job postings
- **POST /api/jobs**: Create a new job posting (employers only)
- **GET /api/jobs/:id**: Get a specific job posting
- **PUT /api/jobs/:id**: Update a job posting (employers only)
- **DELETE /api/jobs/:id**: Delete a job posting (employers only)

### Searching and Filtering

- **GET /api/jobs/search**: Search and filter job postings based on criteria

Currently there is no frontend 

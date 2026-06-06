# Full-Stack Blog Application

A complete full-stack web application built for a technical test. This repository contains both the Front-End (React + Vite) and Back-End (Express + MongoDB) codebases, designed to work together seamlessly.

## 📁 Repository Structure

This project is structured as a monorepo. All detailed documentation, including environment variables, API endpoints, and deployment steps, can be found in their respective directories:

* **[`/backend`](./backend)**: Contains the Express.js RESTful API, MongoDB models, and authentication logic. 👉 [Read Back-End Documentation](./backend/README.md)
* **[`/frontend`](./frontend)**: Contains the React.js user interface, Tailwind CSS styling, and client-side routing. 👉 [Read Front-End Documentation](./frontend/README.md)

## 🚀 Quick Start Guide

To run this full-stack application locally, you will need to open two separate terminal windows.

**1. Start the Back-End Server**
Navigate to the backend directory, install dependencies, set up your `.env` file, and run the server:
```bash
cd backend
npm install
npm run dev
```

**2. Start the Front-End Server**
In a new terminal window, navigate to the frontend directory, install dependencies, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```

*For more detailed technical decisions and assumptions, please refer to the specific README files inside each folder.*
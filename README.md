# Project Overview

Upskillr is a full-stack Learning Management System (LMS) designed for coaching institutes, independent educators, and training organizations. It enables course management, assessments, digital certificate issuance, and a coin-based reward system to enhance student engagement.

The platform is built with a scalable architecture and supports Docker-based development workflows.

---

## Demo

<details>
<summary>Watch Full Platform Demo</summary>

<br>

https://drive.google.com/file/d/1z4DNlAIWj8uDIbKXV904hZRx_JEy5S0Q/view?usp=drive_link

</details>

---

## Core Features

### Course Management
- Create and manage courses
- Instructor assignment
- Structured modules and content delivery
- Role-based access control (Instructor, Learner)

### Assessment System
- Timed assessments
- Switching Tabs detecttion to prevent cheat activities
- Automatic score calculation
- Submission tracking

### Certificate Generation
- Dynamic certificate creation
- Unique certificate IDs
- Shareable on LinkedIn
- Online certificate verification endpoint
- Downloadable PDF certificates

### Coin-Based Reward System
- Learners earn coins for completing courses and assessments
- Gamified engagement model
- Motivation and retention enhancement

### Progress Tracking
- Course completion monitoring
- Score-based analytics
- Submission history
- Learner performance insights

### Dockerized Backend
- Containerized backend environment
- Docker Compose for development
- Production-ready Dockerfile

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### DevOps
- Docker
- Docker Compose
- Render (Backend Hosting)
- Vercel (Frontend Hosting)

---

## Project Structure

```
Upskillr/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
│
└── README.md
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BhumikaYeole/UpSkillr.git
cd UpSkillr
```

---

## Backend Setup (Without Docker)

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` directory:

```
PORT=5000
DB_URI=mongodb_connection_string
JWT_SECRET=secret_key
CLIENT_URL=http://localhost:5173
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside the `frontend` directory:

```
VITE_API_URL=http://localhost:5000/api
```

---

## Docker-Based Backend Setup

### Build and Run Using Docker Compose

```bash
cd backend
docker compose up --build
```

To stop the container:

```bash
docker compose down
```

Docker Compose automatically:
- Builds the backend image
- Loads environment variables
- Maps port 5000
- Runs development mode



# 🚀 Phase 3: Deployment

> **Duration:** August 1–2, 2025  
> **Status:** ✅ COMPLETED  
> **Final Deadline:** August 2, 2025 (11:59 PM IST)

---

## ☁️ Deployment Goals

- [x] Docker containerization for local development
- [x] Cloud deployment using Railway (backend) and Vercel (frontend)
- [x] Production database setup (PostgreSQL)
- [x] Environment configuration for secure credentials
- [x] Live application accessible with health check route

### 🐳 Dockerization

* [✔] **Dockerfile (Frontend)** – Containerize React frontend
* [✔] **Dockerfile (Backend)** – Containerize Node/Express backend
* [✔] **Docker Compose** – Combine frontend + backend for local dev

---

## 🌐 Live Application

- **Frontend**: [https://mailflow.vercel.app](https://mailflow.vercel.app)
- **Backend API**: [https://mailflow-api.railway.app](https://mailflow-api.railway.app)
- **Health Check**: [https://mailflow-api.railway.app/health](https://mailflow-api.railway.app/health)

### ☁️ Cloud Deployment

* [✔] **Frontend on Vercel** – Continuous deployment from GitHub
* [✔] **Backend on Railway** – API + DB hosting
* [✔] **PostgreSQL Hosting** – Connected via Railway
* [✔] **Health Check Route** – `GET /health` to verify backend status
* [✔] **Environment Variables** – `.env.production` setup for frontend & backend

---

## 🐳 Docker Support

To run the project locally using Docker:

```bash
# Build and start the app
docker-compose up --build

# Access the app locally:
# Frontend: http://localhost:80
# Backend: http://localhost:3000

---

## 🛠️ Deployment Stack

| Component        | Technology              |
|------------------|--------------------------|
| **Frontend**      | React.js + Tailwind CSS |
| **Backend**       | Node.js + Express.js    |
| **Database**      | PostgreSQL (Railway)    |
| **Cloud Hosting** | Vercel (Frontend), Railway (Backend) |
| **Containerization** | Docker, Docker Compose |
| **Env Management** | `.env`, Railway + Vercel Secrets |

---

## 🐳 Docker Setup

### 📁 Files Added

```bash
frontend/
├── Dockerfile           # NEW

backend/
├── Dockerfile           # NEW


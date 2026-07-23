# Task Manager App 📝

A modern, full-stack Task Management application built with React, Node.js, Express, TypeScript, Prisma, and PostgreSQL.

---

## 🚀 Features

- **Authentication & Security**
  - User Registration & Login
  - JWT Authentication with Access Tokens & Refresh Tokens
  - Protected Routes & Secure Session Management
- **Task Management**
  - Create, view, update, and soft-delete tasks
  - Task priority management (`LOW`, `MEDIUM`, `HIGH`)
  - Task status tracking (`PENDING`, `IN_PROGRESS`, `COMPLETED`)
  - Due date tracking & filtering
- **Modern UI/UX**
  - Responsive Dashboard interface built with Tailwind CSS & shadcn/ui
  - Interactive state handling with TanStack React Query

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Routing**: React Router v7
- **State Management & API**: TanStack React Query (v5), Axios
- **Form Handling & Validation**: React Hook Form, Zod

### Backend
- **Runtime & Framework**: Node.js, Express v5, TypeScript
- **Database & ORM**: PostgreSQL, Prisma ORM v7
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`
- **Validation & Security**: Zod, Helmet, CORS

---

## 📋 Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)
- **PostgreSQL** database instance (Local PostgreSQL server or cloud-hosted database like Neon / Supabase / Render PostgreSQL)

---

## 💻 Local Setup Guide

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Task-Manager-App
```

---

### 2. Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend` root directory:
   ```env
   PORT=3000
   DATABASE_URL="your database url"
   JWT_SECRET="your_jwt_access_secret_key"
   JWT_REFRESH_SECRET="your_jwt_refresh_secret_key"
   JWT_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"
   ```

   > **Note:** If needed, you can use the `.env.example` file in the repository as `.env` when facing any setup issues.

4. **Run Database Migrations & Generate Prisma Client**:
   ```bash
   npx prisma db push
   # or npx prisma generate
   ```

5. **Start the Backend Server**:
   - **Development Mode**:
     ```bash
     npm run dev
     ```
   The backend API will run at `http://localhost:3000`.

---

### 3. Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `frontend` root directory:
   ```env
   # Local Development Backend API URL
   VITE_API_BASE_URL=http://localhost:3000/api/v1

   # Production Backend API URL (use if connecting to hosted backend)
   # VITE_API_BASE_URL=https://task-manager-app-6s6l.onrender.com/api/v1
   ```

   > **Note:** If needed, you can use the production API URL (`https://task-manager-app-6s6l.onrender.com/api/v1`) to test with the hosted backend service.

4. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   The frontend application will run at `http://localhost:5173` (or the URL output in terminal).

---

## 🌐 Production & Vercel Deployment

For SPA client-side routing support when deploying the frontend on platforms like Vercel, a `vercel.json` file is configured in the `frontend` root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This prevents `404: NOT_FOUND` errors when refreshing routes such as `/dashboard` on Vercel hosted deployments.
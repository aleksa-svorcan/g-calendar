# Google Calendar Sync App

This is a full-stack application built with:

- **Backend**: Node.js (Express), PostgreSQL (Sequelize), Google Calendar API (OAuth2)
- **Frontend**: React (Vite) + MUI
- **Authentication**: Google OAuth2
- **Calendar Features**: 
  - Sync events from Google Calendar
  - Create new events via UI
  - Group and paginate events by day or week
  - Full overwrite sync to ensure DB matches Google Calendar

---

## 📦 Project Structure

```
project-root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── dump.sql ← ✅ Postgres dump included
│   └── index.js
├── frontend/
│   └── ... (Vite + React setup)
├── .env
└── README.md
```

---

## 🧰 Requirements

- Node.js (v20+)
- PostgreSQL (15+)
- pgAdmin (optional, for DB GUI)
- Google Cloud Project with OAuth 2.0 Credentials

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/google-calendar-app.git
cd google-calendar-app
```

### 2. Setup PostgreSQL

- Create a PostgreSQL database (e.g. `calendar_db`)
- Import the included dump:

**Using psql**:
```bash
psql -U your_user -d calendar_db -f backend/calendar_dump.sql
```

**Or using pgAdmin**:
- Right-click your DB → *Restore* → Select `calendar_dump.sql` and start restore.

### 3. Configure environment

Create `.env` in the `backend/` directory:

```dotenv
DATABASE_URL=postgres://your_user:your_password@localhost:5432/calendar_db
SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

---

## 🖥 Backend (Express)

```bash
cd backend
npm install
npm run dev
```

- Runs on `http://localhost:3001`
- Provides `/auth`, `/events` and `/users` API routes

---

## 💻 Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

- Runs on `http://localhost:3000`
- Talks to backend via proxy (`/api` → `localhost:3001`)

---

## ✅ Features

- Login with Google
- Sync calendar events
- Display events grouped by day or week
- Create new events from UI
- Refresh table after creation
- Full overwrite sync behavior
- Responsive MUI design

---

## 🔁 Sync Behavior

Every time events are fetched from Google Calendar, the entire event table is **cleared and repopulated**, ensuring your DB is always up to date.

---
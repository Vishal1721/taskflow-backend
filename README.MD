# TaskFlow Backend

A RESTful API backend for a collaborative task management application. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. Supports project creation, team collaboration via email invites, task management with role-based authorization, and JWT authentication.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JSON Web Tokens (JWT) |
| Password Hashing | bcrypt |
| Email | Nodemailer (Gmail) |

---

## Project Structure

```
taskflow-backend/
├── config/
│   ├── db.ts              # MongoDB connection
│   └── jwt.ts             # Token generation
├── controllers/
│   ├── userController.ts
│   ├── projectController.ts
│   ├── projectInviteController.ts
│   ├── taskController.ts
│   └── inviteContoller.ts
├── middleware/
│   └── authMiddleware.ts  # JWT verification
├── models/
│   ├── userModels.ts
│   ├── projectModels.ts
│   ├── taskModels.ts
│   └── inviteModels.ts
├── routes/
│   ├── userRoutes.ts
│   ├── projectRoutes.ts
│   ├── taskRoutes.ts
│   └── inviteRoutes.ts
├── services/
│   ├── userServices.ts
│   ├── projectServices.ts
│   ├── projectInviteService.ts
│   ├── taskServices.ts
│   └── inviteServices.ts
├── utils/
│   ├── bcrypt.ts          # Password hash/compare helpers
│   ├── sendEmail.ts       # Nodemailer wrapper
│   └── findDb.ts          # Project membership check
├── src/types/
│   └── express.d.ts       # Extended Express Request type
└── server.ts              # App entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- A Gmail account (for email invites — use an App Password)

### Installation

```bash
git clone https://github.com/your-username/taskflow-backend.git
cd taskflow-backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

> **Note:** For Gmail, enable 2FA and generate an [App Password](https://myaccount.google.com/apppasswords) — do not use your main Gmail password.

### Running the Server

```bash
# Development (hot reload)
npm run dev

# Production build
npm run build
npm start
```

Server runs on `http://localhost:3000` by default.

---

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/register` | No | Register a new user |
| POST | `/api/login` | No | Login and receive a JWT |
| GET | `/api/me` | Yes | Get the logged-in user's profile |

### Projects

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/projects/` | Yes | Create a new project |
| GET | `/api/projects/` | Yes | Get all projects you're a member of |
| GET | `/api/projects/:id` | Yes | Get details of a specific project |
| POST | `/api/projects/:id/invite` | Yes (owner only) | Invite a user to a project by email |

### Tasks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/projects/:projectId/tasks` | Yes | Create a task in a project |
| GET | `/api/projects/:projectId/tasks` | Yes | Get all tasks in a project |
| GET | `/api/tasks/:taskId` | Yes | Get a single task |
| PATCH | `/api/tasks/:taskId` | Yes | Update a task |
| DELETE | `/api/tasks/:taskId` | Yes | Delete a task |
| PATCH | `/api/tasks/:taskId/assign` | Yes (owner only) | Assign a task to a project member |
| GET | `/api/tasks/my` | Yes | Get all tasks assigned to you |

### Invites

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/invites/accept` | No | Accept a project invite via token |

---

## Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are returned from the `/api/login` endpoint and expire after **1 day**.

---

## Data Models

### User
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, hashed)
- `role` (String, default: `"member"`)

### Project
- `name` (String, required)
- `description` (String)
- `owner` (ref: User)
- `members` (ref: User[])

### Task
- `title` (String, required)
- `description` (String)
- `status` — `"todo"` | `"in-progress"` | `"done"` (default: `"todo"`)
- `priority` — `"low"` | `"medium"` | `"high"` (default: `"medium"`)
- `dueDate` (Date, optional)
- `assignee` (ref: User)
- `projectId` (ref: Project)
- `createdBy` (ref: User)

### Invite
- `email` (String)
- `projectId` (ref: Project)
- `invitedBy` (ref: User)
- `token` (String, unique)
- `status` — `"pending"` | `"accepted"`
- `expiresAt` (Date)
---

## License
ISC

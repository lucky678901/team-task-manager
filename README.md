# 🚀 Team Task Manager (MERN Stack)

A full-stack Team Task Manager web application built using the MERN Stack.  
The application allows teams to manage projects, assign tasks, track progress, and monitor team productivity with secure role-based access.

---

# 🌐 Live Links

https://team-task-manager-dusky-sigma.vercel.app/

---

# 📌 Features

## 🔐 Authentication
- User Signup & Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control (Admin / Member)

---

# 👨‍💼 Admin Features
- Create Projects
- Create Tasks
- Assign Tasks to Specific Members
- Assign Tasks to All Members
- Track Team Productivity
- View All Tasks
- View Analytics Dashboard
- Monitor Overdue Tasks

---

# 👨‍💻 Member Features
- View Assigned Tasks
- Update Task Progress
- Update Task Status
- Track Completion Percentage

---

# 📊 Dashboard Features
- Task Analytics Pie Chart
- Pending Tasks Count
- Completed Tasks Count
- In Progress Tasks Count
- Overdue Tasks Tracking
- Team Productivity Overview
- Dynamic Progress Bars

---

# 📱 Responsive Design
- Mobile Responsive UI
- Responsive Sidebar
- Optimized Layout for Tablets & Phones

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Axios
- Recharts
- Lucide React

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Deployment
- Frontend → Vercel
- Backend → Railway
- Database → MongoDB Atlas

---

# 📂 Project Structure

```bash
team-task-manager/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/lucky678901/team-task-manager
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🚀 Deployment

## Backend Deployment
- Railway

## Frontend Deployment
- Vercel

## Database
- MongoDB Atlas

---

# 🔒 Role-Based Access

## Admin
- Full access
- Manage tasks & projects
- View all users data

## Member
- Limited access
- Can update only assigned tasks

---

# 📈 Future Improvements
- Email Notifications
- Real-time Chat
- File Uploads
- Kanban Board
- Dark/Light Theme
- Activity Logs

---

# 👨‍💻 Author

Lucky Singh

---

# ⭐ Conclusion

This project demonstrates a complete production-ready MERN stack application with authentication, role-based access, task management, analytics dashboard, responsive UI, and cloud deployment.

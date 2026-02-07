# 🎯 EduQ – Full Stack Quiz Application

EduQ is a **full-stack MERN quiz platform** that allows users to test their knowledge, track quiz attempts, view leaderboards, and manage profiles.  
Admins can manage users, assign admin roles, and add quiz questions.

🚀 Built with **React, Node.js, Express, MongoDB, and JWT authentication**.

---

## 🌐 Live Demo

- **Frontend**: https://edu-q.vercel.app  
- **Backend API**: https://edu-q.vercel.app  

---

## ✨ Features

### 👤 Authentication & Authorization
- User registration & login (JWT based)
- Persistent login on refresh
- Role-based access (Admin / User)
- Protected admin routes

### 🧠 Quiz System
- Category-based quizzes
- Timer for each question
- Automatic scoring
- Result summary with percentage
- Play again functionality

### 🏆 Leaderboards
- Personal leaderboard (last 5 attempts)
- Global leaderboard (top users)
- Attempts stored per user in MongoDB

### 👤 Profile Management
- Update name & email
- Upload / change profile image
- Remove profile image
- Profile data persists across refresh

### 🛠 Admin Dashboard
- View all users
- Promote / remove admin role
- Add quiz questions from frontend
- Secure admin-only access

### 🎨 UI / UX
- Responsive layout
- Fixed professional navbar
- Toast notifications
- Icons using `react-icons`
- Clean and modern UI

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- Tailwind CSS
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Multer (file handling)
- bcryptjs

### Deployment
- Vercel (Frontend & Backend)
- MongoDB Atlas (Cloud Database)

---

## 📂 Project Structure

QuizSphere/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ └── App.jsx
│ │ 
│ └── package.json
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── server.js
│ └── package.json
│
└── README.md
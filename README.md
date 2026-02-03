# user-auth
user-auth


UserAuth – MERN Authentication System

AccountApp is a full-stack MERN application that provides secure user authentication and profile management. Users can register, log in, update their profile information, and manage a profile image.

🚀 Features

User registration & login

JWT authentication using HTTP-only cookies

Auto login on page refresh

Protected routes

Profile management (edit name, email, avatar)

Profile image upload, preview & remove

Default avatar support

Responsive UI using Bootstrap

🛠️ Tech Stack

Frontend: React, Redux Toolkit, React Router, Axios, Bootstrap
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer, Cloudinary

📂 Project Structure

backend/   → Express API, MongoDB, Auth & Cloudinary
client/    → React UI with Redux & protected routes

⚙️ Setup (Quick)

# Backend
cd backend
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev

![register page](register-img.png) ![login page](login-img.png) ![profile page](profile-img.png)
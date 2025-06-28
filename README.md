# Real-TimeChat
Real-Time Chat Application with Login System
Real-Time Chat Application with Login System

This is a simple real-time chat application built with Node.js, Express, Socket.IO, MongoDB, and EJS. The app includes user registration, login, and session-based authentication.

## Features

- User Registration and Login
- Password Hashing with bcrypt
- Session Management using express-session
- Real-Time Chat using Socket.IO
- Chat Interface with EJS Templates
- Static Files Support (CSS, JS)
- Logout Functionality

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- EJS
- bcryptjs
- express-session

## Installation and Setup

1. Clone the repository

```bash
git clone https://github.com/Yashi1211/chat-app.git
cd chat-app
Install dependencies

bash
Copy
Edit
npm install
Start MongoDB

Ensure that MongoDB is running on your local machine at:

arduino
Copy
Edit
mongodb://127.0.0.1:27017/chatapp
Start the server

bash
Copy
Edit
node index.js
Open the application

Visit the application in your browser at:

arduino
Copy
Edit
http://localhost:3000
Folder Structure
pgsql
Copy
Edit
chat-app/
│
├── models/
│   └── User.js
│
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   └── chat.ejs
│
├── public/
│   └── style.css
│
├── index.js
├── package.json
└── README.md
How to Use
Open the app in your browser

Register as a new user

Login with your credentials

Start chatting in real time with other users

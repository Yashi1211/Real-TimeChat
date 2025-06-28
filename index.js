// index.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');

// Routes

// Home
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Register
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ name, email, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    res.send("❌ Registration failed: " + err.message);
  }
});

// Login
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    req.session.userName = user.name;
    res.redirect('/chat');
  } else {
    res.send("❌ Invalid email or password");
  }
});

// Chat Page
app.get('/chat', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.render('chat', { userName: req.session.userName });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

const http = require('http').createServer(app);
const io = require('socket.io')(http);
io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);  // sabhi clients ko message bhejna
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });
});


http.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

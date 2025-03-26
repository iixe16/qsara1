require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const socketIo = require('socket.io');
const path = require('path');

const User = require('./models/user');
const Chat = require('./models/chatModel');
const ActivityLog = require('./models/activityLog');

const app = express();
const server = http.createServer(app);

// Socket.IO Configuration
const io = socketIo(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
});

// Trust Proxy
app.set('trust proxy', true);

// Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://qsara-cb597.web.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiter
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'لقد تجاوزت الحد المسموح من الطلبات، يرجى المحاولة بعد 15 دقيقة'
}));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Routes
app.use('/api/user', require('./routes/userRoutes'));

app.get("/", (req, res) => res.send("Server is running."));

// Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

// Socket Connection
io.on('connection', (socket) => {
    console.log("🟢 New client connected:", socket.id);
    socket.on('disconnect', () => console.log("🔴 Client disconnected:", socket.id));
});

// Keep Render Server Awake
setInterval(() => {
    http.get('https://qsara-backend.onrender.com');
}, 600000);

// Starting Server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

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
app.use(express.static(path.join(__dirname, 'public')));
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'https://qsara-cb597.web.app',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'لقد تجاوزت الحد المسموح من الطلبات، يرجى المحاولة بعد 15 دقيقة'
});

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ Connected to MongoDB Atlas");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/log-activity', async (req, res) => {
    try {
        const { userId, page } = req.body;
        if (!userId || !page) {
            return res.status(400).json({ error: "يجب إدخال userId واسم الصفحة." });
        }

        const newActivity = new ActivityLog({ userId, page, timestamp: new Date() });
        await newActivity.save();

        res.status(201).json({ message: "تم تسجيل النشاط بنجاح." });
    } catch (error) {
        console.error("❌ خطأ في تسجيل النشاط:", error);
        res.status(500).json({ error: "حدث خطأ أثناء تسجيل النشاط." });
    }
});

app.get('/activity/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const activityData = await ActivityLog.find({ userId }).sort({ timestamp: -1 });

        res.status(200).json(activityData);
    } catch (error) {
        console.error("❌ خطأ في جلب بيانات النشاط:", error);
        res.status(500).json({ error: "حدث خطأ أثناء استرجاع بيانات النشاط." });
    }
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

app.get("/", (req, res) => {
    res.send("Server is running.");
});

app.post('/save-chat', async (req, res) => {
    try {
        const { chatHistory } = req.body;

        if (!chatHistory || !Array.isArray(chatHistory)) {
            return res.status(400).json({ error: "chatHistory يجب أن يكون مصفوفة" });
        }

        const formattedChat = chatHistory.map(chat => ({
            sender: chat.sender,
            message: chat.message,
            timestamp: chat.timestamp || new Date()
        }));

        const newChat = new Chat({ chatHistory: formattedChat });
        await newChat.save();

        res.status(201).json({ message: "تم حفظ المحادثة بنجاح." });
    } catch (error) {
        console.error("❌ خطأ في حفظ المحادثة:", error);
        res.status(500).json({ error: "حدث خطأ أثناء حفظ المحادثة." });
    }
});

app.get('/get-chats', async (req, res) => {
    try {
        const chats = await Chat.find().sort({ createdAt: -1 });
        res.status(200).json(chats);
    } catch (error) {
        console.error("❌ خطأ في جلب الدردشات:", error);
        res.status(500).json({ error: "حدث خطأ أثناء استرجاع الدردشات." });
    }
});

app.post('/api/signup', async (req, res) => {
    const { email, password, confirmPassword, username, securityQuestion, securityAnswer } = req.body;

    if (!email || !password || !confirmPassword || !username || !securityQuestion || !securityAnswer) {
        return res.status(400).json({ error: "جميع الحقول مطلوبة." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "كلمتا السر غير متطابقتين." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "البريد الإلكتروني غير صالح." });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;,.<>?]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: "كلمة السر يجب أن تحتوي على الأقل على 8 أحرف، وتحتوي على حرف كبير، وحرف صغير، ورقم، ورمز خاص."
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "البريد الإلكتروني مسجل مسبقًا." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        username,
        securityQuestion,
        securityAnswer: hashedSecurityAnswer
    });

    try {
        await newUser.save();
        // إعادة التوجيه إلى صفحة تسجيل الدخول بعد إنشاء الحساب بنجاح
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء إنشاء الحساب." });
    }
});
app.post('/api/reset-password-security', async (req, res) => {
    const { email, securityQuestion, securityAnswer, newPassword } = req.body;

    // تحقق من وجود الحقول
    if (!email || !securityQuestion || !securityAnswer || !newPassword) {
        return res.status(400).json({ error: "جميع الحقول مطلوبة." });
    }

    // تحقق من تنسيق كلمة المرور
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;,.<>?]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
            error: "كلمة السر يجب أن تحتوي على الأقل على 8 أحرف، وتحتوي على حرف كبير، وحرف صغير، ورقم، ورمز خاص."
        });
    }

    // البحث عن المستخدم باستخدام البريد الإلكتروني وسؤال الأمان
    const user = await User.findOne({ email, securityQuestion });
    if (!user) {
        return res.status(400).json({ error: "إما البريد الإلكتروني أو سؤال الأمان غير صحيح." });
    }

    // التحقق من إجابة سؤال الأمان
    const isAnswerCorrect = await bcrypt.compare(securityAnswer, user.securityAnswer);
    if (!isAnswerCorrect) {
        return res.status(400).json({ error: "إجابة سؤال الأمان غير صحيحة." });
    }

    // تشفير كلمة المرور الجديدة
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // تحديث كلمة المرور
    user.password = hashedNewPassword;
    await user.save();

    // إرسال رسالة تأكيد مع وقت التأخير
    res.status(200).json({ 
        message: "تم إعادة تعيين كلمة المرور بنجاح.",
        delay: 10000 // تحديد التأخير بالمللي ثانية (10 ثواني)
    });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "تم تسجيل الدخول بنجاح.",
            token
        });

    } catch (error) {
        console.error("❌ خطأ في تسجيل الدخول:", error);
        res.status(500).json({ error: "حدث خطأ أثناء تسجيل الدخول." });
    }
});

io.on('connection', (socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on('disconnect', () => {
        console.log("🔴 Client disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
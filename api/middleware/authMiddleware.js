const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "مصادقة فاشلة: لا يوجد توكن." });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "التوكن غير صالح أو منتهي الصلاحية." });
            }

            const user = await User.findById(decoded.userId).select('-password');
            if (!user) {
                return res.status(404).json({ error: "المستخدم غير موجود." });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error("❌ خطأ في المصادقة:", error);
        res.status(500).json({ error: "حدث خطأ أثناء التحقق من التوكن." });
    }
};

module.exports = auth;

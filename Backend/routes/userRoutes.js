const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// ✅ جلسات المستخدم (فلاش كارد، شات بوت، Qoom)
router.post('/start-session', auth, userController.startSession);
router.post('/end-session', auth, userController.endSession);

// ✅ الصفحة الشخصية (Profile)
router.get('/profile', auth, userController.getProfile);

module.exports = router;

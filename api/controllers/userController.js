const User = require('../models/user');

// 🔐 الحصول على بيانات المستخدم للصفحة الشخصية
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'المستخدم غير موجود.' });
    }

    res.json({
      name: user.username,
      email: user.email,
      sessions: user.sessions || []
    });
  } catch (error) {
    console.error("❌ خطأ في تحميل البروفايل:", error);
    res.status(500).json({ error: 'فشل في تحميل بيانات البروفايل.' });
  }
};

// ▶️ بدء جلسة
exports.startSession = async (req, res) => {
  try {
    const { pageName } = req.body;

    await User.updateOne(
      { _id: req.user._id },
      {
        $push: {
          sessions: {
            startTime: new Date(),
            pageName
          }
        }
      }
    );

    console.log("✅ تم بدء جلسة:", req.user.email, pageName);
    res.json({ message: 'تم بدء الجلسة.' });
  } catch (error) {
    console.error("❌ خطأ داخل startSession:", error);
    res.status(500).json({ error: 'فشل في بدء الجلسة.' });
  }
};

// ⏹️ إنهاء جلسة
exports.endSession = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const lastIndex = user.sessions.length - 1;
    if (lastIndex < 0 || user.sessions[lastIndex].endTime) {
      return res.status(400).json({ error: 'لا توجد جلسة نشطة لإغلاقها.' });
    }

    const endTime = new Date();
    const startTime = user.sessions[lastIndex].startTime;
    const duration = (endTime - startTime) / 1000;

    await User.updateOne(
      { _id: req.user._id, "sessions.startTime": startTime },
      {
        $set: {
          "sessions.$.endTime": endTime,
          "sessions.$.duration": duration
        }
      }
    );

    console.log("✅ تم إنهاء الجلسة:", req.user.email);
    res.json({ message: 'تم إنهاء الجلسة.' });
  } catch (error) {
    console.error("❌ خطأ في endSession:", error);
    res.status(500).json({ error: 'فشل في إنهاء الجلسة.' });
  }
};

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatHistory: [
        {
            sender: String, // من أرسل الرسالة (User أو AI)
            message: String, // نص الرسالة
            timestamp: { type: Date, default: Date.now } // وقت الإرسال
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);

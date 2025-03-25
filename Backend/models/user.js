const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, 
    unique: true,   
    trim: true,     
    lowercase: true 
  },
  password: {
    type: String,
    required: true, 
  },
  username: {
    type: String,
    required: true, 
    trim: true      
  },
  securityQuestion: {
    type: String,
    required: true, 
  },
  securityAnswer: {
    type: String,
    required: true, 
  },
  activityLogs: [
    {
      page: { 
        type: String, 
        enum: ['Flashcard', 'Qoom', 'Chatbot'], 
        required: true 
      },
      timestamp: { 
        type: Date, 
        default: Date.now 
      }
    }
  ], // هنا تمت إضافة الفاصلة
  // لحساب وقت دخول المستخدم في صفحات معينة (مثلا فلاش كارد)
  sessions: [{
    startTime: Date,
    endTime: Date,
    duration: Number, // عدد الثواني أو الدقائق
    pageName: {
      type: String,
      enum: ['Flashcard', 'Chatbot', 'Qoom'],
      required: true
    } 
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

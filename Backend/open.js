require('dotenv').config();
const { OpenAI } = require('openai'); // تأكد من استيراد OpenAI بشكل صحيح

// التأكد من أنك قمت بتخزين مفتاح API في ملف البيئة .env
if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in environment variables');
  process.exit(1);
}

// إنشاء مثيل من OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// اختبار الاتصال بـ OpenAI
async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // اختر النموذج الذي تريد استخدامه
      messages: [{ role: 'user', content: 'Hello, OpenAI!' }],
    });
    console.log('Response from OpenAI:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}

testOpenAI();

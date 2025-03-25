import React from 'react';
import './Achievements.css';

const Achievements = ({ sessions }) => {
  const uniqueDays = new Set(sessions.map(s => new Date(s.startTime).toDateString()));

  const totalFlashcardTime = sessions
    .filter(s => s.pageName === 'Flashcard')
    .reduce((acc, s) => acc + (s.duration || 0), 0);

  const chatbotCount = sessions.filter(s => s.pageName === 'Chatbot').length;
  const qoomDays = new Set(
    sessions.filter(s => s.pageName === 'Qoom').map(s => new Date(s.startTime).toDateString())
  );

  const earned = [];

  if (uniqueDays.size >= 3) earned.push({ title: "🔥 مستخدم نشيط", desc: "استخدم المنصة لأكثر من 3 أيام" });
  if (totalFlashcardTime >= 60 * 60) earned.push({ title: "🧠 عاشق الفلاش كارد", desc: "قضيت أكثر من ساعة في Flashcard" });
  if (chatbotCount >= 5) earned.push({ title: "🤖 خبير المحادثة", desc: "استخدمت الشات بوت 5 مرات أو أكثر" });
  if (qoomDays.size >= 3) earned.push({ title: "📚 منظم بالدراسة", desc: "استخدمت Qoom في 3 أيام مختلفة" });

  return (
    <div className="achievements-container">
      <h3 className="achievements-title">🏆 إنجازاتك</h3>
      {earned.length === 0 ? (
        <p className="no-achievements">لا توجد إنجازات بعد... استمر!</p>
      ) : (
        <div className="achievement-list">
          {earned.map((achieve, index) => (
            <div key={index} className="achievement-card">
              <h4>{achieve.title}</h4>
              <p>{achieve.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;

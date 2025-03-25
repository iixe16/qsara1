import React from 'react';
import './StudyPlan.css';

const StudyPlan = ({ sessions }) => {
  const flashcardTime = sessions
    .filter(s => s.pageName === 'Flashcard')
    .reduce((acc, s) => acc + (s.duration || 0), 0);

  const chatbotTime = sessions
    .filter(s => s.pageName === 'Chatbot')
    .reduce((acc, s) => acc + (s.duration || 0), 0);

  const qoomTime = sessions
    .filter(s => s.pageName === 'Qoom')
    .reduce((acc, s) => acc + (s.duration || 0), 0);

  const suggestions = [];

  if (qoomTime < 600) {
    suggestions.push({
      title: "Qoom (STUDY ROOM)",
      text: "استخدامك فيها قليل. ننصحك بتخصيص 15 دقيقة يوميًا للمذاكرة التفاعلية داخل الغرفة."
    });
  }

  if (chatbotTime < 300) {
    suggestions.push({
      title: "Chatbot",
      text: "جرب استخدامه يوميًا، فهو يساعدك على مراجعة المفاهيم والإجابة عن استفساراتك بسرعة."
    });
  }

  if (flashcardTime > 1800) {
    suggestions.push({
      title: "Flashcard",
      text: "أداءك ممتاز في Flashcard! استمر بالمعدل اليومي للحفاظ على تقدمك."
    });
  } else {
    suggestions.push({
      title: "Flashcard",
      text: "ننصحك بالاستمرار حتى تصل إلى 30 دقيقة يوميًا لتحسين الحفظ والمراجعة."
    });
  }

  return (
    <div className="study-plan-container">
      <h3>📅 خطة دراسية مقترحة</h3>
      {suggestions.map((tip, index) => (
        <div key={index} className="plan-section">
          <h4>{tip.title}</h4>
          <p>{tip.text}</p>
        </div>
      ))}
    </div>
  );
};

export default StudyPlan;

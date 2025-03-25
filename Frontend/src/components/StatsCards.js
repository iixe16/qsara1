import React from 'react';
import './StatsCards.css';

const formatTime = (seconds) => {
  if (!seconds) return '0 ثانية';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins} دقيقة ${secs} ثانية`;
};

const StatsCards = ({ sessions }) => {
  const totalTime = sessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const totalSessions = sessions.length;

  const averageDuration = totalSessions ? totalTime / totalSessions : 0;

  const pageCount = {};
  sessions.forEach(s => {
    if (!s.pageName) return;
    pageCount[s.pageName] = (pageCount[s.pageName] || 0) + 1;
  });

  const mostUsedPage = Object.entries(pageCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'غير محدد';

  return (
    <div className="stats-cards-container">
      <div className="stat-card">
        <p className="label">إجمالي الوقت</p>
        <p className="value">{formatTime(totalTime)}</p>
      </div>
      <div className="stat-card">
        <p className="label">أكثر صفحة استخدامًا</p>
        <p className="value">{mostUsedPage}</p>
      </div>
      <div className="stat-card">
        <p className="label">عدد الجلسات</p>
        <p className="value">{totalSessions}</p>
      </div>
      <div className="stat-card">
        <p className="label">متوسط مدة الجلسة</p>
        <p className="value">{formatTime(averageDuration)}</p>
      </div>
    </div>
  );
};

export default StatsCards;

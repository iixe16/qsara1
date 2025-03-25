import React from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown, FaLightbulb } from 'react-icons/fa';
import './SmartInsights.css';

const SmartInsights = ({ sessions }) => {
  if (!sessions || sessions.length === 0) return null;

  const durationsByPage = {};

  sessions.forEach(s => {
    const page = s.pageName;
    durationsByPage[page] = (durationsByPage[page] || 0) + (s.duration || 0);
  });

  const sortedPages = Object.entries(durationsByPage).sort((a, b) => b[1] - a[1]);
  const mostUsed = sortedPages[0];
  const leastUsed = sortedPages[sortedPages.length - 1];

  return (
    <div className="insights-container">
      <h3 className="insights-title">📊 التحليل الذكي</h3>
      <div className="insight-box">
        <FaChartLine className="insight-icon" />
        <p><strong>أكثر صفحة استخدامًا:</strong> {mostUsed[0]} ({Math.round(mostUsed[1] / 60)} دقيقة)</p>
      </div>
      <div className="insight-box">
        <FaArrowDown className="insight-icon" />
        <p><strong>أقل صفحة استخدامًا:</strong> {leastUsed[0]} ({Math.round(leastUsed[1] / 60)} دقيقة فقط)</p>
      </div>
      <div className="insight-box">
        <FaLightbulb className="insight-icon" />
        <p><strong>اقتراح:</strong> حاول زيادة وقتك في صفحة <strong>{leastUsed[0]}</strong> لتعزيز التوازن في المذاكرة.</p>
      </div>
    </div>
  );
};

export default SmartInsights;

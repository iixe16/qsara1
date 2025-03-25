import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const FlashCardChart = ({ sessions }) => {
  // معالجة الجلسات لتجميع الوقت حسب الصفحة
  const pageDurations = sessions.reduce((acc, session) => {
    if (session.pageName && session.duration) {
      acc[session.pageName] = (acc[session.pageName] || 0) + session.duration;
    }
    return acc;
  }, {});

  const data = Object.keys(pageDurations).map((page) => ({
    name: page,
    duration: Math.round(pageDurations[page]),
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FlashCardChart;

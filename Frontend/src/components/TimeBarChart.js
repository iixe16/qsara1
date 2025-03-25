import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-EG', { weekday: 'short', day: 'numeric', month: 'short' });
};

const TimeBarChart = ({ sessions }) => {
  const dailyDurations = {};

  sessions.forEach((session) => {
    if (!session.duration || !session.startTime) return;

    const dateKey = new Date(session.startTime).toISOString().split('T')[0]; // yyyy-mm-dd
    dailyDurations[dateKey] = (dailyDurations[dateKey] || 0) + session.duration;
  });

  const chartData = Object.entries(dailyDurations).map(([date, duration]) => ({
    date: formatDate(date),
    duration: Math.round(duration / 60), // دقائق
  }));

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ color: 'white', marginBottom: '10px' }}>النشاط اليومي (بالدقائق)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'دقائق', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="duration" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeBarChart;

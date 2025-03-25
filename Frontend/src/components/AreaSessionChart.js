import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaSessionChart = ({ sessions }) => {
  // نحول الجلسات إلى بيانات مجمعة حسب الصفحة
  const summary = {};
  sessions.forEach(s => {
    const page = s.pageName;
    summary[page] = (summary[page] || 0) + (s.duration || 0);
  });

  const data = Object.entries(summary).map(([page, duration]) => ({
    page,
    duration: Math.round(duration / 60) // نحوله للدقائق
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="page" />
          <YAxis unit="د" />
          <Tooltip />
          <Area type="monotone" dataKey="duration" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaSessionChart;

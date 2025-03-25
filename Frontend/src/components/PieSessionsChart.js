import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const PieSessionsChart = ({ sessions }) => {
  const pageDurations = sessions.reduce((acc, session) => {
    if (!session.pageName || !session.duration) return acc;
    acc[session.pageName] = (acc[session.pageName] || 0) + session.duration;
    return acc;
  }, {});

  const data = Object.entries(pageDurations).map(([pageName, duration]) => ({
    name: pageName,
    value: duration,
  }));

  return (
    <div>
      <h3>نسبة الوقت حسب الصفحة</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieSessionsChart;

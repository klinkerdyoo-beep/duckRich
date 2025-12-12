import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Food', value: 2500 },
  { name: 'Shopping', value: 1200 },
  { name: 'Transport', value: 350 },
  { name: 'Bills', value: 900 },
];

const COLORS = ['#FF6B6B', '#FFA94D', '#4DABF7', '#63E6BE'];

export default function CategoryPieChart() {
  return (
    <div className='chart-panel'>
        <PieChart width={380} height={300}>
        <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
        >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
        </PieChart>
    </div>

  );
}

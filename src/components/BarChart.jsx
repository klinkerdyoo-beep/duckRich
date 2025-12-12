import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import "./Chart.css";

const data = [
  { name: 'Food', amount: 2500 },
  { name: 'Shopping', amount: 1200 },
  { name: 'Transport', amount: 350 },
  { name: 'Bills', amount: 900 },
];

export default function CategoryBarChart() {
  return (
    <div className='chart-panel'>
        <BarChart
        width={420}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#6C5CE7" radius={[10, 10, 0, 0]} />
        </BarChart>        
    </div>

  );
}

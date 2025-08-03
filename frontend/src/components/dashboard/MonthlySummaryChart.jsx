import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlySummaryChart = ({ data, loading }) => {
  const { theme } = useAuth();
  const textColor = theme === 'dark' ? 'white' : 'black';

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Income',
        data: data.map(d => d.income),
        backgroundColor: 'rgba(52, 211, 153, 0.7)',
        borderColor: 'rgba(52, 211, 153, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: data.map(d => d.expense),
        backgroundColor: 'rgba(248, 113, 113, 0.7)',
        borderColor: 'rgba(248, 113, 113, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: textColor } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } },
      y: { ticks: { color: textColor }, grid: { color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } },
    }
  };

  if (loading) {
     return <div className="bg-white dark:bg-gray-800 p-5 shadow-lg rounded-lg h-96 animate-pulse"></div>
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-5 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Monthly Summary</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlySummaryChart;
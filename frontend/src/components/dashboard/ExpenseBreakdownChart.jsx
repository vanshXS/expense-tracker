import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseBreakdownChart = ({ data, loading }) => {
  const { theme } = useAuth();
  const textColor = theme === 'dark' ? 'white' : 'black';
  const borderColor = theme === 'dark' ? '#1F2937' : '#FFFFFF'; // gray-800 or white

  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        label: 'Amount',
        data: data.map(d => d.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right', labels: { color: textColor } },
      title: { display: false },
    },
  };
  
  if (loading) {
    return <div className="bg-white dark:bg-gray-800 p-5 shadow-lg rounded-lg h-96 animate-pulse"></div>
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-5 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
      {data.length > 0 ? <Doughnut data={chartData} options={options} /> : <p className="text-center text-gray-500 py-10">No expense data available.</p>}
    </div>
  );
};

export default ExpenseBreakdownChart;
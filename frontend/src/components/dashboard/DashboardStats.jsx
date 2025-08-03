import { FaArrowDown, FaArrowUp } from 'react-icons/fa';


const StatCard = ({ title, value, type, isLoading }) => {
  const formattedValue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-5 shadow-lg rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-5 shadow-lg rounded-lg">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{formattedValue}</p>
      {type && (
        <div className={`flex items-center text-sm font-medium mt-2 ${type === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
          {type === 'increase' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
          {type === 'increase' ? 'Income' : 'Expense'}
        </div>
      )}
    </div>
  );
};

const DashboardStats = ({ stats, loading }) => {
  const { totalIncome, totalExpense, balance } = stats;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard title="Total Income" value={totalIncome} type="increase" isLoading={loading} />
      <StatCard title="Total Expense" value={totalExpense} type="decrease" isLoading={loading} />
      <StatCard title="Balance" value={balance} isLoading={loading} />
    </div>
  );
};

export default DashboardStats;
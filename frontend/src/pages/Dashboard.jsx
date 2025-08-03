import { useEffect, useState } from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import ExpenseBreakdownChart from '../components/dashboard/ExpenseBreakdownChart';
import MonthlySummaryChart from '../components/dashboard/MonthlySummaryChart';
import chartService from '../services/chartService';
import dashboardService from '../services/dashboardService';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [expenseData, setExpenseData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, breakdownRes, summaryRes] = await Promise.all([
        dashboardService.getDashboardStats(),
        chartService.getExpenseBreakdown(),
        chartService.getIncomeExpenseSummary(),
      ]);
      setStats(statsRes.data);
      setExpenseData(breakdownRes.data);
      setSummaryData(summaryRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <DashboardStats stats={stats} loading={loading} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <MonthlySummaryChart data={summaryData} loading={loading} />
          </div>
          <div className="lg:col-span-2">
            <ExpenseBreakdownChart data={expenseData} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
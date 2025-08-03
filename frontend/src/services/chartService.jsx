import apiClient from '../api/axios';

const getExpenseBreakdown = (params = {}) => {
  return apiClient.get('/api/chart/expense-breakdown', { params });
};

const getIncomeExpenseSummary = (params = {}) => {
  return apiClient.get('/api/chart/income-expense-summary', { params });
};

export default {
  getExpenseBreakdown,
  getIncomeExpenseSummary,
};
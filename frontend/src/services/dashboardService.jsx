import apiClient from '../api/axios';

const getDashboardStats = (params = {}) => {
  return apiClient.get('/api/dashboard/stats', { params });
};

export default {
  getDashboardStats,
};
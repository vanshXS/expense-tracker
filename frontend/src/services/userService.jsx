import apiClient from '../api/axios';

const getProfile = () => {
  return apiClient.get('/api/user/profile');
};

export default {
  getProfile,
};
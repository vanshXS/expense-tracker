import apiClient from '../api/axios';

const register = (userData) => {
  return apiClient.post('/api/auth/register', userData);
};

const login = (credentials) => {
  return apiClient.post('/api/auth/login', credentials);
};

export default {
  register,
  login,
};
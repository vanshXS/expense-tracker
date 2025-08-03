// services/transactionService.js
import apiClient from '../api/axios';

const getAllTransactions = async (params = {}) => {
  try {
    const response = await apiClient.get('/api/transaction', { params });
    console.log('✅ Fetched Transactions:', response.data); // Debug
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    throw error;
  }
};

const addTransaction = async (transactionData) => {
  try {
    const response = await apiClient.post('/api/transaction', transactionData);
    return response.data;
  } catch (error) {
    console.error('❌ Error adding transaction:', error);
    throw error;
  }
};

const updateTransaction = async (id, transactionData) => {
  try {
    const response = await apiClient.put(`/api/transaction/${id}`, transactionData);
    return response.data;
  } catch (error) {
    console.error('❌ Error updating transaction:', error);
    throw error;
  }
};

const deleteTransaction = async (id) => {
  try {
    const response = await apiClient.delete(`/api/transaction/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting transaction:', error);
    throw error;
  }
};

export default {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};

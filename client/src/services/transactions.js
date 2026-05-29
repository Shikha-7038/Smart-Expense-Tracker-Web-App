import api from './api';

export const transactionService = {
  // Get all transactions with pagination and filters
  getTransactions: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/transactions${queryParams ? `?${queryParams}` : ''}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single transaction
  getTransaction: async (id) => {
    try {
      const response = await api.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create transaction
  createTransaction: async (transactionData) => {
    try {
      const response = await api.post('/transactions', transactionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update transaction
  updateTransaction: async (id, transactionData) => {
    try {
      const response = await api.put(`/transactions/${id}`, transactionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    try {
      const response = await api.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get transaction summary
  getSummary: async (period = 'month') => {
    try {
      const response = await api.get(`/transactions/summary?period=${period}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Bulk import transactions
  bulkImport: async (transactions) => {
    try {
      const response = await api.post('/transactions/bulk', { transactions });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
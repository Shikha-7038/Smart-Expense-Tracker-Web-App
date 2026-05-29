import api from './api';

export const budgetService = {
  // Get all budgets
  getBudgets: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/budgets${queryParams ? `?${queryParams}` : ''}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create or update budget
  setBudget: async (budgetData) => {
    try {
      const response = await api.post('/budgets', budgetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete budget
  deleteBudget: async (id) => {
    try {
      const response = await api.delete(`/budgets/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get budget alerts
  getAlerts: async () => {
    try {
      const response = await api.get('/budgets/alerts');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get budget recommendations
  getRecommendations: async () => {
    try {
      const response = await api.get('/budgets/recommendations');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
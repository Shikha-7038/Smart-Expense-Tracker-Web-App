import api from './api';

export const dashboardService = {
  // Get dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get spending trends
  getSpendingTrends: async (period = 'month') => {
    try {
      const response = await api.get(`/dashboard/trends?period=${period}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get category analytics
  getCategoryAnalytics: async () => {
    try {
      const response = await api.get('/dashboard/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Export report
  exportReport: async (format = 'json', params = {}) => {
    try {
      const queryParams = new URLSearchParams({ format, ...params }).toString();
      const response = await api.get(`/dashboard/export?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
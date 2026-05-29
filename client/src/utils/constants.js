// Transaction categories
export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Refund',
  'Bonus',
  'Rental Income',
  'Business',
  'Other Income'
];

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Rent',
  'EMI',
  'Insurance',
  'Groceries',
  'Utilities',
  'Travel',
  'Subscription',
  'Gifts',
  'Charity',
  'Other Expense'
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
};

// Colors for charts
export const CHART_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#06B6D4'
];

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  DISPLAY_WITH_TIME: 'DD MMM YYYY, hh:mm A',
  API: 'YYYY-MM-DD',
  MONTH_YEAR: 'MMM YYYY'
};

// Currency settings
export const CURRENCY = {
  CODE: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN'
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZES: [5, 10, 20, 50]
};

// Budget thresholds
export const BUDGET_THRESHOLDS = {
  WARNING: 80,
  DANGER: 100,
  CRITICAL: 120
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me'
  },
  TRANSACTIONS: {
    BASE: '/transactions',
    SUMMARY: '/transactions/summary'
  },
  BUDGETS: {
    BASE: '/budgets',
    ALERTS: '/budgets/alerts'
  },
  DASHBOARD: {
    BASE: '/dashboard'
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'Resource not found.',
  DUPLICATE: 'This item already exists.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Logged in successfully!',
  REGISTER: 'Account created successfully!',
  LOGOUT: 'Logged out successfully!',
  TRANSACTION_ADDED: 'Transaction added successfully!',
  TRANSACTION_UPDATED: 'Transaction updated successfully!',
  TRANSACTION_DELETED: 'Transaction deleted successfully!',
  BUDGET_SET: 'Budget set successfully!',
  BUDGET_UPDATED: 'Budget updated successfully!',
  BUDGET_DELETED: 'Budget deleted successfully!'
};
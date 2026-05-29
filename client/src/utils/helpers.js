import { CURRENCY } from './constants';

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: 'currency',
    currency: CURRENCY.CODE,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(amount));
};

// Format date
export const formatDate = (date, format = 'display') => {
  const d = new Date(date);
  if (format === 'display') {
    return d.toLocaleDateString(CURRENCY.LOCALE, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  if (format === 'short') {
    return d.toLocaleDateString(CURRENCY.LOCALE, {
      month: 'short',
      day: 'numeric'
    });
  }
  return d.toISOString().split('T')[0];
};

// Get month range
export const getMonthRange = (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  return { startDate, endDate };
};

// Calculate percentage
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return (part / total) * 100;
};

// Group by category
export const groupByCategory = (transactions) => {
  return transactions.reduce((group, transaction) => {
    const { category, amount } = transaction;
    if (!group[category]) {
      group[category] = 0;
    }
    group[category] += Math.abs(amount);
    return group;
  }, {});
};

// Get top categories
export const getTopCategories = (transactions, limit = 5) => {
  const grouped = groupByCategory(transactions);
  return Object.entries(grouped)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, value]) => ({ name, value }));
};

// Validate email
export const isValidEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Download file
export const downloadFile = (data, filename, type = 'application/json') => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export to CSV
export const exportToCSV = (data, filename) => {
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
  ];
  const csvString = csvRows.join('\n');
  downloadFile(csvString, filename, 'text/csv');
};

// Get relative time
export const getRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return formatDate(date, 'short');
};

// Generate random color
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Get query params
export const getQueryParams = (params) => {
  const queryParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    if (params[key]) {
      queryParams.append(key, params[key]);
    }
  });
  return queryParams.toString();
};
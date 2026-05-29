/**
 * Helper functions for common operations
 */

// Format currency in Indian Rupees
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Math.abs(amount));
};

// Format date to readable string
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Get current month and year
const getCurrentMonthYear = () => {
    const now = new Date();
    return {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        monthName: now.toLocaleString('default', { month: 'long' })
    };
};

// Get start and end date of a month
const getMonthDateRange = (year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    return { startDate, endDate };
};

// Calculate percentage
const calculatePercentage = (part, total) => {
    if (total === 0) return 0;
    return (part / total) * 100;
};

// Generate random ID
const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
};

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

// Validate amount
const isValidAmount = (amount) => {
    return !isNaN(amount) && amount > 0 && isFinite(amount);
};

// Group transactions by category
const groupByCategory = (transactions) => {
    return transactions.reduce((group, transaction) => {
        const { category } = transaction;
        if (!group[category]) {
            group[category] = [];
        }
        group[category].push(transaction);
        return group;
    }, {});
};

// Calculate total by category
const sumByCategory = (transactions) => {
    const categorySum = {};
    transactions.forEach(transaction => {
        const { category, amount } = transaction;
        if (!categorySum[category]) {
            categorySum[category] = 0;
        }
        categorySum[category] += Math.abs(amount);
    });
    return categorySum;
};

// Get top spending categories
const getTopSpendingCategories = (transactions, limit = 5) => {
    const categorySum = sumByCategory(transactions);
    return Object.entries(categorySum)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([category, amount]) => ({ category, amount }));
};

// Calculate monthly average
const calculateMonthlyAverage = (transactions, months = 6) => {
    const now = new Date();
    const monthlyTotals = [];
    
    for (let i = 0; i < months; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const monthlyTransactions = transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate >= monthStart && tDate <= monthEnd;
        });
        
        const total = monthlyTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        monthlyTotals.push({
            month: date.toLocaleString('default', { month: 'short' }),
            year: date.getFullYear(),
            total
        });
    }
    
    return monthlyTotals.reverse();
};

// Sleep function for delays
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Remove sensitive data from object
const sanitizeUser = (user) => {
    const { password, __v, ...sanitizedUser } = user.toObject ? user.toObject() : user;
    return sanitizedUser;
};

// Parse CSV data (basic implementation)
const parseCSV = (csvString) => {
    const lines = csvString.trim().split('\n');
    const headers = lines[0].split(',');
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};
        headers.forEach((header, index) => {
            row[header.trim()] = values[index] ? values[index].trim() : '';
        });
        data.push(row);
    }
    
    return data;
};

// Validate date range
const isValidDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end && !isNaN(start) && !isNaN(end);
};

module.exports = {
    formatCurrency,
    formatDate,
    getCurrentMonthYear,
    getMonthDateRange,
    calculatePercentage,
    generateRandomId,
    isValidEmail,
    isValidAmount,
    groupByCategory,
    sumByCategory,
    getTopSpendingCategories,
    calculateMonthlyAverage,
    sleep,
    sanitizeUser,
    parseCSV,
    isValidDateRange
};
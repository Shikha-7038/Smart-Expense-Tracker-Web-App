const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
    try {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        
        // Get current month's start and end dates
        const monthStart = new Date(currentYear, currentMonth - 1, 1);
        const monthEnd = new Date(currentYear, currentMonth, 0);
        
        // Get last 6 months for trend
        const sixMonthsAgo = new Date(currentYear, currentMonth - 6, 1);
        
        // Current month transactions
        const currentMonthTransactions = await Transaction.find({
            userId: req.user._id,
            date: { $gte: monthStart, $lte: monthEnd }
        });
        
        // Calculate current month totals
        const currentMonthIncome = currentMonthTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        const currentMonthExpense = currentMonthTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        // Get monthly trend for last 6 months
        const monthlyTrend = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date(currentYear, currentMonth - i - 1, 1);
            const start = new Date(date.getFullYear(), date.getMonth(), 1);
            const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            const transactions = await Transaction.find({
                userId: req.user._id,
                date: { $gte: start, $lte: end }
            });
            
            const income = transactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);
            
            const expense = transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);
            
            monthlyTrend.push({
                month: start.toLocaleString('default', { month: 'short' }),
                income,
                expense,
                year: start.getFullYear()
            });
        }
        
        // Get category-wise spending for current month
        const categorySpending = {};
        currentMonthTransactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                if (!categorySpending[t.category]) {
                    categorySpending[t.category] = 0;
                }
                categorySpending[t.category] += Math.abs(t.amount);
            });
        
        // Get recent transactions (last 5)
        const recentTransactions = await Transaction.find({ userId: req.user._id })
            .sort({ date: -1 })
            .limit(5);
        
        // Get budget status
        const budgets = await Budget.find({
            userId: req.user._id,
            month: currentMonth,
            year: currentYear
        });
        
        const budgetStatus = budgets.map(budget => {
            const spent = categorySpending[budget.category] || 0;
            return {
                category: budget.category,
                budget: budget.amount,
                spent,
                remaining: budget.amount - spent,
                percentage: (spent / budget.amount) * 100
            };
        });
        
        res.json({
            currentMonth: {
                income: currentMonthIncome,
                expense: currentMonthExpense,
                balance: currentMonthIncome - currentMonthExpense,
                month: monthStart.toLocaleString('default', { month: 'long' })
            },
            monthlyTrend,
            categorySpending,
            recentTransactions,
            budgetStatus,
            totalTransactions: currentMonthTransactions.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getDashboardData
};
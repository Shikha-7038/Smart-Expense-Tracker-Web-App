const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// @desc    Create or update budget
// @route   POST /api/budgets
// @access  Private
const setBudget = async (req, res) => {
    try {
        const { category, amount, month, year } = req.body;
        
        // Check if budget exists for this category and month
        let budget = await Budget.findOne({
            userId: req.user._id,
            category,
            month,
            year
        });
        
        if (budget) {
            // Update existing budget
            budget.amount = amount;
            await budget.save();
            res.json({ message: 'Budget updated successfully', budget });
        } else {
            // Create new budget
            budget = await Budget.create({
                userId: req.user._id,
                category,
                amount,
                month,
                year
            });
            res.status(201).json({ message: 'Budget created successfully', budget });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all budgets for a user
// @route   GET /api/budgets
// @access  Private
const getBudgets = async (req, res) => {
    try {
        const { month, year } = req.query;
        
        let query = { userId: req.user._id };
        
        if (month && year) {
            query.month = parseInt(month);
            query.year = parseInt(year);
        } else {
            const now = new Date();
            query.month = now.getMonth() + 1;
            query.year = now.getFullYear();
        }
        
        const budgets = await Budget.find(query);
        
        // Get actual spending for each category
        const startDate = new Date(query.year, query.month - 1, 1);
        const endDate = new Date(query.year, query.month, 0);
        
        const transactions = await Transaction.find({
            userId: req.user._id,
            type: 'expense',
            date: { $gte: startDate, $lte: endDate }
        });
        
        // Calculate spent amount per category
        const spentMap = {};
        transactions.forEach(t => {
            if (!spentMap[t.category]) {
                spentMap[t.category] = 0;
            }
            spentMap[t.category] += Math.abs(t.amount);
        });
        
        // Combine budget with actual spending
        const budgetsWithSpending = budgets.map(budget => ({
            ...budget.toObject(),
            spent: spentMap[budget.category] || 0,
            remaining: budget.amount - (spentMap[budget.category] || 0),
            percentage: ((spentMap[budget.category] || 0) / budget.amount) * 100
        }));
        
        res.json(budgetsWithSpending);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a budget
// @route   DELETE /api/budgets/:id
// @access  Private
const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        
        if (budget.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        await budget.deleteOne();
        res.json({ message: 'Budget deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Check budget alerts
// @route   GET /api/budgets/alerts
// @access  Private
const getBudgetAlerts = async (req, res) => {
    try {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        
        const budgets = await Budget.find({
            userId: req.user._id,
            month: currentMonth,
            year: currentYear
        });
        
        const startDate = new Date(currentYear, currentMonth - 1, 1);
        const endDate = new Date(currentYear, currentMonth, 0);
        
        const transactions = await Transaction.find({
            userId: req.user._id,
            type: 'expense',
            date: { $gte: startDate, $lte: endDate }
        });
        
        // Calculate spending per category
        const spentMap = {};
        transactions.forEach(t => {
            if (!spentMap[t.category]) {
                spentMap[t.category] = 0;
            }
            spentMap[t.category] += Math.abs(t.amount);
        });
        
        // Generate alerts for budgets that are over 80%
        const alerts = [];
        budgets.forEach(budget => {
            const spent = spentMap[budget.category] || 0;
            const percentage = (spent / budget.amount) * 100;
            
            if (percentage >= 80 && percentage < 100) {
                alerts.push({
                    category: budget.category,
                    message: `You've used ${percentage.toFixed(0)}% of your ${budget.category} budget`,
                    severity: 'warning'
                });
            } else if (percentage >= 100) {
                alerts.push({
                    category: budget.category,
                    message: `You've exceeded your ${budget.category} budget by ₹${(spent - budget.amount).toFixed(0)}`,
                    severity: 'danger'
                });
            }
        });
        
        res.json(alerts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    setBudget,
    getBudgets,
    deleteBudget,
    getBudgetAlerts
};
const Transaction = require('../models/Transaction');

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const { page = 1, limit = 10, type, category, startDate, endDate } = req.query;
        
        // Build query
        const query = { userId: req.user._id };
        
        if (type) query.type = type;
        if (category) query.category = category;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }
        
        // Pagination
        const skip = (page - 1) * limit;
        
        const transactions = await Transaction.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        const total = await Transaction.countDocuments(query);
        
        res.json({
            transactions,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = async (req, res) => {
    try {
        const { amount, category, description, date, type } = req.body;
        
        const transaction = await Transaction.create({
            userId: req.user._id,
            amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
            category,
            description,
            date: date || Date.now(),
            type
        });
        
        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        
        // Check ownership
        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        const { amount, category, description, date, type } = req.body;
        
        transaction.amount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;
        transaction.date = date || transaction.date;
        transaction.type = type || transaction.type;
        
        const updatedTransaction = await transaction.save();
        
        res.json(updatedTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        
        // Check ownership
        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        await transaction.deleteOne();
        
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get transaction summary
// @route   GET /api/transactions/summary
// @access  Private
const getTransactionSummary = async (req, res) => {
    try {
        const { period = 'month' } = req.query;
        
        let startDate;
        const now = new Date();
        
        if (period === 'week') {
            startDate = new Date(now.setDate(now.getDate() - 7));
        } else if (period === 'month') {
            startDate = new Date(now.setMonth(now.getMonth() - 1));
        } else if (period === 'year') {
            startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        } else {
            startDate = new Date(now.setMonth(now.getMonth() - 1));
        }
        
        const transactions = await Transaction.find({
            userId: req.user._id,
            date: { $gte: startDate }
        });
        
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        // Category-wise spending
        const categorySpending = {};
        transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                if (!categorySpending[t.category]) {
                    categorySpending[t.category] = 0;
                }
                categorySpending[t.category] += Math.abs(t.amount);
            });
        
        res.json({
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            categorySpending,
            transactionCount: transactions.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionSummary
};
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            // Income Categories
            'Salary', 
            'Freelance',      // ✅ ADD THIS
            'Investment', 
            'Gift', 
            'Refund', 
            'Bonus', 
            'Rental Income', 
            'Business', 
            'Other Income',
            // Expense Categories
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
        ]
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    }
}, {
    timestamps: true
});

// Index for faster queries
transactionSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
const express = require('express');
const router = express.Router();
const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionSummary
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const { validateTransaction } = require('../middleware/validationMiddleware');

// All routes are protected
router.use(protect);

router.route('/')
    .get(getTransactions)
    .post(validateTransaction, createTransaction);

router.get('/summary', getTransactionSummary);

router.route('/:id')
    .put(validateTransaction, updateTransaction)
    .delete(deleteTransaction);

module.exports = router;
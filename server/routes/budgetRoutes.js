const express = require('express');
const router = express.Router();
const {
    setBudget,
    getBudgets,
    deleteBudget,
    getBudgetAlerts
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');
const { validateBudget } = require('../middleware/validationMiddleware');

// All routes are protected
router.use(protect);

router.route('/')
    .get(getBudgets)
    .post(validateBudget, setBudget);

router.get('/alerts', getBudgetAlerts);

router.route('/:id')
    .delete(deleteBudget);

module.exports = router;
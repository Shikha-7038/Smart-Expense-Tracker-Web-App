/**
 * Application Constants and Configuration
 */

// User roles
const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    PREMIUM: 'premium'
};

// Transaction categories
const TRANSACTION_CATEGORIES = {
    INCOME: [
        'Salary',
        'Freelance',
        'Investment',
        'Gift',
        'Refund',
        'Bonus',
        'Rental Income',
        'Business',
        'Other Income'
    ],
    EXPENSE: [
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
};

// Transaction types
const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense'
};

// Budget periods
const BUDGET_PERIODS = {
    MONTHLY: 'monthly',
    WEEKLY: 'weekly',
    YEARLY: 'yearly'
};

// Alert severity levels
const ALERT_SEVERITY = {
    INFO: 'info',
    WARNING: 'warning',
    DANGER: 'danger',
    SUCCESS: 'success'
};

// Budget threshold percentages for alerts
const BUDGET_THRESHOLDS = {
    WARNING: 80, // 80% of budget used
    DANGER: 100, // 100% of budget used
    CRITICAL: 120 // 120% of budget exceeded
};

// Pagination defaults
const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
};

// HTTP status codes
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
};

// API response messages
const RESPONSE_MESSAGES = {
    // Success messages
    LOGIN_SUCCESS: 'Logged in successfully',
    REGISTER_SUCCESS: 'User registered successfully',
    LOGOUT_SUCCESS: 'Logged out successfully',
    FETCH_SUCCESS: 'Data fetched successfully',
    CREATE_SUCCESS: 'Created successfully',
    UPDATE_SUCCESS: 'Updated successfully',
    DELETE_SUCCESS: 'Deleted successfully',
    
    // Error messages
    LOGIN_ERROR: 'Invalid email or password',
    REGISTER_ERROR: 'Registration failed',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
    DUPLICATE_ERROR: 'Duplicate entry found',
    
    // Budget messages
    BUDGET_EXCEEDED: 'Budget limit exceeded',
    BUDGET_WARNING: 'Approaching budget limit',
    BUDGET_CREATED: 'Budget created successfully',
    BUDGET_UPDATED: 'Budget updated successfully',
    
    // Transaction messages
    TRANSACTION_ADDED: 'Transaction added successfully',
    TRANSACTION_UPDATED: 'Transaction updated successfully',
    TRANSACTION_DELETED: 'Transaction deleted successfully'
};

// Date formats
const DATE_FORMATS = {
    DEFAULT: 'YYYY-MM-DD',
    DISPLAY: 'DD MMM YYYY',
    DISPLAY_WITH_TIME: 'DD MMM YYYY, hh:mm A',
    API: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    MONTH_YEAR: 'MMM YYYY'
};

// Currency settings
const CURRENCY = {
    CODE: 'INR',
    SYMBOL: '₹',
    LOCALE: 'en-IN'
};

// File upload settings
const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf']
};

// CSV import mapping
const CSV_MAPPING = {
    DEFAULT_MAPPING: {
        date: 'date',
        amount: 'amount',
        description: 'description',
        category: 'category',
        type: 'type'
    },
    BANK_MAPPINGS: {
        hdfc: {
            date: 'Transaction Date',
            amount: 'Amount',
            description: 'Narration',
            type: 'Transaction Type'
        },
        icici: {
            date: 'Value Date',
            amount: 'Amount',
            description: 'Description',
            type: 'Transaction Remarks'
        }
    }
};

// Cache settings
const CACHE = {
    TTL: 3600, // 1 hour in seconds
    MAX_KEYS: 1000,
    CHECK_PERIOD: 600 // 10 minutes
};

// Rate limiting settings
const RATE_LIMIT = {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
    MESSAGE: 'Too many requests from this IP, please try again later.'
};

// JWT settings
const JWT = {
    EXPIRES_IN: '30d',
    REFRESH_EXPIRES_IN: '7d',
    ALGORITHM: 'HS256'
};

// Password settings
const PASSWORD = {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50,
    SALT_ROUNDS: 10
};

// Dashboard default settings
const DASHBOARD = {
    DEFAULT_PERIOD: 'month',
    DEFAULT_TRANSACTIONS_LIMIT: 5,
    CHART_COLORS: [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#F59E0B', // Yellow
        '#EF4444', // Red
        '#8B5CF6', // Purple
        '#EC4899', // Pink
        '#14B8A6', // Teal
        '#F97316'  // Orange
    ]
};

// Export all constants
module.exports = {
    USER_ROLES,
    TRANSACTION_CATEGORIES,
    TRANSACTION_TYPES,
    BUDGET_PERIODS,
    ALERT_SEVERITY,
    BUDGET_THRESHOLDS,
    PAGINATION,
    HTTP_STATUS,
    RESPONSE_MESSAGES,
    DATE_FORMATS,
    CURRENCY,
    FILE_UPLOAD,
    CSV_MAPPING,
    CACHE,
    RATE_LIMIT,
    JWT,
    PASSWORD,
    DASHBOARD
};
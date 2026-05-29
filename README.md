# 💰 Smart Expense Tracker Web App

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node](https://img.shields.io/badge/Node-18.x-green)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)
![License](https://img.shields.io/badge/license-MIT-yellow)

A **full-stack expense tracking application** built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that helps users manage personal finances, track expenses, set budgets, and visualize spending patterns through interactive charts and reports.

## 📱 Live Demo

> **Frontend:** http://localhost:3000  
> **Backend API:** http://localhost:5000  
> **API Health Check:** http://localhost:5000/api/health

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure JWT-based login/registration system
- 💵 **Income & Expense Tracking** - Add, edit, delete transactions with ease
- 📊 **Dashboard Analytics** - Visual insights with interactive charts
- 🎯 **Budget Management** - Set monthly budgets per category
- 📈 **Financial Reports** - Generate detailed spending reports
- 🔔 **Budget Alerts** - Get notified when nearing budget limits
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Advanced Features
- 🏷️ **Category Management** - Organize transactions by custom categories
- 📅 **Monthly Trends** - Track spending patterns over time
- 🥧 **Visual Analytics** - Pie charts, bar charts, and line graphs
- 💾 **Data Export** - Export reports in JSON format
- 🔍 **Search & Filter** - Find transactions quickly
- ✏️ **CRUD Operations** - Complete control over your data

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.2.0 | UI Framework |
| Vite | 5.0.0 | Build Tool |
| Tailwind CSS | 3.3.6 | Styling |
| Recharts | 2.10.0 | Data Visualization |
| React Router DOM | 6.20.0 | Routing |
| Axios | 1.6.0 | API Calls |
| React Icons | 5.0.0 | Icons |
| jwt-decode | 4.0.0 | Token Decoding |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime |
| Express.js | 4.18.2 | Web Framework |
| MongoDB | 4.4 | Database |
| Mongoose | 8.0.0 | ODM |
| JSON Web Token | 9.0.2 | Authentication |
| Bcryptjs | 2.4.3 | Password Hashing |
| Express Validator | 7.0.1 | Input Validation |
| Morgan | 1.10.0 | Logging |
| Cors | 2.8.5 | CORS Handling |

## 📁 Project Structure
```
Smart-Expense-Tracker-Web-App/
│
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── Layout/
│ │ │ │ ├── Header.jsx # Navigation bar
│ │ │ │ ├── Footer.jsx # Footer component
│ │ │ │ └── Sidebar.jsx # Side navigation
│ │ │ ├── Common/
│ │ │ │ ├── Alert.jsx # Notification alerts
│ │ │ │ ├── Loader.jsx # Loading spinner
│ │ │ │ └── PrivateRoute.jsx # Protected routes
│ │ │ ├── Charts/
│ │ │ │ ├── CategoryPieChart.jsx
│ │ │ │ ├── MonthlyTrendChart.jsx
│ │ │ │ └── BudgetProgress.jsx
│ │ │ ├── Transactions/
│ │ │ │ ├── TransactionForm.jsx
│ │ │ │ ├── TransactionList.jsx
│ │ │ │ └── TransactionFilters.jsx
│ │ │ └── Budget/
│ │ │ ├── BudgetForm.jsx
│ │ │ └── BudgetList.jsx
│ │ ├── pages/
│ │ │ ├── Login.jsx # Login page
│ │ │ ├── Register.jsx # Registration page
│ │ │ ├── Dashboard.jsx # Main dashboard
│ │ │ ├── Transactions.jsx # Transaction management
│ │ │ ├── Budgets.jsx # Budget management
│ │ │ └── Reports.jsx # Financial reports
│ │ ├── services/
│ │ │ ├── api.js # Axios configuration
│ │ │ ├── auth.js # Auth API calls
│ │ │ ├── transaction.js # Transaction API calls
│ │ │ ├── budget.js # Budget API calls
│ │ │ └── dashboard.js # Dashboard API calls
│ │ ├── context/
│ │ │ └── AuthContext.jsx # Authentication context
│ │ ├── utils/
│ │ │ ├── constants.js # App constants
│ │ │ └── helpers.js # Utility functions
│ │ ├── styles/
│ │ │ └── index.css # Tailwind imports
│ │ ├── App.jsx # Main app component
│ │ └── main.jsx # Entry point
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ ├── tailwind.config.js
│ └── postcss.config.js
│
├── server/ # Node.js Backend
│ ├── models/
│ │ ├── User.js # User schema
│ │ ├── Transaction.js # Transaction schema
│ │ └── Budget.js # Budget schema
│ ├── controllers/
│ │ ├── authController.js # Auth logic
│ │ ├── transactionController.js # Transaction logic
│ │ ├── budgetController.js # Budget logic
│ │ └── dashboardController.js # Dashboard logic
│ ├── routes/
│ │ ├── authRoutes.js # Auth endpoints
│ │ ├── transactionRoutes.js # Transaction endpoints
│ │ ├── budgetRoutes.js # Budget endpoints
│ │ └── dashboardRoutes.js # Dashboard endpoints
│ ├── middleware/
│ │ ├── authMiddleware.js # JWT verification
│ │ ├── validationMiddleware.js # Input validation
│ │ └── errorMiddleware.js # Error handling
│ ├── config/
│ │ ├── db.js # Database connection
│ │ └── constants.js # Server constants
│ ├── utils/
│ │ └── helpers.js # Utility functions
│ ├── server.js # Entry point
│ ├── package.json
│ └── .env
│
├── docs/ # Documentation
│ └── screenshots/ # App screenshots
│
├── .gitignore
└── README.md
```

## 🚀 Installation Guide

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas** account - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** (comes with Node.js)

```bash
 - Step 1: Clone the Repository
git clone https://github.com/yourusername/Smart-Expense-Tracker-Web-App.git
cd Smart-Expense-Tracker-Web-App

 - Step 2: Backend Setup
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create environment file
echo ".env" >> .gitignore
Create server/.env file:

env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/expense_tracker_db
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development

 - Step 3: Frontend Setup

# Navigate to client folder (from root)
cd ../client

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api" > .env

 - Step 4: MongoDB Atlas Setup
 Create a cluster on MongoDB Atlas (Free tier)
 Create a database user with read/write permissions
 Whitelist IP address (add 0.0.0.0/0 for development)
 Get connection string and update MONGO_URI in .env
 Create database named expense_tracker_db

 - Step 5: Run the Application
Terminal 1 - Backend:
cd server
npm run dev

Terminal 2 - Frontend:
cd client
npm run dev

 - Step 6: Access the App
Frontend: http://localhost:3000
Backend API: http://localhost:5000
Health Check: http://localhost:5000/api/health
```

## 🎯 How to Use the App
1. Create an Account
 - Go to Register page
 - Enter Name, Email, and Password (min 6 characters)
 - Click Sign Up

2. Add Income
 - Go to Transactions page
 - Click Add Transaction
 - Select Type: Income
 - Enter Amount, Category, Description, Date
 - Click Save

3. Add Expenses
 - Go to Transactions page
 - Click Add Transaction
 - Select Type: Expense
 - Enter Amount, Category, Description, Date
 - Click Save

4. Set Budgets
 - Go to Budgets page
 - Click Set Budget
 - Select Category, Amount, Month, Year
 - Click Save Budget

5. View Analytics
 - Dashboard - See spending overview, charts, and budget progress
 - Reports - Get detailed financial reports
 - Transactions - Manage and filter all transactions

## 📊 Sample Data for Testing

# Income Transactions
| Amount | Category | Description |
| ₹50,000 | Salary | Monthly Salary |
| ₹5,000 | Freelance | Website Project |
| ₹2,000 | Investment | Stock Dividends |
| ₹1,000 | Gift | Birthday Gift |

# Expense Transactions
| Amount | Category | Description |
| ₹15,000 | Rent | Monthly Rent |
| ₹4,000 | Food | Groceries |
| ₹2,000 | Food | Restaurant |
| ₹3,000 | Shopping | Clothes |
| ₹2,000 | Bills | Electricity |
| ₹1,500 | Transport | Metro Card |

# Budgets
| Category | Amount |
| Rent | ₹15,000 |
| Food | ₹8,000 |
| Transport | ₹3,000 |
| Shopping | ₹5,000 |
| Bills | ₹3,000 |

## 🔧 Troubleshooting
**MongoDB Connection Error**
 - Error: MongooseServerSelectionError
 - Solution: Check MONGO_URI in .env, verify IP whitelist in MongoDB Atlas

**CORS Error**
 - Access to XMLHttpRequest blocked by CORS policy
 - Solution: Ensure backend is running on port 5000, check Vite proxy config

**JWT Token Error**
 - 401 Unauthorized
 - Solution: Clear localStorage and login again

**Port Already in Use**
 - Error: listen EADDRINUSE: address already in use :::5000
 - Solution: Kill process using the port or change PORT in .env

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
 - Fork the repository
 - Create a feature branch (git checkout -b feature/AmazingFeature)
 - Commit changes (git commit -m 'Add some AmazingFeature')
 - Push to branch (git push origin feature/AmazingFeature)
 - Open a Pull Request

## 🙏 Acknowledgments
 - MongoDB Atlas for free database hosting
 - Vite for fast React tooling
 - Tailwind CSS for amazing utility classes
 - Recharts for beautiful charts

## ⭐ Show Your Support
 - If you found this project helpful, please give it a ⭐ on GitHub!

## 🎓 Learning Outcomes
This project demonstrates:
 - ✅ Full-stack development with MERN stack
 - ✅ JWT authentication & authorization
 - ✅ CRUD operations implementation
 - ✅ RESTful API design
 - ✅ MongoDB schema design & relationships
 - ✅ Data visualization with charts
 - ✅ Responsive UI with Tailwind CSS
 - ✅ Error handling & validation
 - ✅ Environment configuration
 - ✅ Git workflow & version control

Built with ❤️ for the Full Stack Development Course
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryPieChart from '../components/Charts/CategoryPieChart';
import MonthlyTrendChart from '../components/Charts/MonthlyTrendChart';
import BudgetProgress from '../components/Charts/BudgetProgress';
import Alert from '../components/Common/Alert';
import Loader from '../components/Common/Loader';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    currentMonth: { income: 0, expense: 0, balance: 0, month: '' },
    monthlyTrend: [],
    categorySpending: {},
    recentTransactions: [],
    budgetStatus: []
  });
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    fetchAlerts();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/dashboard');
      console.log('Dashboard API Response:', response.data); // Debug log
      
      // Safely set data with fallbacks
      setDashboardData({
        currentMonth: {
          income: response.data?.currentMonth?.income || 0,
          expense: response.data?.currentMonth?.expense || 0,
          balance: response.data?.currentMonth?.balance || 0,
          month: response.data?.currentMonth?.month || new Date().toLocaleString('default', { month: 'long' })
        },
        monthlyTrend: response.data?.monthlyTrend || [],
        categorySpending: response.data?.categorySpending || {},
        recentTransactions: response.data?.recentTransactions || [],
        budgetStatus: response.data?.budgetStatus || []
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('/api/budgets/alerts');
      setAlerts(response.data || []);
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
      setAlerts([]);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Alert type="error" message={error} />
        <button onClick={fetchDashboardData} className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700">
          Try Again
        </button>
      </div>
    );
  }

  // Prepare data for charts with safe defaults
  const pieChartData = Object.entries(dashboardData.categorySpending || {}).map(([name, value]) => ({ 
    name, 
    value: value 
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6">
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              type={alert.severity === 'danger' ? 'error' : 'warning'}
              message={alert.message}
            />
          ))}
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{dashboardData.currentMonth.income.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">{dashboardData.currentMonth.month}</p>
            </div>
            <div className="text-green-500 text-3xl">📈</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{dashboardData.currentMonth.expense.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">{dashboardData.currentMonth.month}</p>
            </div>
            <div className="text-red-500 text-3xl">📉</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Balance</p>
              <p className={`text-2xl font-bold ${dashboardData.currentMonth.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ₹{dashboardData.currentMonth.balance.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">Net savings</p>
            </div>
            <div className="text-blue-500 text-3xl">💰</div>
          </div>
        </div>
      </div>
      
      {/* Charts - Only show if there's data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {dashboardData.monthlyTrend.length > 0 ? (
          <MonthlyTrendChart 
            data={dashboardData.monthlyTrend} 
            title="Income vs Expense Trend"
            type="line"
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Income vs Expense Trend</h3>
            <p className="text-gray-500 text-center py-8">No trend data available. Add transactions to see charts.</p>
          </div>
        )}
        
        {pieChartData.length > 0 ? (
          <CategoryPieChart 
            data={pieChartData} 
            title="Category-wise Spending"
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Category-wise Spending</h3>
            <p className="text-gray-500 text-center py-8">No spending data available. Add expenses to see charts.</p>
          </div>
        )}
      </div>
      
      {/* Budget Progress */}
      <div className="mb-8">
        <BudgetProgress budgets={dashboardData.budgetStatus} />
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <button 
            onClick={fetchDashboardData} 
            className="text-blue-600 hover:text-blue-700 transition flex items-center space-x-1"
          >
            <span>🔄</span>
            <span className="text-sm">Refresh</span>
          </button>
        </div>
        
        {dashboardData.recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentTransactions.map((transaction) => (
                  <tr key={transaction._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {transaction.description || '-'}
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {transaction.category}
                      </span>
                    </td>
                    <td className={`px-4 py-2 text-right font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions yet</p>
            <p className="text-sm text-gray-400 mt-2">Add your first transaction to get started</p>
          </div>
        )}
      </div>
      
      {/* Debug Info - Remove after testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <details>
            <summary className="cursor-pointer font-semibold">Debug Info (Click to expand)</summary>
            <pre className="mt-2 text-xs overflow-auto">
              {JSON.stringify(dashboardData, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
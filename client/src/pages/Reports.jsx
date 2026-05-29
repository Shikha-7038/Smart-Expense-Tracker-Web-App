import { useState, useEffect } from 'react';
import axios from 'axios';
// Header import removed - it's now commented out
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FiDownload } from 'react-icons/fi';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      const summaryRes = await axios.get(`/api/transactions/summary?period=${period}`);
      setSummary(summaryRes.data);
      
      // Generate trend data from category spending
      const trend = Object.entries(summaryRes.data.categorySpending || {}).map(([name, value]) => ({
        name,
        amount: value
      }));
      setTrendData(trend);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(summary, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `expense_report_${new Date().toISOString()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      // Removed Header and min-h-screen bg-gray-100 since App.jsx already has it
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    // Removed the outer div with min-h-screen and bg-gray-100
    // Removed the <Header /> component
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <div className="flex space-x-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input-field w-32"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <button onClick={exportData} className="btn-primary flex items-center space-x-2">
            <FiDownload />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
          <p className="text-sm opacity-90">Total Income</p>
          <p className="text-2xl font-bold">₹{summary?.totalIncome?.toLocaleString() || 0}</p>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <p className="text-sm opacity-90">Total Expenses</p>
          <p className="text-2xl font-bold">₹{summary?.totalExpense?.toLocaleString() || 0}</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <p className="text-sm opacity-90">Net Savings</p>
          <p className="text-2xl font-bold">₹{summary?.balance?.toLocaleString() || 0}</p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Spending Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Category-wise Spending</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={trendData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={130}
                fill="#8884d8"
                dataKey="amount"
              >
                {trendData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Income vs Expense Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={[
                { name: period === 'week' ? 'Last 7 Days' : period === 'month' ? 'Last 30 Days' : 'Last 12 Months', 
                  income: summary?.totalIncome || 0, 
                  expense: summary?.totalExpense || 0 }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="income" fill="#10B981" name="Income" />
              <Bar dataKey="expense" fill="#EF4444" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Detailed Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-right">Amount Spent</th>
                <th className="px-4 py-3 text-right">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {trendData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      {item.name}
                    </div>
                   </td>
                  <td className="px-4 py-3 text-right">₹{item.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    {((item.amount / summary?.totalExpense) * 100).toFixed(1)}%
                  </td>
                 </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right">₹{summary?.totalExpense?.toLocaleString() || 0}</td>
                <td className="px-4 py-3 text-right">100%</td>
               </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
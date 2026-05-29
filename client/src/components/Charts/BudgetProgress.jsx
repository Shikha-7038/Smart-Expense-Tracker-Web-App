import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const BudgetProgress = ({ budgets = [] }) => {
  const [selectedBudget, setSelectedBudget] = useState(null);

  // Filter out budgets with zero amount (they might be invalid)
  const validBudgets = budgets.filter(b => b.amount > 0);
  
  if (!validBudgets || validBudgets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Budget Progress</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No budgets set for this period</p>
          <p className="text-sm text-gray-400 mt-2">Click "Set Budget" to create one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Budget Progress</h3>
      <div className="space-y-4">
        {validBudgets.map((budget) => {
          const spent = budget.spent || 0;
          const amount = budget.amount || 0;
          const percentage = amount > 0 ? (spent / amount) * 100 : 0;
          const remaining = amount - spent;
          
          return (
            <div key={budget._id || budget.category}>
              <div className="flex justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">{budget.category}</span>
                  {percentage >= 80 && <FiAlertCircle className="h-4 w-4 text-yellow-500" />}
                </div>
                <span className="text-sm text-gray-600">
                  ₹{spent.toLocaleString()} / ₹{amount.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    percentage >= 100 ? 'bg-red-600' :
                    percentage >= 80 ? 'bg-yellow-500' :
                    percentage >= 50 ? 'bg-blue-500' : 'bg-green-600'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Remaining: ₹{remaining.toLocaleString()}</span>
                <span className={`text-xs font-medium ${
                  percentage >= 100 ? 'text-red-600' :
                  percentage >= 80 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {percentage.toFixed(0)}% used
                </span>
              </div>
              {percentage >= 80 && (
                <p className="text-xs text-yellow-600 mt-1">
                  ⚠️ {percentage >= 100 ? 'Budget exceeded!' : `Only ₹${remaining.toLocaleString()} remaining`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetProgress;
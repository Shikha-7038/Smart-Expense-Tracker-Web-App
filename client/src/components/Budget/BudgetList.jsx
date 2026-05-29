import { FiTrash2, FiEdit2, FiAlertCircle } from 'react-icons/fi';

const BudgetList = ({ budgets, onDelete, onEdit }) => {
  const getStatusColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-600';
    if (percentage >= 80) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-green-600';
  };

  const getStatusText = (percentage) => {
    if (percentage >= 100) return 'Exceeded';
    if (percentage >= 80) return 'Near Limit';
    if (percentage >= 50) return 'Moderate';
    return 'Good';
  };

  if (budgets.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <FiAlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No budgets set for this period</p>
        <p className="text-sm text-gray-400 mt-2">Click "Set Budget" to create one</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {budgets.map((budget) => (
        <div key={budget._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{budget.category}</h3>
              <p className="text-sm text-gray-500">
                {new Date(budget.year, budget.month - 1).toLocaleString('default', { month: 'long' })} {budget.year}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(budget)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FiEdit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(budget._id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Spent</span>
              <span className="text-sm text-gray-600">
                ₹{budget.spent?.toLocaleString() || 0} / ₹{budget.amount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(budget.percentage)}`}
                style={{ width: `${Math.min(budget.percentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-gray-600">Remaining: </span>
              <span className="font-semibold text-gray-800">
                ₹{budget.remaining?.toLocaleString() || 0}
              </span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              budget.percentage >= 100 ? 'bg-red-100 text-red-700' :
              budget.percentage >= 80 ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {getStatusText(budget.percentage)}
            </div>
          </div>

          {budget.percentage >= 80 && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700 flex items-center">
                <FiAlertCircle className="h-4 w-4 mr-1" />
                {budget.percentage >= 100 
                  ? `⚠️ Exceeded by ₹${(budget.spent - budget.amount).toLocaleString()}`
                  : `⚠️ Only ₹${budget.remaining.toLocaleString()} remaining`
                }
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BudgetList;
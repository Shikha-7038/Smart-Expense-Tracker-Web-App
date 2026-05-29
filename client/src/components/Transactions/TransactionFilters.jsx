import { useState } from 'react';
import { FiCalendar, FiFilter, FiX } from 'react-icons/fi';

const TransactionFilters = ({ onFilter, onClear, categories }) => {
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const activeFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        activeFilters[key] = filters[key];
      }
    });
    onFilter(activeFilters);
  };

  const handleClear = () => {
    setFilters({
      type: '',
      category: '',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: ''
    });
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(v => v);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center space-x-2">
          <FiFilter className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-700">Advanced Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
              Active
            </span>
          )}
        </div>
        <span className="text-gray-500">{isExpanded ? '▲' : '▼'}</span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Transaction Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Min Amount (₹)</label>
              <input
                type="number"
                name="minAmount"
                value={filters.minAmount}
                onChange={handleChange}
                placeholder="0"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Max Amount (₹)</label>
              <input
                type="number"
                name="maxAmount"
                value={filters.maxAmount}
                onChange={handleChange}
                placeholder="Any"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button onClick={handleClear} className="btn-secondary flex items-center space-x-1">
              <FiX />
              <span>Clear All</span>
            </button>
            <button onClick={handleApply} className="btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;
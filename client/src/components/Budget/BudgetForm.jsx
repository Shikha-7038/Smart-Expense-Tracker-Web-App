import { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

const BudgetForm = ({ onSubmit, onCancel, initialData = null, categories }) => {
  const [formData, setFormData] = useState({
    category: initialData?.category || categories[0] || '',
    amount: initialData?.amount || '',
    month: initialData?.month || new Date().getMonth() + 1,
    year: initialData?.year || new Date().getFullYear()
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category || categories[0] || '',
        amount: initialData.amount || '',
        month: initialData.month || new Date().getMonth() + 1,
        year: initialData.year || new Date().getFullYear()
      });
    }
  }, [initialData, categories]);

  const validate = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount is required';
    if (!formData.month || formData.month < 1 || formData.month > 12) newErrors.month = 'Valid month is required';
    if (!formData.year || formData.year < 2020 || formData.year > 2030) newErrors.year = 'Valid year is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Category *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`input-field ${errors.category ? 'border-red-500' : ''}`}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Budget Amount (₹) *</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter budget amount"
          className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
          step="0.01"
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Month *</label>
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className={`input-field ${errors.month ? 'border-red-500' : ''}`}
          >
            {monthNames.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          {errors.month && <p className="text-red-500 text-sm mt-1">{errors.month}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Year *</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={`input-field ${errors.year ? 'border-red-500' : ''}`}
            min="2020"
            max="2030"
          />
          {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-700">
          📌 Setting budget for: <strong>{monthNames[formData.month - 1]} {formData.year}</strong>
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary flex items-center space-x-2">
          <FiX />
          <span>Cancel</span>
        </button>
        <button type="submit" className="btn-primary flex items-center space-x-2">
          <FiSave />
          <span>{initialData ? 'Update' : 'Save'} Budget</span>
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
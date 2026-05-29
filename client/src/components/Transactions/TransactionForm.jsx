import { useState, useEffect } from 'react';
import { FiSave, FiX, FiPlus } from 'react-icons/fi';

const TransactionForm = ({ onSubmit, onCancel, initialData = null, categories }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: categories[0] || 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense'
  });

  const [errors, setErrors] = useState({});
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: Math.abs(initialData.amount).toString(),
        category: initialData.category,
        description: initialData.description || '',
        date: new Date(initialData.date).toISOString().split('T')[0],
        type: initialData.type
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (formData.type === 'expense' && formData.amount > 100000) {
      newErrors.amount = 'Amount seems unusually high. Please verify';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let finalCategory = formData.category;
      if (showCustomCategory && customCategory) {
        finalCategory = customCategory;
      }
      onSubmit({ ...formData, category: finalCategory });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCustomCategory = () => {
    if (customCategory) {
      setFormData(prev => ({ ...prev, category: customCategory }));
      setShowCustomCategory(false);
      setCustomCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Type *</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">Expense</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleChange}
                className="w-4 h-4 text-green-600"
              />
              <span className="text-gray-700">Income</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Amount (₹) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
            step="0.01"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Category *</label>
        {!showCustomCategory ? (
          <div className="flex space-x-2">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input-field flex-1 ${errors.category ? 'border-red-500' : ''}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowCustomCategory(true)}
              className="btn-secondary flex items-center space-x-1"
            >
              <FiPlus />
              <span>New</span>
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter custom category"
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={handleCustomCategory}
              className="btn-primary"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowCustomCategory(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        )}
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description (optional)"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`input-field ${errors.date ? 'border-red-500' : ''}`}
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary flex items-center space-x-2">
          <FiX />
          <span>Cancel</span>
        </button>
        <button type="submit" className="btn-primary flex items-center space-x-2">
          <FiSave />
          <span>{initialData ? 'Update' : 'Save'} Transaction</span>
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
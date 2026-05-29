import { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetForm from '../components/Budget/BudgetForm';
import BudgetList from '../components/Budget/BudgetList';
import Alert from '../components/Common/Alert';
import Loader from '../components/Common/Loader';
import { EXPENSE_CATEGORIES } from '../utils/constants';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [alert, setAlert] = useState(null);
  
  // State for selected month/year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchBudgets();
  }, [selectedMonth, selectedYear]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/budgets?month=${selectedMonth}&year=${selectedYear}`);
      setBudgets(response.data);
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
      setAlert({ type: 'error', message: 'Failed to load budgets' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await axios.post('/api/budgets', formData);
      setAlert({ 
        type: 'success', 
        message: editingBudget ? 'Budget updated successfully!' : 'Budget created successfully!' 
      });
      resetForm();
      fetchBudgets(); // Refresh with current selected month/year
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Failed to save budget:', error);
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to save budget' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await axios.delete(`/api/budgets/${id}`);
        setAlert({ type: 'success', message: 'Budget deleted successfully!' });
        fetchBudgets();
        setTimeout(() => setAlert(null), 3000);
      } catch (error) {
        console.error('Failed to delete budget:', error);
        setAlert({ type: 'error', message: 'Failed to delete budget' });
      }
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingBudget(null);
    setShowForm(false);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Go to current month
  const goToCurrentMonth = () => {
    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isCurrentMonth = selectedMonth === new Date().getMonth() + 1 && 
                         selectedYear === new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Budget Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <span className="text-lg">+</span>
          <span>{showForm ? 'Cancel' : 'Set Budget'}</span>
        </button>
      </div>
      
      {/* Month/Year Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FiChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <FiCalendar className="h-5 w-5 text-blue-600" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="input-field w-40 text-center font-semibold"
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="input-field w-24 text-center font-semibold"
                  min="2020"
                  max="2030"
                />
              </div>
            </div>
            
            {!isCurrentMonth && (
              <button
                onClick={goToCurrentMonth}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Go to Current Month
              </button>
            )}
          </div>
          
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FiChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            Showing budgets for {monthNames[selectedMonth - 1]} {selectedYear}
            {isCurrentMonth && <span className="ml-2 text-green-600">(Current Month)</span>}
          </p>
        </div>
      </div>
      
      {alert && <Alert type={alert.type} message={alert.message} />}
      
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingBudget ? 'Edit Budget' : `Set Budget for ${monthNames[selectedMonth - 1]} ${selectedYear}`}
          </h2>
          <BudgetForm
            onSubmit={handleSubmit}
            onCancel={resetForm}
            initialData={editingBudget || { month: selectedMonth, year: selectedYear }}
            categories={EXPENSE_CATEGORIES}
          />
        </div>
      )}
      
      {loading ? (
        <Loader />
      ) : (
        <>
          {budgets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 mb-4">
                No budgets set for {monthNames[selectedMonth - 1]} {selectedYear}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Set Budget for this Month
              </button>
            </div>
          ) : (
            <BudgetList
              budgets={budgets}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Budgets;
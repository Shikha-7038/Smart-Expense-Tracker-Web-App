import { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from '../components/Transactions/TransactionForm';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionFilters from '../components/Transactions/TransactionFilters';
import Alert from '../components/Common/Alert';
import Loader from '../components/Common/Loader';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/constants';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiRefreshCw } from 'react-icons/fi';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({});
  const [alert, setAlert] = useState(null);

  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/transactions', { params: filters });
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setAlert({ type: 'error', message: 'Failed to load transactions' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTransaction) {
        await axios.put(`/api/transactions/${editingTransaction._id}`, formData);
        setAlert({ type: 'success', message: 'Transaction updated successfully!' });
      } else {
        await axios.post('/api/transactions', formData);
        setAlert({ type: 'success', message: 'Transaction added successfully!' });
      }
      resetForm();
      fetchTransactions();
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Failed to save transaction:', error);
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to save transaction' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`/api/transactions/${id}`);
        setAlert({ type: 'success', message: 'Transaction deleted successfully!' });
        fetchTransactions();
        setTimeout(() => setAlert(null), 3000);
      } catch (error) {
        console.error('Failed to delete transaction:', error);
        setAlert({ type: 'error', message: 'Failed to delete transaction' });
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const resetForm = () => {
    setEditingTransaction(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <span className="text-lg">+</span>
          <span>{showForm ? 'Cancel' : 'Add Transaction'}</span>
        </button>
      </div>
      
      {/* Alerts */}
      {alert && <Alert type={alert.type} message={alert.message} />}
      
      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
          </h2>
          <TransactionForm
            onSubmit={handleSubmit}
            onCancel={resetForm}
            initialData={editingTransaction}
            categories={allCategories}
          />
        </div>
      )}
      
      {/* Filters */}
      <TransactionFilters
        onFilter={handleFilter}
        onClear={handleClearFilters}
        categories={allCategories}
      />
      
      {/* Loading State */}
      {loading ? (
        <div className="mt-8">
          <Loader />
        </div>
      ) : (
        <div className="mt-6">
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Transactions;
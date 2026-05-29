import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser, FiHome, FiList, FiPieChart, FiBarChart2 } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <span className="font-bold text-xl text-gray-800">ExpenseTracker</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition">
                <FiHome />
                <span>Dashboard</span>
              </Link>
              <Link to="/transactions" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition">
                <FiList />
                <span>Transactions</span>
              </Link>
              <Link to="/budgets" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition">
                <FiPieChart />
                <span>Budgets</span>
              </Link>
              <Link to="/reports" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition">
                <FiBarChart2 />
                <span>Reports</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <FiUser className="text-white h-4 w-4" />
              </div>
              <span className="text-gray-700">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition"
            >
              <FiLogOut />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiList, 
  FiPieChart, 
  FiBarChart2, 
  FiSettings, 
  FiHelpCircle,
  FiDollarSign 
} from 'react-icons/fi';

const Sidebar = ({ isOpen = true, onClose }) => {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: FiHome },
    { path: '/transactions', name: 'Transactions', icon: FiList },
    { path: '/budgets', name: 'Budgets', icon: FiPieChart },
    { path: '/reports', name: 'Reports', icon: FiBarChart2 },
    { path: '/settings', name: 'Settings', icon: FiSettings },
    { path: '/help', name: 'Help', icon: FiHelpCircle },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <FiDollarSign className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">ExpenseTracker</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">User Name</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
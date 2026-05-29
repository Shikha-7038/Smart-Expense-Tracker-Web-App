import { useNavigate } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // Simple navigation - App.jsx will handle auth redirect
    navigate(path);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-12">
      {/* Wave SVG Top */}
      <div className="relative">
        <svg className="absolute top-0 left-0 w-full -mt-1" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path 
            fill="#1f2937" 
            d="M0,32L48,29.3C96,27,192,21,288,21.3C384,21,480,27,576,32C672,37,768,43,864,42.7C960,43,1056,37,1152,32C1248,27,1344,21,1392,18.7L1440,16L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">💰</span>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Smart Expense Tracker
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Take control of your finances with our intelligent expense tracking solution. 
              Track spending, set budgets, and achieve your financial goals with ease.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-400 text-xs">
                <span>📈</span>
                <span>Smart Insights</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-400 text-xs">
                <span>🔒</span>
                <span>Secure Data</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-400 text-xs">
                <span>❤️</span>
                <span>Made with Love</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-2"></div>
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/')}
                  className="text-gray-300 hover:text-white text-sm transition flex items-center space-x-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all"></span>
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/transactions')}
                  className="text-gray-300 hover:text-white text-sm transition flex items-center space-x-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all"></span>
                  <span>Transactions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/budgets')}
                  className="text-gray-300 hover:text-white text-sm transition flex items-center space-x-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all"></span>
                  <span>Budgets</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/reports')}
                  className="text-gray-300 hover:text-white text-sm transition flex items-center space-x-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all"></span>
                  <span>Reports</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 relative">
              Connect With Us
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-2"></div>
            </h4>
            <div className="flex space-x-3 mb-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <FiGithub className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <FiTwitter className="h-5 w-5 text-white" />
              </a>
              <a 
                href="mailto:support@expensetracker.com" 
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <span className="text-white text-lg">📧</span>
              </a>
            </div>
            <p className="text-gray-400 text-xs">
              Need help? Contact us at<br />
              <a href="mailto:support@expensetracker.com" className="text-blue-400 hover:text-blue-300">
                support@expensetracker.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Smart Expense Tracker. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-300 text-xs transition">
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-gray-300 text-xs transition">
                Terms of Service
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-gray-300 text-xs transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
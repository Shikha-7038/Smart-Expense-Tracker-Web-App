import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Common/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                      <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
                      <Route path="/budgets" element={<PrivateRoute><Budgets /></PrivateRoute>} />
                      <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
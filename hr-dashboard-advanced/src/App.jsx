import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Dashboard from './pages/Dashboard';
import EmployeeDetails from './pages/EmployeeDetails';
import Bookmarks from './pages/Bookmarks';
import Analytics from './pages/Analytics';
import useStore from './store/useStore';

const App = () => {
  const { darkMode, toggleDarkMode } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!mounted) {
    return null;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-12">
                <Link
                  to="/"
                  className="text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  HR Dashboard
                </Link>
                <div className="hidden md:flex space-x-10">
                  <Link
                    to="/"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-5 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <i className="fa fa-dashboard text-base mr-2"></i>
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <Link
                    to="/bookmarks"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-5 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <i className="fa fa-bookmark text-base mr-2"></i>
                    <span className="font-medium">Bookmarks</span>
                  </Link>
                  <Link
                    to="/analytics"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-5 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <i className="fa fa-bar-chart text-base mr-2"></i>
                    <span className="font-medium">Analytics</span>
                  </Link>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {darkMode ? (
                  <SunIcon className="w-6 h-6" />
                ) : (
                  <MoonIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

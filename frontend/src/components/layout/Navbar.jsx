import { FaMoon, FaSun } from 'react-icons/fa';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, theme, toggleTheme } = useAuth(); // ✨ Get user from context

  const baseLinkClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClass = "bg-primary text-white";
  const inactiveLinkClass = "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">ExpenseTracker</h1>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <RouterNavLink
                  to="/dashboard"
                  className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                >
                  Dashboard
                </RouterNavLink>
                <RouterNavLink
                  to="/transactions"
                  className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                >
                  Transactions
                </RouterNavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* ✨ Display User Name */}
            {user && (
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                Hi, {user.name}
              </span>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
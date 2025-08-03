import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast'; // We'll create a custom hook for toast
import authService from '../services/authService';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ name, email, password });
      addToast({
        type: 'success',
        message: 'Registration Successful. Please log in.',
      });
      navigate('/login');
    } catch (error) {
      addToast({
        type: 'error',
        message: error.response?.data || 'An error occurred during registration.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create a new account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            to start tracking your expenses
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input id="email-address" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Sign up
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already a user?{' '}
            <RouterLink to="/login" className="font-medium text-primary hover:text-primary-hover">
              Login
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  );
}
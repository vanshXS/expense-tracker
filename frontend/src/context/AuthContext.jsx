import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import userService from '../services/userService'; // ✨ Import user service

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null); // ✨ Add state for user details
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    if (localStorage.getItem('authToken')) {
      try {
        const response = await userService.getProfile();
        setUser(response.data); // ✨ Store user data
      } catch (error) {
        // If token is invalid, log the user out
        console.error("Failed to fetch profile, logging out.", error);
        logout();
      }
    }
  }, []);

  // ✨ Fetch user profile on initial load if token exists
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      const { token: newToken } = response.data;
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      await fetchUserProfile(); // ✨ Fetch profile right after login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null); // ✨ Clear user data on logout
    navigate('/login');
  };

  const value = {
    token,
    user, // ✨ Expose user data
    isLoggedIn: !!token,
    login,
    logout,
    theme,
    toggleTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
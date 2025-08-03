import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // User not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
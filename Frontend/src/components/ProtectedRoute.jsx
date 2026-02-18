import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * ProtectedRoute Component
 * 
 * This component wraps routes that should only be accessible to authenticated users.
 * If user is not logged in, they are redirected to the login page.
 * 
 * Usage:
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */
function ProtectedRoute({ children }) {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the component
  return children;
}

export default ProtectedRoute;

/**
 * Protected route component that requires authentication
 * Redirects to login if user is not authenticated
 */
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { getCurrentUser } from '../../store/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireOnboarding = false 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { user, token, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // If we have a token but no user data, fetch the user
    if (token && !user && !isLoading) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user, isLoading]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to onboarding if user hasn't completed it and it's required
  if (user && !user.hasCompletedOnboarding && !requireOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  // Redirect to matching if user has completed onboarding but is trying to access onboarding
  if (user && user.hasCompletedOnboarding && requireOnboarding) {
    return <Navigate to="/match" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
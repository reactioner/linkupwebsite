/**
 * OAuth callback component for handling LinkedIn authentication response
 * Processes the callback and redirects user appropriately
 */
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import type { AppDispatch } from '../../store';
import { setToken, getCurrentUser } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async (): Promise<void> => {
      try {
        // Extract token from URL parameters
        const token = authService.handleOAuthCallback(searchParams);
        
        if (token) {
          // Store token and fetch user data
          dispatch(setToken(token));
          const userResult = await dispatch(getCurrentUser());
          
          if (getCurrentUser.fulfilled.match(userResult)) {
            const user = userResult.payload;
            
            // Redirect based on onboarding status
            if (user.hasCompletedOnboarding) {
              navigate('/dashboard', { replace: true });
            } else {
              navigate('/onboarding', { replace: true });
            }
          } else {
            // Failed to fetch user data
            navigate('/login?error=auth_failed', { replace: true });
          }
        } else {
          // No token in callback
          const error = searchParams.get('error');
          navigate(`/login?error=${error || 'auth_failed'}`, { replace: true });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login?error=auth_failed', { replace: true });
      }
    };

    handleCallback();
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        {/* Loading Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto"
        />
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Completing your login...
          </h2>
          <p className="text-gray-600">
            Please wait while we set up your profile
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCallback;
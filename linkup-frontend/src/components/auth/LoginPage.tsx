/**
 * Login page component for LinkUp application
 * Handles mock LinkedIn authentication for development with splash screen
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mockLinkedInLogin } from '../../store/slices/authSlice';
import linkupLogo from '../../assets/linkuplogo.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLinkedInLogin = async (): Promise<void> => {
    try {
      await dispatch(mockLinkedInLogin()).unwrap();
      // Redirect to onboarding after successful login
      navigate('/onboarding');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {showSplash ? (
        // Splash Screen - Logo takes up whole screen
        <div className="min-h-screen flex items-center justify-center">
          <img
            src={linkupLogo}
            alt="LinkUp"
            className="h-64 w-auto"
          />
        </div>
      ) : (
        // Login Screen - No logo, just login form
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-600">
                Professional dating for ambitious minds
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              {/* LinkedIn Login Button */}
              <button
                onClick={handleLinkedInLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>{isLoading ? 'Logging in...' : 'Continue with LinkedIn'}</span>
              </button>

              {/* Features List */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Verified professional profiles</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Career-focused matching</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Secure and private</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
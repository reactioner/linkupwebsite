/**
 * Login page component for LinkUp application
 * Handles LinkedIn OAuth authentication flow
 */
import React from 'react';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';

const LoginPage: React.FC = () => {
  const handleLinkedInLogin = (): void => {
    authService.initiateLinkedInAuth();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Logo and Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            LinkUp
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600"
          >
            Professional dating for ambitious minds
          </motion.p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Connect with verified professionals in your area
            </p>
          </div>

          {/* LinkedIn Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLinkedInLogin}
            className="w-full bg-linkedin-500 hover:bg-linkedin-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-3"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>Continue with LinkedIn</span>
          </motion.button>

          {/* Features List */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Verified professional profiles</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Career-focused matching</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Secure and private</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-sm text-gray-500"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
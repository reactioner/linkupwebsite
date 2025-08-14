/**
 * Main App component for LinkUp dating application
 * Implements routing and Redux provider setup
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { logout } from './store/slices/authSlice';
import LoginPage from './components/auth/LoginPage';
import AuthCallback from './components/auth/AuthCallback';
import ProtectedRoute from './components/auth/ProtectedRoute';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import MainLayout from './components/layout/MainLayout';
import MatchingInterface from './components/matching/MatchingInterface';
import ProfileView from './components/profile/ProfileView';
import linkupLogo from './assets/linkuplogo.png';

// Dashboard component showing successful login
const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img
                src={linkupLogo}
                alt="LinkUp"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              {user?.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-gray-700 font-medium">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome to LinkUp! 🎉
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              You've successfully logged in with your test account. This is where the main app interface will be built.
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <div className="text-center space-y-4">
              {user?.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-primary-100"
                />
              )}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-gray-600">{user?.email}</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Verified Professional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Profiles</h3>
              <p className="text-gray-600 text-sm">Connect with verified professionals in your industry</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-4">❤️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h3>
              <p className="text-gray-600 text-sm">Career-focused algorithm for meaningful connections</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Chat</h3>
              <p className="text-gray-600 text-sm">Secure messaging with your professional matches</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Matching page component
const MatchPage: React.FC = () => {
  return (
    <MainLayout>
      <MatchingInterface />
    </MainLayout>
  );
};

// Profile page component
const ProfilePage: React.FC = () => {
  return (
    <MainLayout>
      <ProfileView />
    </MainLayout>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Protected Routes */}
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <OnboardingFlow />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/match" 
              element={
                <ProtectedRoute>
                  <MatchPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

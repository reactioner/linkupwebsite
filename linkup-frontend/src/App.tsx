/**
 * Main App component for LinkUp dating application
 * Implements routing and Redux provider setup
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginPage from './components/auth/LoginPage';
import AuthCallback from './components/auth/AuthCallback';
import ProtectedRoute from './components/auth/ProtectedRoute';
import WelcomeStep from './components/onboarding/WelcomeStep';

// Placeholder components for routes that will be implemented later
const Dashboard: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <p className="text-gray-600">Coming soon - Discovery and matching interface</p>
    </div>
  </div>
);

const OnboardingFlow: React.FC = () => {
  const handleNext = (): void => {
    // TODO: Implement navigation to next onboarding step
    console.log('Navigate to next step');
  };

  return (
    <WelcomeStep 
      onNext={handleNext} 
      userName="Professional" // TODO: Get from Redux state
    />
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
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

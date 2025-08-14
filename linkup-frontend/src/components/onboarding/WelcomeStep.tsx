/**
 * Welcome step component for onboarding flow
 * First step that welcomes users and explains the process
 */
import React from 'react';
import { motion } from 'framer-motion';
import OnboardingLayout from './OnboardingLayout';

interface WelcomeStepProps {
  onNext: () => void;
  userName: string;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, userName }) => {
  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={6}
      title={`Welcome to LinkUp, ${userName}!`}
      subtitle="Let's set up your professional dating profile"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Welcome Message */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto"
          >
            <svg
              className="w-10 h-10 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </motion.div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            We've imported your professional information from LinkedIn. 
            Now let's create your dating profile to help you connect with 
            like-minded professionals.
          </p>
        </div>

        {/* What to Expect */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 text-center">
            What to expect:
          </h3>
          
          <div className="grid gap-4">
            {[
              {
                icon: "👤",
                title: "Review Your LinkedIn Profile",
                description: "We'll show you the professional information we've imported"
              },
              {
                icon: "💝",
                title: "Create Your Dating Profile",
                description: "Add personal details, interests, and what you're looking for"
              },
              {
                icon: "📸",
                title: "Upload Photos",
                description: "Add 2-6 photos to showcase your personality"
              },
              {
                icon: "📍",
                title: "Set Your Location",
                description: "Help us find matches in your area"
              },
              {
                icon: "✨",
                title: "Preview & Launch",
                description: "Review everything and start connecting!"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50"
              >
                <div className="text-2xl">{step.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
        >
          Let's Get Started
        </motion.button>

        {/* Time Estimate */}
        <p className="text-center text-sm text-gray-500">
          This should take about 5 minutes to complete
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default WelcomeStep;
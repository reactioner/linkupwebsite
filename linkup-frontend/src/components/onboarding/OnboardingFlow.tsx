/**
 * Onboarding flow component with personalization questions
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { completeOnboarding } from '../../store/slices/authSlice';

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const steps = [
    {
      title: "Let's get started!",
      subtitle: "Tell us a bit about yourself",
      question: "What's your age range?",
      options: ["22-26", "27-31", "32-36", "37-41", "42+"]
    },
    {
      title: "Great choice!",
      subtitle: "Let's learn more about you",
      question: "What industry do you work in?",
      options: ["Technology", "Finance", "Healthcare", "Marketing", "Consulting"]
    },
    {
      title: "Perfect!",
      subtitle: "Almost there...",
      question: "What are you looking for?",
      options: ["Serious relationship", "Dating", "Networking", "Friends", "Open to anything"]
    },
    {
      title: "Excellent!",
      subtitle: "One more thing...",
      question: "How far are you willing to travel?",
      options: ["5 miles", "10 miles", "25 miles", "50 miles", "Anywhere"]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and go to matching
      setIsCompleting(true);
      dispatch(completeOnboarding());
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        navigate('/match');
      }, 500);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentStepData.title}
            </h1>
            <p className="text-lg text-gray-600">
              {currentStepData.subtitle}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentStepData.question}
            </h2>

            <div className="space-y-3">
              {currentStepData.options.map((option) => (
                <button
                  key={option}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-700">{option}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isCompleting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
            >
              {isCompleting ? 'Getting your matches ready...' : 
               currentStep < steps.length - 1 ? 'Next' : 'Start Matching!'}
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
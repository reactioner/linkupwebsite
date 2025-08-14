/**
 * User profile view component
 */
import React from 'react';
import { useAppSelector } from '../../store/hooks';

const ProfileView: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const mockProfileData = {
    bio: "Passionate product manager with 5+ years of experience building user-centric solutions. Love exploring new technologies and connecting with like-minded professionals.",
    interests: ["Technology", "Product Management", "Hiking", "Coffee", "Travel", "Photography"],
    education: "MBA from Stanford University",
    company: "Senior Product Manager at Google",
    location: "San Francisco, CA",
    lookingFor: "Serious relationship",
    ageRange: "25-35",
    distance: "25 miles"
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute top-4 right-4">
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                <span className="text-sm">✏️</span>
              </button>
            </div>
          </div>
          
          <div className="relative px-6 pb-6">
            <div className="flex items-end space-x-4 -mt-16">
              <img
                src={user?.profilePicture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}
                alt={user?.name || 'Profile'}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div className="pb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Alex Johnson'}</h1>
                <p className="text-gray-600">28 years old</p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="mr-2">💼</span>
            Professional
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">{mockProfileData.company}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">🎓</span>
              <span className="text-gray-700">{mockProfileData.education}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">📍</span>
              <span className="text-gray-700">{mockProfileData.location}</span>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{mockProfileData.bio}</p>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {mockProfileData.interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Looking For</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Relationship Type</p>
              <p className="font-medium text-gray-900">{mockProfileData.lookingFor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age Range</p>
              <p className="font-medium text-gray-900">{mockProfileData.ageRange}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="font-medium text-gray-900">{mockProfileData.distance}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default ProfileView;
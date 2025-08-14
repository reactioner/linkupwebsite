/**
 * Matching interface with swipeable demo profiles
 */
import React, { useState } from 'react';
import pfp1 from '../../assets/pfp1.jpeg';
import pfp2 from '../../assets/pfp2.jpeg';
import pfp3 from '../../assets/pfp3.jpeg';
import pfp4 from '../../assets/pfp4.jpeg';
import pfp5 from '../../assets/pfp5.jpeg';

interface Profile {
  id: number;
  name: string;
  age: number;
  title: string;
  company: string;
  location: string;
  image: string;
  tagline: string;
  bio: string;
  interests: string[];
}

const demoProfiles: Profile[] = [
  {
    id: 1,
    name: "Anant Dwivedi",
    age: 28,
    title: "Founder & CEO",
    company: "Tech Startup",
    location: "San Francisco, CA",
    image: pfp1,
    tagline: "Equally passionate about scaling a startup and a mountain. Let's explore both.",
    bio: "I'm a builder at heart. I get a huge amount of energy from turning an idea into something real that people can use. That same drive for exploration extends to my life outside of work - I'm an avid traveler with a passion for diverse cultures and perspectives.",
    interests: ["Entrepreneurship", "Travel", "Global Cuisine", "Adventure"]
  },
  {
    id: 2,
    name: "Rachandeep Kaur",
    age: 26,
    title: "AI Engineer",
    company: "Google",
    location: "Mountain View, CA",
    image: pfp2,
    tagline: "Full time startup founder, part-time short king.",
    bio: "Building cool things with great people. Also, perfecting my chai recipe. I'm one of those people who genuinely loves what they do - solving puzzles in the world of AI and finding that perfect 'aha!' moment when everything clicks.",
    interests: ["AI & Technology", "Chai Making", "Hiking", "Board Games"]
  },
  {
    id: 3,
    name: "Alexander Permut",
    age: 31,
    title: "Founder & CTO",
    company: "Deep Tech Startup",
    location: "Boston, MA",
    image: pfp3,
    tagline: "Melon enthusiast.",
    bio: "PhD from MIT turned entrepreneur, driven by curiosity and a love for both intellectual challenges and outdoor adventures. I thrive on deep, intellectual conversations—the kind where you lose track of time.",
    interests: ["Deep Tech", "Skiing", "Hiking", "Intellectual Debates"]
  },
  {
    id: 4,
    name: "Ke Xin Chong",
    age: 27,
    title: "Strategy Lead",
    company: "Fintech Startup",
    location: "New York, NY",
    image: pfp4,
    tagline: "Looking for a partner in crime for both global adventures and finding the best local food truck.",
    bio: "I'm a strategist who loves the big picture, passionate about travel, and always on a quest for amazing meals around the world. My friends would tell you I'm the one who always has a plan for our next adventure.",
    interests: ["Strategy", "Travel", "Food & Wine", "Global Cuisine"]
  },
  {
    id: 5,
    name: "King T.",
    age: 29,
    title: "Product Manager",
    company: "Google",
    location: "San Francisco, CA",
    image: pfp5,
    tagline: "I love wearing black shirts.",
    bio: "By day, I build products at Google. By night, I tell stories through a camera lens. Fascinated by the power of storytelling, whether through product design or visual media. Always looking for interesting shots and meaningful connections.",
    interests: ["Product Design", "Photography", "Film", "Storytelling"]
  }
];

const MatchingInterface: React.FC = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentProfile = demoProfiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return; // Prevent multiple swipes during animation
    
    setSwipeDirection(direction);
    setIsAnimating(true);
    
    // Show swipe feedback
    setTimeout(() => {
      if (currentProfileIndex < demoProfiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0); // Loop back to first profile
      }
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">No more profiles!</h2>
          <p className="text-gray-600">Check back later for new matches.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-sm mx-auto">
      <div className="relative w-full max-w-sm">
        {/* Swipe Feedback Overlay */}
        {swipeDirection && (
          <div className={`absolute inset-0 z-10 flex items-center justify-center rounded-3xl ${
            swipeDirection === 'right' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <div className={`text-6xl font-bold ${
              swipeDirection === 'right' ? 'text-green-500' : 'text-red-500'
            }`}>
              {swipeDirection === 'right' ? '♥' : '✕'}
            </div>
          </div>
        )}
        
        {/* Profile Card */}
        <div className={`w-full bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          swipeDirection === 'left' ? 'transform -translate-x-full opacity-0' : 
          swipeDirection === 'right' ? 'transform translate-x-full opacity-0' : ''
        }`}>
          {/* Profile Image */}
          <div className="relative h-96">
            <img
              src={currentProfile.image}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <p className="text-white font-medium drop-shadow-md">
                  {currentProfile.title} at {currentProfile.company}
                </p>
                <p className="text-white/90 text-sm drop-shadow-md">
                  📍 {currentProfile.location}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-5">
            {/* Prominent Tagline */}
            <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
              <p className="text-white font-bold text-xl text-center">
                "{currentProfile.tagline}"
              </p>
            </div>
            
            {/* Bio Section */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-800 leading-relaxed font-medium">
                {currentProfile.bio}
              </p>
            </div>
            
            {/* Interests */}
            <div className="space-y-2">
              <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wide">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-6 mt-8">
        <button
          onClick={() => handleSwipe('left')}
          disabled={isAnimating}
          className="w-16 h-16 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        >
          <span className="text-2xl text-gray-600">✕</span>
        </button>

        <button
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          className="w-20 h-20 bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        >
          <span className="text-3xl text-white">♥</span>
        </button>

        <button
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        >
          <span className="text-2xl text-white">★</span>
        </button>
      </div>

      {/* Profile Counter */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {currentProfileIndex + 1} of {demoProfiles.length}
        </p>
        <div className="flex justify-center space-x-1 mt-2">
          {demoProfiles.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentProfileIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingInterface;
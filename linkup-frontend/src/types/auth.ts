/**
 * TypeScript type definitions for authentication-related data structures
 * Following cursor.md protocol - no 'any' types allowed
 */

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  profilePicture?: string;
  headline?: string;
  industry?: string;
  location?: string;
  isVerified: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  isCurrent: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
}

export interface DatingProfile {
  id: string;
  bio?: string;
  age: number;
  location: string;
  interests: string[];
  lookingFor: 'relationship' | 'casual' | 'networking' | 'friends';
  genderPreference: 'men' | 'women' | 'everyone';
  ageRangeMin: number;
  ageRangeMax: number;
  maxDistance: number;
  isActive: boolean;
}

export interface UserPhoto {
  id: string;
  url: string;
  order: number;
  isProfilePicture: boolean;
}

export interface CompleteUserProfile {
  id: string;
  email: string;
  linkedinProfile: LinkedInProfile;
  workExperiences: WorkExperience[];
  education: Education[];
  datingProfile?: DatingProfile;
  photos: UserPhoto[];
  hasCompletedOnboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}
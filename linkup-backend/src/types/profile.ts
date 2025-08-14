import { 
  GenderEnum, 
  RelationshipEnum, 
  HabitEnum, 
  EducationEnum 
} from '@prisma/client';

// Dating Profile Interfaces
export interface DatingProfileInput {
  bio?: string;
  age?: number;
  gender?: GenderEnum;
  lookingFor?: RelationshipEnum[];
  interests?: string[];
  maxDistance?: number;
  minAge?: number;
  maxAge?: number;
  smokingHabits?: HabitEnum[];
  drinkingHabits?: HabitEnum[];
  education?: EducationEnum;
  height?: number;
  profession?: string;
  company?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface DatingProfileUpdate extends DatingProfileInput {
  isVisible?: boolean;
}

export interface DatingProfileResponse {
  id: string;
  bio?: string;
  age?: number;
  gender?: GenderEnum;
  lookingFor: RelationshipEnum[];
  interests: string[];
  maxDistance: number;
  minAge: number;
  maxAge: number;
  smokingHabits: HabitEnum[];
  drinkingHabits: HabitEnum[];
  education?: EducationEnum;
  height?: number;
  profession?: string;
  company?: string;
  isProfileComplete: boolean;
  isVisible: boolean;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Profile Completion Status
export interface ProfileCompletionStatus {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
  requiredFields: string[];
}

// Profile Statistics
export interface ProfileStats {
  totalViews: number;
  totalLikes: number;
  totalMatches: number;
  lastActiveAt: Date;
}

// Validation Error Types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ProfileValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// API Response Types
export interface ProfileApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  validationErrors?: ValidationError[];
}

// Profile Search/Discovery Types
export interface ProfileDiscoveryFilters {
  minAge?: number;
  maxAge?: number;
  maxDistance?: number;
  gender?: GenderEnum;
  lookingFor?: RelationshipEnum[];
  education?: EducationEnum[];
  interests?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ProfileDiscoveryResult {
  profiles: DatingProfileResponse[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}
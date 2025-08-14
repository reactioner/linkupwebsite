---
inclusion: manual
---

# Phase 2: Authentication & Profile System Requirements

## Objectives
- Complete frontend authentication UI implementation
- Build multi-step onboarding flow
- Implement profile management system
- Add photo upload functionality

## Frontend Authentication Components Needed
- `LoginPage` - LinkedIn OAuth initiation
- `AuthCallback` - Handle OAuth callback and token storage
- `OnboardingFlow` - Multi-step profile setup wizard
- `ProfileSetup` - Dating profile creation form
- `PhotoUpload` - Image upload with preview and cropping
- `PermissionsRequest` - Location access request

## Backend Endpoints to Implement
- `POST /api/profile/dating` - Create/update dating profile
- `POST /api/profile/photos` - Upload profile photos
- `GET /api/profile/complete` - Check profile completion status
- `PUT /api/profile/preferences` - Update matching preferences
- `DELETE /api/profile/photos/:id` - Remove profile photo

## Key Features
- LinkedIn profile data display (read-only)
- Dating profile form with validation
- Multi-photo upload with drag-and-drop
- Location permission handling
- Profile completion progress tracking
- Preview mode before profile activation

## Technical Implementation Notes
- Use React Hook Form for all forms
- Implement image compression before upload
- Store photos in Cloudinary/S3 with multiple sizes
- Use Redux for global auth state management
- Implement proper loading states and error handling
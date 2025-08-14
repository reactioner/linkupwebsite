# LinkUp Dating App - Project Requirements Document

## 1. Project Overview

### 1.1 Product Description
LinkUp is a professional dating application that combines career networking with romantic connections. Users authenticate exclusively through LinkedIn, creating profiles that showcase both professional achievements and personal dating preferences.

### 1.2 Core Value Proposition
- Professional verification through LinkedIn integration
- Transparency in career and professional background
- Reduced catfishing through verified professional profiles
- Target demographic: Working professionals seeking meaningful connections

### 1.3 Key Differentiators
- LinkedIn-only authentication
- Immutable professional information display
- Verification badges based on LinkedIn profile verification status
- Career-focused matching context

---

## 2. Technical Architecture

### 2.1 Technology Stack

#### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **Gestures**: React Spring + React Use Gesture (for swipe mechanics)
- **Image Handling**: React Image Gallery, React Dropzone
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Yup validation

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with LinkedIn Strategy
- **File Storage**: AWS S3 or Cloudinary
- **Caching**: Redis
- **Real-time**: Socket.io (for chat functionality)
- **Task Queue**: Bull Queue with Redis
- **Email**: SendGrid or Nodemailer
- **Image Processing**: Sharp

#### Infrastructure
- **Hosting**: Vercel (Frontend) + Railway/Heroku (Backend)
- **Database Hosting**: Supabase or Railway PostgreSQL
- **CDN**: Cloudflare
- **Monitoring**: Sentry for error tracking
- **Analytics**: Mixpanel or Google Analytics

---

## 3. Database Schema

### 3.1 Core Tables
The database schema includes tables for `users`, `linkedin_profiles`, `work_experiences`, `dating_profiles`, `user_photos`, `swipes`, `matches`, and `messages`.

### 3.2 Enums
The schema uses custom enum types for `gender_enum`, `habit_enum`, `education_enum`, `relationship_enum`, `swipe_action_enum`, and `message_type_enum`.

---

## 4. API Integrations

### 4.1 LinkedIn API Integration
- **Required Scopes**: `r_liteprofile`, `r_emailaddress`
- **Implementation**: Must handle the full OAuth 2.0 flow, token refreshes, rate limiting, and data caching.

### 4.2 Third-Party Services
- **Image Storage & Processing**: Cloudinary or AWS S3
- **Geolocation**: Google Maps API or Mapbox
- **Communication**: SendGrid for email notifications

---

## 5. Core Features & User Flows

### 5.1 Authentication Flow
1. User clicks "Continue with LinkedIn".
2. Redirect to LinkedIn OAuth to authorize the app.
3. Backend exchanges the received code for an access token and fetches user data.
4. A new user record is created or an existing one is updated.
5. A JWT session token is generated and sent to the client.
6. User is redirected to the appropriate page (onboarding or discovery).

### 5.2 Profile Setup Flow
1. **Welcome**: A simple welcome screen.
2. **LinkedIn Review**: Display the uneditable LinkedIn data (photo, name, job history) and verification status.
3. **Dating Profile Creation**: A multi-step form for the user to input their editable dating information (bio, interests, preferences, etc.).
4. **Photo Upload**: An interface to upload 2-6 additional photos.
5. **Permissions**: A step to request location access for the matching feature.
6. **Preview**: A final review of the complete profile before activation.

### 5.3 Discovery/Swiping Interface
- **Card Layout**: Each profile card is interactive. The top section shows immutable LinkedIn data. Scrolling down reveals the user-uploaded photos and editable dating profile information.
- **Swipe Mechanics**: Standard swipe right (Like), swipe left (Pass), and swipe up (Super Like) gestures.
- **Matching Algorithm**: Prioritizes users based on location, user-defined preferences (age, gender), and potentially career-related data like industry.

### 5.4 Matching & Chat System
- **Match Creation**: When two users mutually like each other, a match is created. Matches will expire after 30 days of inactivity to keep the match list fresh.
- **Chat**: A real-time chat interface built with Socket.io. It must support message status indicators (sent, delivered, read), image sharing, and GIF integration (e.g., via Giphy API).

---

## 6. Development Implementation Steps

### Phase 1: Foundation Setup
- **Project Initialization**: Set up the frontend (React/TS) and backend (Node.js/TS) project structures, installing all core dependencies listed in the tech stack.
- **Database Setup**: Initialize Prisma, define the complete schema in `prisma/schema.prisma`, and run the initial database migration.
- **LinkedIn API Integration**: Create the LinkedIn Developer App to get credentials. Implement the Passport.js LinkedIn strategy on the backend to handle the OAuth callback.

### Phase 2: Authentication & Profile System
- **Backend Auth Flow**: Create controllers for the `/auth/linkedin/callback` route, JWT generation, and middleware to protect authenticated routes.
- **Frontend Auth Flow**: Use Redux Toolkit to manage authentication state, tokens, and user data globally.
- **Profile Management**: Build the multi-step onboarding UI for new users. Develop the backend endpoints to handle updates to the `dating_profiles` table and manage photo uploads to Cloudinary/S3.

### Phase 3: Discovery & Matching System
- **Swipe Interface**: Develop the `ProfileCard` component using Framer Motion for fluid animations.
- **Discovery Backend**: Implement the discovery algorithm service that fetches a queue of potential matches, filtering out users who have already been swiped on. Use Redis to cache this discovery queue for each user.
- **Chat System**: Set up the Socket.io server and integrate it with the Express app. Implement event handlers for joining rooms, sending messages, and typing indicators. Create REST endpoints for fetching message history.

### Phase 4: Advanced Features & Optimization
- **Image Processing**: Integrate `sharp` on the backend to process images before uploading to Cloudinary/S3, creating optimized versions.
- **Security Hardening**: Implement rate limiting on sensitive endpoints, configure CORS securely, use Helmet.js for security headers, and ensure all user input is validated.
- **Performance Optimization**: Implement frontend code-splitting by route, image lazy loading, and virtual scrolling for chat. On the backend, add necessary database indexes to speed up queries.

### Phase 5: Deployment & Production Setup
- **CI/CD Pipeline**: Write a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automates testing and deployment. On a push to the `main` branch, it should deploy the frontend to Vercel and the backend to Railway/Heroku.
- **Monitoring & Analytics**: Integrate Sentry for error tracking on both frontend and backend. Integrate Mixpanel or Google Analytics on the frontend to track key user events.
- **Production Configuration**: Set up separate production environment variables for databases, API keys, and other secrets. Ensure SSL is enforced.

---

## 7. Testing Requirements

### 7.1 Frontend Testing
- **Unit Tests**: Use Jest and React Testing Library to test individual components (e.g., buttons, input fields).
- **Integration Tests**: Use Cypress or Playwright to test entire user flows, such as signing up, completing a profile, and matching with another user.

### 7.2 Backend Testing
- **Unit Tests**: Use Jest and Supertest to test individual services and controller logic in isolation.
- **API Tests**: Use Postman or write integration tests that make live requests to a test database to ensure endpoints behave as expected.
- **Load Testing**: Use Artillery or k6 to simulate heavy traffic and identify performance bottlenecks before launch.

---

## 8. Success Metrics & KPIs

- **User Engagement**:
    - Daily/Monthly Active Users (DAU/MAU)
    - Average session duration
    - Swipe-to-match ratio
    - Message response rate for new matches
- **Technical Performance**:
    - API response times (p95 should be < 200ms)
    - Application uptime (target 99.9%)
    - Error rates (from Sentry)

---

## 9. Appendix A: Development Checklist

- [ ] LinkedIn Developer Application has been created and approved.
- [ ] Domain has been registered and SSL is configured.
- [ ] All third-party service accounts (Cloudinary, SendGrid, Sentry) are set up.
- [ ] ESLint and Prettier are configured in both frontend and backend projects for consistent code quality.
- [ ] All API keys, database URLs, and other secrets are managed through environment variables and are not committed to version control.
- [ ] A pull request template is created for GitHub to ensure code reviews are standardized.
```
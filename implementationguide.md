# LinkUp Dating App - Development Implementation Guide

This document provides detailed step-by-step instructions for each of the five phases required to successfully implement the LinkUp dating application, from setup to deployment.

---

## Phase 1: Foundation Setup

This phase lays the groundwork for the application’s structure, tools, and basic infrastructure.

### ✅ Objectives
- Initialize project repositories and tech stacks
- Configure the database with Prisma
- Integrate the LinkedIn OAuth strategy

### 📁 Steps

1. **Frontend Initialization**
   - Create a new project using Vite or Create React App with TypeScript:
     ```bash
     npm create vite@latest linkup-frontend --template react-ts
     cd linkup-frontend && npm install
     ```
   - Install essential dependencies:
     ```bash
     npm install react-router-dom @reduxjs/toolkit react-redux framer-motion react-hook-form yup tailwindcss axios
     ```

2. **Backend Initialization**
   - Set up Node.js project with TypeScript:
     ```bash
     mkdir linkup-backend && cd linkup-backend
     npm init -y
     npm install typescript ts-node-dev express prisma @prisma/client cors dotenv passport passport-linkedin-oauth2 jsonwebtoken bcrypt
     npx tsc --init
     ```

3. **Prisma + PostgreSQL Setup**
   - Define schema in `prisma/schema.prisma`:
     ```prisma
     model User {
       id            String   @id @default(cuid())
       email         String   @unique
       name          String
       linkedinId    String   @unique
       profile       DatingProfile?
       ...
     }
     ```
   - Run migration:
     ```bash
     npx prisma migrate dev --name init
     ```

4. **LinkedIn OAuth Integration**
   - Register LinkedIn app and get `clientID` and `clientSecret`
   - In backend, create Passport LinkedIn strategy:
     ```ts
     passport.use(new LinkedInStrategy({
       clientID: process.env.LINKEDIN_CLIENT_ID,
       clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
       callbackURL: "/auth/linkedin/callback",
       scope: ['r_emailaddress', 'r_liteprofile']
     }, async (accessToken, refreshToken, profile, done) => {
       // create or update user logic
     }));
     ```

---

## Phase 2: Authentication & Profile System

This phase handles user onboarding, LinkedIn auth flow, profile creation, and photo uploads.

### ✅ Objectives
- Full OAuth login with LinkedIn
- JWT-based session management
- Editable dating profile with file upload support

### 📁 Steps

1. **Backend Authentication Logic**
   - Add `/auth/linkedin` and `/auth/linkedin/callback` routes
   - On callback, extract LinkedIn profile, create/update DB record, and sign a JWT
   - Send token to client via HTTP-only cookie or redirect with token

2. **Frontend Auth Flow**
   - Create a Redux slice for `auth` state (store JWT, user data)
   - On login:
     ```tsx
     window.location.href = `${API_URL}/auth/linkedin`
     ```
   - After redirection, decode JWT and store in Redux + localStorage

3. **Multi-Step Onboarding UI**
   - Build separate components for each onboarding step:
     - Welcome screen
     - LinkedIn profile preview
     - Dating profile form (bio, interests, preferences)
     - Photo uploader using `react-dropzone`
     - Location permission step (ask for `navigator.geolocation`)
     - Final preview + submit

4. **Photo Upload API**
   - Configure Cloudinary or AWS S3 with signed upload URLs
   - Backend endpoint generates signed upload URLs or proxies uploads

---

## Phase 3: Discovery & Matching System

This phase builds the interactive swipe interface and real-time chat using sockets.

### ✅ Objectives
- Implement Tinder-style swipe cards
- Set up a matchmaking algorithm
- Integrate Socket.io-based chat functionality

### 📁 Steps

1. **Swipe UI with Gestures**
   - Use Framer Motion and React Use Gesture for swipe animations
   - Profile card includes:
     - Top (LinkedIn): Job, name, industry
     - Bottom: User photos + dating info
   - Swipe actions:
     ```tsx
     // on swipe left/right/up, dispatch API to record swipe
     dispatch(recordSwipe(profileId, action))
     ```

2. **Backend Discovery Queue**
   - Use Redis to cache a prefiltered swipe queue
   - Exclude:
     - Users already swiped
     - Incompatible preferences
   - Discovery endpoint returns `n` candidates from Redis or DB fallback

3. **Match & Chat Flow**
   - When user A likes user B, check if B liked A → match
   - Store match in `matches` table
   - Socket.io for real-time communication:
     ```ts
     io.on('connection', socket => {
       socket.on('joinRoom', roomId => socket.join(roomId));
       socket.on('sendMessage', data => io.to(roomId).emit('receiveMessage', data));
     });
     ```

4. **Chat UI**
   - Show messages in a scrollable chat window
   - Support:
     - Seen indicators
     - Typing indicator
     - Image + GIF support (use Giphy SDK for search)

---

## Phase 4: Advanced Features & Optimization

This phase introduces enhancements to performance, security, and user experience.

### ✅ Objectives
- Enhance media handling
- Enforce security best practices
- Improve frontend & backend performance

### 📁 Steps

1. **Image Optimization**
   - On upload, use Sharp to:
     - Resize to multiple sizes (thumbnail, display)
     - Strip metadata
   - Upload to S3 or Cloudinary with proper folder structure

2. **Security Best Practices**
   - Enable rate limiting using `express-rate-limit`
   - Add security headers via `helmet`
   - Validate all API input using `zod` or `yup`
   - CORS configuration to only allow frontend domain

3. **Performance Enhancements**
   - Code splitting via React.lazy + Suspense
   - Lazy load images with `loading="lazy"`
   - Use `react-window` or `virtual` for infinite scroll in chat
   - Backend:
     - Add PostgreSQL indexes on `userId`, `matchId`, `swipe.createdAt`
     - Use Redis for caching heavy read endpoints

---

## Phase 5: Deployment & Production Setup

Final phase includes CI/CD, environment setup, and analytics integration.

### ✅ Objectives
- Deploy production environments
- Set up monitoring and analytics
- Secure environment variables and secrets

### 📁 Steps

1. **CI/CD with GitHub Actions**
   - Create `.github/workflows/deploy.yml`:
     ```yaml
     name: Deploy

     on:
       push:
         branches: [main]

     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - name: Install deps
             run: npm install
           - name: Run Tests
             run: npm test
           - name: Deploy Frontend
             run: vercel --prod
           - name: Deploy Backend
             run: railway up
     ```

2. **Environment Configuration**
   - Use `.env.production` for each environment (frontend and backend)
   - Never commit `.env` files to Git
   - Secrets to store:
     - DB URLs
     - JWT secret
     - LinkedIn API keys
     - Cloudinary/S3 keys

3. **Monitoring Tools**
   - Install Sentry SDK on both React and Node.js
   - Use `Mixpanel` or `Google Analytics` to track:
     - Swipes
     - Matches
     - Profile creation
     - Login retention

4. **Production Readiness**
   - Enforce HTTPS via Vercel/Heroku settings
   - Enable server-side logging (Railway logs, Sentry logs)
   - Monitor Redis, Postgres metrics

---

## ✅ Completion Criteria

Once all five phases are completed, the LinkUp app will be:

- Fully functional with LinkedIn-based dating and networking
- Optimized for performance and secure for production use
- Deployed with a working CI/CD pipeline and analytics tracking
- Prepared for iterative feature improvements based on metrics

---

_This file can be saved as `implementation_guide.md` and used by all team members to follow consistent processes throughout development._
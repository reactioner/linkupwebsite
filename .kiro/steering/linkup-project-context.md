# LinkUp Dating App - Project Context

## Project Overview
LinkUp is a professional dating application that combines career networking with romantic connections. Users authenticate exclusively through LinkedIn, creating profiles that showcase both professional achievements and personal dating preferences.

## Key Technical Requirements
- **Frontend**: React 18+ with TypeScript, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js 18+ with Express.js, TypeScript, Prisma ORM
- **Database**: PostgreSQL with comprehensive schema for users, profiles, matches, messages
- **Authentication**: LinkedIn OAuth 2.0 only - no other auth methods
- **Real-time**: Socket.io for chat functionality
- **File Storage**: AWS S3 or Cloudinary for image handling

## Development Standards
- Use exact dependency versions (no carets/tildes)
- TypeScript strict mode enabled throughout
- Comprehensive error handling and logging
- Security-first approach with rate limiting and input validation
- Professional code organization with clear separation of concerns

## Current Status
Phase 1 (Foundation Setup) is completed. The project has:
- ✅ Frontend and backend project structures initialized
- ✅ Complete database schema with Prisma
- ✅ LinkedIn OAuth integration implemented
- ✅ JWT authentication system
- ✅ Basic API endpoints and middleware

## Architecture Principles
- Separation of professional (LinkedIn) and personal (dating) data
- Immutable LinkedIn profile information
- Scalable matching and discovery system
- Real-time chat with message status tracking
- Professional verification through LinkedIn integration
# LinkUp Dating App 💼❤️

A professional dating application that combines career networking with romantic connections through LinkedIn authentication.

## 🚀 Project Status

**Phase 1: Foundation Setup** ✅ **COMPLETED**
- Frontend and backend project structures initialized
- Complete database schema with Prisma
- LinkedIn OAuth integration implemented
- JWT authentication system
- Basic API endpoints and middleware

**Phase 2: Authentication & Profile System** 🚧 **IN PROGRESS**

## 🏗️ Architecture

```
linkup-website/
├── linkup-frontend/          # React TypeScript Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── store/           # Redux store
│   │   ├── types/           # TypeScript definitions
│   │   ├── utils/           # Helper functions
│   │   └── services/        # API services
│   └── package.json
├── linkup-backend/           # Node.js TypeScript Backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   └── types/           # TypeScript definitions
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
└── .kiro/                   # Kiro AI configuration
    ├── settings/
    │   └── mcp.json         # MCP server configuration
    └── steering/            # Project guidance files
```

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Framer Motion** for animations
- **React Hook Form** + **Yup** for forms

### Backend
- **Node.js 18+** with TypeScript
- **Express.js** web framework
- **Prisma ORM** with PostgreSQL
- **Passport.js** for LinkedIn OAuth
- **JWT** for authentication
- **Socket.io** for real-time chat

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- LinkedIn Developer App credentials

### Frontend Development
```bash
cd linkup-frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Backend Development
```bash
cd linkup-backend
npm install
cp .env.example .env
# Configure your environment variables
npm run prisma:generate
npm run prisma:migrate
npm run dev
# Runs on http://localhost:3001
```

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/linkup"
JWT_SECRET="your-jwt-secret"
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)
```env
VITE_API_URL="http://localhost:3001"
VITE_LINKEDIN_CLIENT_ID="your-linkedin-client-id"
```

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema with the following key models:
- **User** - Core user information
- **LinkedinProfile** - Immutable LinkedIn data
- **DatingProfile** - Mutable dating preferences
- **UserPhoto** - Profile images
- **Swipe** - User interactions
- **Match** - Mutual connections
- **Message** - Chat functionality

## 🔐 Authentication Flow

1. User clicks "Continue with LinkedIn"
2. Redirect to LinkedIn OAuth
3. Backend exchanges code for access token
4. User data fetched and stored
5. JWT token generated and sent to client
6. User redirected to onboarding or discovery

## 🎯 Key Features

- **LinkedIn-only Authentication** - Professional verification
- **Dual Profile System** - LinkedIn (immutable) + Dating (editable)
- **Smart Matching** - Career-aware algorithm
- **Real-time Chat** - Socket.io powered messaging
- **Photo Management** - Multi-image upload with optimization
- **Location-based Discovery** - Geolocation matching

## 🧪 Development with Kiro

This project is optimized for Kiro AI development:

- **Steering Files** - Automatic project context in `.kiro/steering/`
- **MCP Integration** - Task management through `.kiro/settings/mcp.json`
- **Development Standards** - Consistent code quality and security practices
- **Phase-based Development** - Clear progression through implementation phases

Use `#linkup-project-context` to get automatic project guidance, or `#phase-2-requirements` for current development focus.

## 📈 Roadmap

- **Phase 2**: Authentication UI & Profile System
- **Phase 3**: Discovery & Matching System
- **Phase 4**: Advanced Features & Optimization
- **Phase 5**: Deployment & Production Setup

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use exact dependency versions
3. Implement comprehensive error handling
4. Add proper logging and monitoring
5. Follow security best practices

## 📄 License

MIT License - see LICENSE file for details

---

**LinkUp** - Where professional networking meets meaningful connections 💼❤️
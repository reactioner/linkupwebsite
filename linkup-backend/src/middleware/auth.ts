import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        isVerified: boolean;
      };
    }
  }
}

// JWT Authentication Middleware
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required',
        message: 'Please provide a valid authentication token'
      });
    }

    // Check if token is blacklisted
    const blacklistedToken = await prisma.blacklistedToken.findUnique({
      where: { token }
    });

    if (blacklistedToken) {
      return res.status(401).json({ 
        error: 'Token has been revoked',
        message: 'Please log in again'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // Check if user session exists and is active
    const session = await prisma.userSession.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session || !session.isActive || session.expiresAt < new Date()) {
      return res.status(401).json({ 
        error: 'Invalid or expired session',
        message: 'Please log in again'
      });
    }

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      isVerified: decoded.isVerified
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Authentication token is malformed'
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Authentication token has expired, please log in again'
      });
    }

    return res.status(500).json({ 
      error: 'Authentication error',
      message: 'An error occurred during authentication'
    });
  }
};

// Optional auth middleware (doesn't fail if no token)
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      // Check if session exists and is active
      const session = await prisma.userSession.findUnique({
        where: { token },
        include: { user: true }
      });

      if (session && session.isActive && session.expiresAt > new Date()) {
        req.user = {
          userId: decoded.userId,
          email: decoded.email,
          isVerified: decoded.isVerified
        };
      }
    }

    next();
  } catch (error) {
    // For optional auth, we don't return errors, just continue without user
    next();
  }
};

// Middleware to check if user has completed dating profile
export const requireDatingProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Please log in to access this resource'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { datingProfile: true }
    });

    if (!user?.datingProfile?.isProfileComplete) {
      return res.status(403).json({ 
        error: 'Profile incomplete',
        message: 'Please complete your dating profile to access this feature',
        action: 'COMPLETE_PROFILE'
      });
    }

    next();
  } catch (error) {
    console.error('Dating profile check error:', error);
    return res.status(500).json({ 
      error: 'Profile validation error',
      message: 'An error occurred while checking your profile'
    });
  }
};
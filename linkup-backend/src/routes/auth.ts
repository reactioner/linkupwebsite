import express from 'express';
import passport from '../config/passport';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// LinkedIn OAuth Routes

// Start LinkedIn OAuth flow
router.get('/linkedin', (req, res, next) => {
  console.log('Starting LinkedIn OAuth flow');
  passport.authenticate('linkedin', { 
    scope: ['r_liteprofile', 'r_emailaddress'] 
  })(req, res, next);
});

// LinkedIn OAuth callback
router.get('/linkedin/callback', 
  passport.authenticate('linkedin', { session: false }),
  async (req: any, res) => {
    try {
      const { user, token } = req.user;
      
      console.log('LinkedIn OAuth success for user:', user.email);

      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const redirectUrl = `${frontendUrl}/auth/callback?token=${token}&success=true`;
      
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('LinkedIn callback error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const redirectUrl = `${frontendUrl}/auth/callback?error=oauth_failed&success=false`;
      res.redirect(redirectUrl);
    }
  }
);

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Not authenticated',
        message: 'Please log in to view your profile'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        linkedinProfile: true,
        datingProfile: true,
        photos: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User profile could not be found'
      });
    }

    // Remove sensitive information
    const { id, email, isVerified, subscriptionType, linkedinProfile, datingProfile, photos, createdAt } = user;

    res.json({
      success: true,
      user: {
        id,
        email,
        isVerified,
        subscriptionType,
        createdAt,
        linkedinProfile: linkedinProfile ? {
          firstName: linkedinProfile.firstName,
          lastName: linkedinProfile.lastName,
          headline: linkedinProfile.headline,
          profilePictureUrl: linkedinProfile.profilePictureUrl,
          industry: linkedinProfile.industry,
          location: linkedinProfile.location,
          isVerified: linkedinProfile.isVerified
        } : null,
        datingProfile: datingProfile ? {
          bio: datingProfile.bio,
          age: datingProfile.age,
          gender: datingProfile.gender,
          interests: datingProfile.interests,
          isProfileComplete: datingProfile.isProfileComplete,
          isVisible: datingProfile.isVisible
        } : null,
        photos: photos.map(photo => ({
          id: photo.id,
          url: photo.url,
          type: photo.type,
          isMain: photo.isMain,
          order: photo.order,
          isApproved: photo.isApproved
        }))
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ 
      error: 'Profile retrieval failed',
      message: 'An error occurred while retrieving your profile'
    });
  }
});

// Logout route
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Not authenticated',
        message: 'You are not currently logged in'
      });
    }

    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      // Add token to blacklist
      await prisma.blacklistedToken.create({
        data: {
          token,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Keep blacklisted for 7 days
        }
      });

      // Deactivate user session
      await prisma.userSession.updateMany({
        where: { 
          token,
          userId: req.user.userId 
        },
        data: { isActive: false }
      });
    }

    res.json({
      success: true,
      message: 'Successfully logged out'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Logout failed',
      message: 'An error occurred during logout'
    });
  }
});

// Delete account route
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Not authenticated',
        message: 'Please log in to delete your account'
      });
    }

    // Soft delete by deactivating account
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { 
        isActive: false,
        email: `deleted_${Date.now()}_${req.user.email}` // Anonymize email
      }
    });

    // Deactivate all sessions
    await prisma.userSession.updateMany({
      where: { userId: req.user.userId },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Account has been deactivated successfully'
    });
  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({ 
      error: 'Account deletion failed',
      message: 'An error occurred while deleting your account'
    });
  }
});

export default router;
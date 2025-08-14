import passport from 'passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// LinkedIn OAuth Strategy
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID!,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL!,
  scope: ['r_liteprofile', 'r_emailaddress'],
  state: true
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    console.log('LinkedIn Profile received:', profile);
    
    // Extract profile information
    const linkedinId = profile.id;
    const email = profile.emails?.[0]?.value;
    const firstName = profile.name?.givenName || '';
    const lastName = profile.name?.familyName || '';
    const profilePictureUrl = profile.photos?.[0]?.value;
    const headline = profile._json?.headline;
    const summary = profile._json?.summary;
    const industry = profile._json?.industry?.name;
    const location = profile._json?.location?.name;
    const publicProfileUrl = profile._json?.publicProfileUrl;

    if (!email) {
      return done(new Error('Email not provided by LinkedIn'), false);
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
      include: {
        linkedinProfile: true,
        datingProfile: true
      }
    });

    if (user) {
      // Update existing LinkedIn profile
      await prisma.linkedinProfile.update({
        where: { userId: user.id },
        data: {
          firstName,
          lastName,
          headline,
          summary,
          profilePictureUrl,
          industry,
          location,
          publicProfileUrl,
          lastSyncAt: new Date(),
          linkedinData: profile._json
        }
      });

      // Update last active
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() }
      });
    } else {
      // Create new user with LinkedIn profile
      user = await prisma.user.create({
        data: {
          email,
          isVerified: true, // LinkedIn users are considered verified
          linkedinProfile: {
            create: {
              linkedinId,
              firstName,
              lastName,
              headline,
              summary,
              profilePictureUrl,
              industry,
              location,
              publicProfileUrl,
              isVerified: true,
              linkedinData: profile._json,
              lastSyncAt: new Date()
            }
          },
          datingProfile: {
            create: {
              isProfileComplete: false,
              isVisible: false // User needs to complete dating profile first
            }
          }
        },
        include: {
          linkedinProfile: true,
          datingProfile: true
        }
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        isVerified: user.isVerified
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Create user session
    await prisma.userSession.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    return done(null, { user, token });
  } catch (error) {
    console.error('LinkedIn OAuth error:', error);
    return done(error, false);
  }
}));

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        linkedinProfile: true,
        datingProfile: true
      }
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
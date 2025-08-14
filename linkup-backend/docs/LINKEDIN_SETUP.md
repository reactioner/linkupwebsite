# LinkedIn Developer Application Setup Guide

## Overview
This guide will walk you through setting up a LinkedIn Developer Application for the LinkUp dating app OAuth integration.

## Prerequisites
- LinkedIn account (personal or business)
- Access to LinkedIn Developer Portal
- Understanding of OAuth 2.0 flow

## Step 1: Create LinkedIn Developer Account

1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Sign in with your LinkedIn account
3. If you haven't already, accept the Developer Terms of Service

## Step 2: Create a New Application

1. Click "Create App" on the LinkedIn Developer Console
2. Fill in the application details:
   - **App name**: LinkUp Dating App
   - **LinkedIn Page**: Select your company page (create one if needed)
   - **Privacy policy URL**: `https://yourdomain.com/privacy` (update when deployed)
   - **App logo**: Upload the LinkUp logo from `/images` folder
   - **App description**: 
     ```
     LinkUp is a professional dating application that combines career networking 
     with romantic connections through LinkedIn authentication. Users create 
     verified professional dating profiles using their LinkedIn credentials.
     ```

## Step 3: Configure OAuth Settings

### Auth Tab Configuration
1. Navigate to the "Auth" tab in your application
2. Add redirect URLs:
   - **Development**: `http://localhost:3001/auth/linkedin/callback`
   - **Production**: `https://api.yourdomain.com/auth/linkedin/callback`

### Required Scopes
Request access to the following scopes:
- ✅ **r_liteprofile** - Basic profile information
- ✅ **r_emailaddress** - User's email address

### Advanced Settings
- **Application type**: Web Application
- **Grant types**: Authorization Code
- **Response types**: code

## Step 4: Get Client Credentials

1. From the "Auth" tab, copy:
   - **Client ID** - This is your `LINKEDIN_CLIENT_ID`
   - **Client Secret** - This is your `LINKEDIN_CLIENT_SECRET`

2. Update your `.env` file:
   ```env
   LINKEDIN_CLIENT_ID="your_actual_client_id_here"
   LINKEDIN_CLIENT_SECRET="your_actual_client_secret_here"
   ```

## Step 5: Test OAuth Flow

### Development Testing URLs:
- **Authorization URL**: 
  ```
  https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Flinkedin%2Fcallback&scope=r_liteprofile%20r_emailaddress
  ```

- **Backend Auth Endpoint**: `http://localhost:3001/auth/linkedin`
- **Callback Endpoint**: `http://localhost:3001/auth/linkedin/callback`

## Resources

- [LinkedIn OAuth 2.0 Documentation](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow)
- [LinkedIn API Reference](https://docs.microsoft.com/en-us/linkedin/)
- [Passport LinkedIn Strategy Documentation](http://www.passportjs.org/packages/passport-linkedin-oauth2/)
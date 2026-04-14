# Authentication Setup Guide

## 1. Install Required Dependencies

Run this command to install bcryptjs for password hashing:

```cmd
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

## 2. Update Database Schema

Push the updated Prisma schema to your database:

```cmd
npm run db:push
```

This adds the `password` and `updatedAt` fields to the User model.

## 3. Get Google OAuth Credentials

### Steps:
1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable "Google+ API" from the API Library
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen if prompted
6. For "Application type", select "Web application"
7. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
8. Copy the Client ID and Client Secret

### Update .env.local:
Replace the placeholder values in `.env.local`:
```env
GOOGLE_CLIENT_ID="your-actual-client-id-here"
GOOGLE_CLIENT_SECRET="your-actual-client-secret-here"
```

## 4. Test the Authentication

### Start the development server:
```cmd
npm run dev
```

### Test Email/Password Registration:
1. Go to http://localhost:3000/auth/signup
2. Fill in name, email, and password (min 8 chars)
3. Click "Create Account"
4. You should be redirected to the dashboard

### Test Google Sign-In:
1. Go to http://localhost:3000/auth/login
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should be redirected to the dashboard

### Verify Database:
```cmd
npm run db:studio
```
This opens Prisma Studio where you can see:
- Users table with registered users
- Accounts table with Google OAuth connections
- Sessions table with active sessions

## 5. How It Works

### Email/Password Flow:
1. User fills signup form → POST to `/api/auth/register`
2. Password is hashed with bcryptjs (12 rounds)
3. User record created in database
4. Auto sign-in with credentials provider
5. JWT session created

### Google OAuth Flow:
1. User clicks "Continue with Google"
2. Redirected to Google consent screen
3. Google redirects back with authorization code
4. NextAuth exchanges code for user info
5. User created/updated in database via Prisma Adapter
6. Account record links Google ID to User
7. JWT session created

### Session Management:
- Uses JWT strategy (no database sessions)
- Token includes userId for database queries
- Session persists across page reloads
- Expires based on NextAuth config (default 30 days)

## 6. Connecting Test Sessions to Users

The TestSession model already has a `userId` field. When a user completes a symptom test:

```typescript
// In your test completion API
const session = useSession();
const userId = session?.data?.user?.id;

await prisma.testSession.create({
  data: {
    userId: userId, // Links to authenticated user
    personName: "Myself",
    answers: JSON.stringify(answers),
    score: result.score,
    urgency: result.urgency,
    // ... other fields
  }
});
```

## 7. Security Notes

- Passwords are hashed with bcryptjs (never stored plain text)
- JWT tokens are signed with NEXTAUTH_SECRET
- Google OAuth uses secure authorization code flow
- CSRF protection enabled by default in NextAuth
- Change NEXTAUTH_SECRET before production deployment

## 8. Production Checklist

Before deploying:
- [ ] Change NEXTAUTH_SECRET to a strong random string
- [ ] Update NEXTAUTH_URL to your production domain
- [ ] Add production domain to Google OAuth authorized redirects
- [ ] Switch DATABASE_URL to PostgreSQL/MySQL
- [ ] Enable HTTPS (required for OAuth)
- [ ] Set up proper error logging
- [ ] Add rate limiting to auth endpoints
- [ ] Consider adding email verification
- [ ] Add password reset functionality

## Troubleshooting

### "Invalid credentials" error:
- Check that user exists in database
- Verify password was hashed correctly
- Check bcryptjs is installed

### Google OAuth not working:
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Check redirect URI matches exactly in Google Console
- Ensure Google+ API is enabled
- Try in incognito mode (clear cookies)

### Database errors:
- Run `npm run db:push` to sync schema
- Check DATABASE_URL is correct
- Verify Prisma Client is generated: `npx prisma generate`

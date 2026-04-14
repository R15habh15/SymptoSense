# 🎯 Setup Steps - Visual Guide

## Step-by-Step Setup for SymptoSense with PostgreSQL

---

## 📋 Prerequisites

- ✅ Node.js installed (v18 or higher)
- ✅ npm or yarn
- ✅ Code editor (VS Code recommended)
- ✅ Internet connection

---

## 🚀 Setup Process

### Step 1: Install Dependencies
```cmd
npm install
```

**What this does:**
- Installs Next.js, React, Prisma, NextAuth, and all dependencies
- Takes ~2-3 minutes

---

### Step 2: Choose & Set Up PostgreSQL

**Option A: Supabase (Recommended)**

1. **Create Account**
   - Visit: https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub/Google

2. **Create Project**
   - Click "New Project"
   - Name: `symptosense`
   - Database Password: Generate strong password (SAVE THIS!)
   - Region: Choose closest to you
   - Click "Create new project" (wait ~2 min)

3. **Get Connection Strings**
   - Click Settings (gear icon) → Database
   - Scroll to "Connection string"
   - Select "URI" mode
   - Copy **Connection pooling** string
   - Copy **Direct connection** string

4. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
   ```
   Replace `[YOUR-PASSWORD]` with your actual password!

**Option B: Other Providers**
See `POSTGRESQL_SETUP.md` for Vercel, Neon, Railway, or local setup.

---

### Step 3: Run Setup Script
```cmd
.\setup-auth.ps1
```

**What this does:**
1. Installs bcryptjs for password hashing
2. Generates Prisma Client
3. Creates database tables (User, Account, Session, TestSession)
4. Shows Google OAuth setup instructions

**Expected output:**
```
🔐 Setting up SymptoSense with PostgreSQL...
📦 Installing dependencies...
✅ Dependencies installed
🔧 Generating Prisma Client...
✅ Prisma Client generated
🗄️  Running database migrations...
✅ Database setup complete!
```

---

### Step 4: Verify Database Setup
```cmd
npx prisma studio
```

**What to check:**
- Opens at http://localhost:5555
- You should see 5 tables:
  - User
  - Account
  - Session
  - VerificationToken
  - TestSession
- All tables should be empty (no data yet)

---

### Step 5: Start Development Server
```cmd
npm run dev
```

**Expected output:**
```
▲ Next.js 14.2.18
- Local:        http://localhost:3000
- Ready in 2.3s
```

---

### Step 6: Test the Application

**A. Create Your First Account**
1. Open http://localhost:3000/auth/signup
2. Fill in:
   - Name: Your name
   - Email: your@email.com
   - Password: At least 8 characters
3. Click "Create Account"
4. Should redirect to dashboard

**B. Verify User Created**
1. Go back to Prisma Studio (http://localhost:5555)
2. Click "User" table
3. You should see your user with:
   - id
   - name
   - email
   - password (hashed - not readable)
   - createdAt

**C. Take a Symptom Test**
1. On dashboard, click "Start New Test"
2. Answer questions
3. Get your results
4. Check Prisma Studio → TestSession table
5. Your test should be saved with userId linked

---

## 🔑 Optional: Google OAuth Setup

**Only do this if you want Google Sign-In**

### Step 1: Google Cloud Console
1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Name: `SymptoSense`

### Step 2: Enable Google+ API
1. Go to "APIs & Services" → "Library"
2. Search "Google+ API"
3. Click "Enable"

### Step 3: Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Configure consent screen if prompted:
   - User Type: External
   - App name: SymptoSense
   - User support email: Your email
   - Developer contact: Your email
   - Save and continue through all steps

### Step 4: Create OAuth Client
1. Application type: Web application
2. Name: SymptoSense Web Client
3. Authorized redirect URIs:
   - Add: `http://localhost:3000/api/auth/callback/google`
4. Click "Create"
5. Copy Client ID and Client Secret

### Step 5: Update .env.local
```env
GOOGLE_CLIENT_ID="your-actual-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-actual-client-secret"
```

### Step 6: Test Google Sign-In
1. Restart dev server: `npm run dev`
2. Go to http://localhost:3000/auth/login
3. Click "Continue with Google"
4. Sign in with Google account
5. Should redirect to dashboard
6. Check Prisma Studio:
   - User table: New user with Google email
   - Account table: Record with provider="google"

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm install` completed without errors
- [ ] `.env.local` has valid DATABASE_URL and DIRECT_URL
- [ ] `npx prisma studio` shows 5 tables
- [ ] `npm run dev` starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can create account at /auth/signup
- [ ] User appears in Prisma Studio
- [ ] Can login at /auth/login
- [ ] Can complete symptom test
- [ ] Test session saved in database
- [ ] (Optional) Google OAuth works

---

## 🐛 Troubleshooting

### "Can't reach database server"
**Problem:** Database connection failed

**Solutions:**
1. Check internet connection
2. Verify DATABASE_URL in .env.local is correct
3. Check if database is paused (Supabase auto-pauses after inactivity)
4. Go to Supabase dashboard and wake up database

### "Prisma Client not generated"
**Problem:** Prisma Client missing

**Solution:**
```cmd
npx prisma generate
```

### "Migration failed"
**Problem:** Database schema out of sync

**Solution:**
```cmd
npx prisma migrate reset
npx prisma migrate dev --name init
```

### "Module not found: bcryptjs"
**Problem:** Missing dependency

**Solution:**
```cmd
npm install bcryptjs @types/bcryptjs
```

### "Invalid credentials" on login
**Problem:** Password verification failed

**Solutions:**
1. Make sure you're using the correct password
2. Try creating a new account
3. Check bcryptjs is installed: `npm list bcryptjs`

### Port 3000 already in use
**Problem:** Another app using port 3000

**Solution:**
```cmd
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

---

## 📚 Next Steps

After successful setup:

1. **Customize the app**
   - Update branding in `app/layout.tsx`
   - Modify question tree in `lib/questionTree.ts`
   - Adjust scoring in `lib/scoring.ts`

2. **Add features**
   - Email verification
   - Password reset
   - User profile page
   - Export test results

3. **Prepare for deployment**
   - See `POSTGRESQL_SETUP.md` for production setup
   - Update NEXTAUTH_URL for production domain
   - Generate new NEXTAUTH_SECRET
   - Set up monitoring and logging

---

## 🎉 You're Done!

Your SymptoSense app is now running with:
- ✅ PostgreSQL database
- ✅ User authentication (email/password)
- ✅ Optional Google OAuth
- ✅ Symptom test functionality
- ✅ User history tracking

**Start building!** 🚀

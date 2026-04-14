# 🚀 Quick Start Guide

## Get SymptoSense Running in 10 Minutes

### 1️⃣ Install Dependencies (1 min)
```cmd
npm install
```

### 2️⃣ Set Up PostgreSQL Database (5 min)

**Choose a free provider (recommended: Supabase):**

1. Go to https://supabase.com and create account
2. Create new project (takes ~2 min)
3. Get connection strings from Settings → Database
4. Update `.env.local`:
   ```env
   DATABASE_URL="your-pooled-connection-string"
   DIRECT_URL="your-direct-connection-string"
   ```

**See POSTGRESQL_SETUP.md for detailed instructions for all providers**

### 3️⃣ Run Setup Script (2 min)
```cmd
.\setup-auth.ps1
```

This will:
- Install bcryptjs for password hashing
- Generate Prisma Client
- Create database tables
- Show you how to set up Google OAuth (optional)

### 4️⃣ Configure Google OAuth (Optional - 2 min)

**Skip this if you just want to test email/password auth**

1. Go to https://console.cloud.google.com/
2. Create OAuth credentials
3. Add redirect: `http://localhost:3000/api/auth/callback/google`
4. Update `.env.local`:
   ```env
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

### 5️⃣ Start the App
```cmd
npm run dev
```

Open http://localhost:3000

## 🎯 What You Can Do Now

### Create an Account
1. Go to http://localhost:3000/auth/signup
2. Enter your details
3. Click "Create Account"

### Take a Symptom Test
1. Click "Start New Test" on dashboard
2. Answer the adaptive questions
3. Get your risk score and recommendations
4. View your history

### View Your Data
```cmd
npx prisma studio
```
Opens at http://localhost:5555 to see:
- Your user account
- Test sessions
- Scores and history

## 📖 Full Documentation

- **POSTGRESQL_SETUP.md** - Database setup for all providers
- **AUTH_IMPLEMENTATION_SUMMARY.md** - Complete auth system overview
- **SETUP_AUTH.md** - Detailed setup instructions
- **DEVELOPER_GUIDE.md** - Technical architecture

## 🆘 Need Help?

### App won't start?
```cmd
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### Database connection errors?
- Check your connection strings in `.env.local`
- Verify database is running (cloud providers may pause)
- See POSTGRESQL_SETUP.md troubleshooting section

### Google OAuth not working?
- It's optional! Use email/password instead
- Or check SETUP_AUTH.md for detailed Google setup

### Migration errors?
```cmd
npx prisma migrate reset
npx prisma migrate dev --name init
```

That's it! You're ready to go. 🎉

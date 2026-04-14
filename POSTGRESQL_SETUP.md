# PostgreSQL Setup Guide

## 🎯 Choose Your PostgreSQL Provider

All options below have **free tiers** perfect for development and small production apps.

---

## Option 1: Supabase (Recommended - Easiest)

### Why Supabase?
- ✅ Free tier: 500MB database, unlimited API requests
- ✅ Built-in auth (optional - you're using NextAuth)
- ✅ Real-time subscriptions
- ✅ Auto backups
- ✅ Great dashboard

### Setup Steps:

**1. Create Account**
- Go to https://supabase.com
- Sign up (free)
- Click "New Project"

**2. Create Project**
- Organization: Create new or use existing
- Project name: `symptosense`
- Database password: Generate a strong one (save it!)
- Region: Choose closest to you
- Click "Create new project" (takes ~2 minutes)

**3. Get Connection Strings**
- Go to Project Settings (gear icon) → Database
- Scroll to "Connection string"
- Copy both:
  - **Connection pooling** (for DATABASE_URL)
  - **Direct connection** (for DIRECT_URL)

**4. Update .env.local**
```env
# Replace [YOUR-PASSWORD] with your actual database password
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

**5. Run Migration**
```cmd
npx prisma migrate dev --name init
```

Done! ✅

---

## Option 2: Vercel Postgres (Best for Vercel Deployment)

### Why Vercel Postgres?
- ✅ Free tier: 256MB storage, 60 hours compute/month
- ✅ Seamless Vercel integration
- ✅ Auto-configured environment variables
- ✅ Edge-optimized

### Setup Steps:

**1. Install Vercel CLI**
```cmd
npm i -g vercel
```

**2. Login to Vercel**
```cmd
vercel login
```

**3. Create Database**
- Go to https://vercel.com/dashboard
- Click "Storage" → "Create Database"
- Select "Postgres"
- Name: `symptosense-db`
- Region: Choose closest
- Click "Create"

**4. Connect to Project**
- Click "Connect Project"
- Select your project (or create new)
- Environment: Development
- Copy the connection strings

**5. Update .env.local**
```env
DATABASE_URL="postgres://default:xxxxx@xxxxx-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true"
DIRECT_URL="postgres://default:xxxxx@xxxxx.us-east-1.postgres.vercel-storage.com:5432/verceldb"
```

**6. Run Migration**
```cmd
npx prisma migrate dev --name init
```

---

## Option 3: Neon (Serverless PostgreSQL)

### Why Neon?
- ✅ Free tier: 512MB storage, 3GB data transfer
- ✅ Serverless (auto-scales to zero)
- ✅ Instant branching (like Git for databases)
- ✅ Very fast cold starts

### Setup Steps:

**1. Create Account**
- Go to https://neon.tech
- Sign up (free)

**2. Create Project**
- Click "Create Project"
- Name: `symptosense`
- Region: Choose closest
- PostgreSQL version: Latest (16)
- Click "Create Project"

**3. Get Connection String**
- Dashboard shows connection string immediately
- Copy the "Pooled connection" string

**4. Update .env.local**
```env
DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**5. Run Migration**
```cmd
npx prisma migrate dev --name init
```

---

## Option 4: Railway (Simple & Fast)

### Why Railway?
- ✅ Free tier: $5 credit/month (enough for small apps)
- ✅ Very simple setup
- ✅ Great for side projects
- ✅ One-click PostgreSQL

### Setup Steps:

**1. Create Account**
- Go to https://railway.app
- Sign up with GitHub

**2. Create Project**
- Click "New Project"
- Select "Provision PostgreSQL"
- Wait ~30 seconds

**3. Get Connection String**
- Click on PostgreSQL service
- Go to "Connect" tab
- Copy "Postgres Connection URL"

**4. Update .env.local**
```env
DATABASE_URL="postgresql://postgres:xxxxx@containers-us-west-1.railway.app:7432/railway"
DIRECT_URL="postgresql://postgres:xxxxx@containers-us-west-1.railway.app:7432/railway"
```

**5. Run Migration**
```cmd
npx prisma migrate dev --name init
```

---

## Option 5: Local PostgreSQL (Advanced)

### Why Local?
- ✅ Full control
- ✅ Works offline
- ✅ No external dependencies

### Setup Steps:

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for `postgres` user

**Or use Docker:**
```cmd
docker run --name symptosense-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

**Update .env.local:**
```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/symptosense"
DIRECT_URL="postgresql://postgres:mysecretpassword@localhost:5432/symptosense"
```

**Create Database:**
```cmd
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE symptosense;

# Exit
\q
```

**Run Migration:**
```cmd
npx prisma migrate dev --name init
```

---

## 🚀 After Setup (All Options)

### 1. Install Dependencies
```cmd
npm install
npm install bcryptjs @types/bcryptjs
```

### 2. Generate Prisma Client
```cmd
npx prisma generate
```

### 3. Run Migration
```cmd
npx prisma migrate dev --name init
```

This creates all your tables (User, Account, Session, TestSession, etc.)

### 4. Verify Setup
```cmd
npx prisma studio
```

Opens at http://localhost:5555 - you should see all your tables!

### 5. Start Development
```cmd
npm run dev
```

---

## 📊 Provider Comparison

| Provider | Free Tier | Best For | Setup Time | Deployment |
|----------|-----------|----------|------------|------------|
| **Supabase** | 500MB | Full-stack apps | 5 min | Any platform |
| **Vercel** | 256MB | Vercel deployments | 3 min | Vercel only |
| **Neon** | 512MB | Serverless apps | 4 min | Any platform |
| **Railway** | $5/month | Side projects | 2 min | Any platform |
| **Local** | Unlimited | Offline dev | 10 min | Not for prod |

---

## 🔧 Common Issues & Solutions

### Issue: "Can't reach database server"
**Solution:**
- Check your internet connection
- Verify connection string is correct
- Check if database is paused (some providers auto-pause)
- Whitelist your IP (if required by provider)

### Issue: "SSL connection required"
**Solution:** Add `?sslmode=require` to connection string:
```env
DATABASE_URL="postgresql://...?sslmode=require"
```

### Issue: "Database does not exist"
**Solution:** 
- For cloud providers: Database is auto-created
- For local: Run `CREATE DATABASE symptosense;` in psql

### Issue: "Migration failed"
**Solution:**
```cmd
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Issue: "Prisma Client not generated"
**Solution:**
```cmd
npx prisma generate
```

---

## 🎯 My Recommendation

**For Development:** Supabase or Neon (both have generous free tiers)

**For Production:**
- Deploying to Vercel? → Use Vercel Postgres
- Deploying elsewhere? → Use Supabase or Neon

**Start with Supabase** - it's the most beginner-friendly and has the best free tier.

---

## 📈 Production Deployment

When deploying, add environment variables to your hosting platform:

**Vercel/Netlify:**
- Go to Project Settings → Environment Variables
- Add `DATABASE_URL` and `DIRECT_URL`
- Redeploy

**Railway/Render:**
- Environment variables auto-configured if database is in same project
- Or manually add in Settings

---

## ✅ Quick Start Checklist

- [ ] Choose a provider (Supabase recommended)
- [ ] Create account and project
- [ ] Copy connection strings
- [ ] Update `.env.local`
- [ ] Run `npm install`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Run `npx prisma studio` to verify
- [ ] Run `npm run dev` to start app
- [ ] Test signup at http://localhost:3000/auth/signup

---

**Need help?** All providers have great documentation and support channels!

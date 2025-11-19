# Deployment Guide - timeBridge Backend

This guide will help you deploy the timeBridge backend to various platforms.

## 📦 Prerequisites

1. A Supabase account and project ([supabase.com](https://supabase.com))
2. Node.js 18+ installed locally
3. Git installed
4. A hosting platform account (Heroku, Railway, Render, or DigitalOcean)

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project
3. Wait for the project to be provisioned
4. Note down your project URL and keys

### 2. Run Database Schema

1. Open your Supabase project
2. Navigate to SQL Editor
3. Copy the contents of `/backend/src/db/schema.sql`
4. Paste and run the SQL script
5. Verify all tables are created in the Table Editor

### 3. Get Your Credentials

From your Supabase project settings:
- Project URL: `https://xxxxx.supabase.co`
- Anon (public) key: `eyJhbGciOiJ...`
- Service role key: `eyJhbGciOiJ...` (keep this secret!)

## 🚀 Deployment Options

### Option 1: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create a new app
heroku create timebridge-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set SUPABASE_URL=your_supabase_url
heroku config:set SUPABASE_ANON_KEY=your_anon_key
heroku config:set SUPABASE_SERVICE_KEY=your_service_key
heroku config:set JWT_SECRET=your_strong_secret_key
heroku config:set ALLOWED_ORIGINS=https://yourdomain.com

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: Railway

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the backend folder
4. Add environment variables in the Railway dashboard:
   - `NODE_ENV=production`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `JWT_SECRET`
   - `ALLOWED_ORIGINS`
5. Deploy automatically on push

### Option 3: Render

1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
5. Add environment variables
6. Deploy

### Option 4: DigitalOcean App Platform

1. Go to DigitalOcean
2. Create new App
3. Connect to GitHub
4. Select repository and branch
5. Configure component:
   - Type: Web Service
   - Run Command: `npm start`
   - Build Command: `npm install`
6. Add environment variables
7. Deploy

## 🔧 Local Development

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start development server
npm run dev

# Server runs on http://localhost:3001
```

## 🧪 Testing Your Deployment

### Health Check
```bash
curl https://your-api-url.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-11-18T...",
  "uptime": 123.45
}
```

### Test Authentication
```bash
# Sign up
curl -X POST https://your-api-url.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "timezone": "America/New_York",
    "city": "New York",
    "country": "USA"
  }'

# Login
curl -X POST https://your-api-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🔐 Security Checklist

- [ ] All environment variables are set
- [ ] `NODE_ENV=production` in production
- [ ] Strong JWT secret (32+ random characters)
- [ ] CORS origins restricted to your frontend domain
- [ ] Supabase service key is kept secret
- [ ] HTTPS enabled on hosting platform
- [ ] Rate limiting configured
- [ ] Database backups enabled in Supabase

## 📊 Monitoring

### Logs

**Heroku:**
```bash
heroku logs --tail
```

**Railway/Render:**
Check the dashboard logs section

### Database Monitoring

In Supabase:
1. Go to Database → Monitoring
2. Check query performance
3. Monitor active connections

### Application Monitoring

Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for user session replay
- [New Relic](https://newrelic.com) for APM

## 🔄 CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Backend

on:
  push:
    branches: [ main ]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd backend
        npm ci
    
    - name: Run tests
      run: |
        cd backend
        npm test
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "timebridge-backend"
        heroku_email: "your-email@example.com"
        appdir: "backend"
```

## 🆘 Troubleshooting

### Server won't start
- Check environment variables are set correctly
- Verify Supabase credentials
- Check logs for specific errors

### Database connection issues
- Verify Supabase URL and keys
- Check if database schema is set up
- Test connection from Supabase dashboard

### CORS errors
- Add your frontend URL to `ALLOWED_ORIGINS`
- Check CORS middleware configuration

### 500 Internal Server Error
- Check server logs
- Verify all required dependencies are installed
- Check database schema is complete

## 📞 Support

For issues:
1. Check the logs
2. Review error messages
3. Verify environment variables
4. Test database connectivity
5. Check Supabase dashboard for errors

## 🎉 Next Steps

After deployment:
1. Test all API endpoints
2. Connect your frontend
3. Set up monitoring
4. Configure backups
5. Add custom domain
6. Enable SSL/TLS
7. Set up staging environment

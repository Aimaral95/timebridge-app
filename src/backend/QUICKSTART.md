# ⚡ Quick Start Guide - timeBridge Backend

Get the backend running in 5 minutes!

## 🚀 Step-by-Step Setup

### 1️⃣ Download/Clone the Project

**If from Figma Make:**
- Export/download the project
- Extract to a folder
- Navigate to the `backend` folder

**If from GitHub:**
```bash
git clone https://github.com/YOUR_USERNAME/timebridge-backend.git
cd timebridge-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This installs all required packages (Express, Supabase, Socket.IO, etc.)

### 3️⃣ Set Up Supabase (Database)

**Option A: Use Supabase (Recommended)**

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login (it's free!)
3. Create a new project:
   - Project name: `timebridge`
   - Database password: Create a strong password
   - Region: Choose closest to you
   - Wait 2-3 minutes for setup

4. Get your credentials:
   - Go to Project Settings → API
   - Copy:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon/public key** (starts with `eyJhbGciOiJ...`)
     - **service_role key** (starts with `eyJhbGciOiJ...`)

5. Set up the database:
   - Go to SQL Editor in Supabase
   - Click "New Query"
   - Copy the entire contents of `src/db/schema.sql`
   - Paste and click "Run"
   - Should see "Success. No rows returned"
   - Go to Table Editor - you should see 9 tables!

**Option B: Use Local PostgreSQL** (Advanced)

```bash
# Install PostgreSQL locally
# Then run:
psql -U postgres -f src/db/schema.sql
```

### 4️⃣ Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your favorite editor
nano .env
# or
code .env
```

**Fill in your values:**
```env
PORT=3001
NODE_ENV=development

# From Supabase project settings:
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Generate a random string (or use: openssl rand -base64 32)
JWT_SECRET=your-super-secret-random-string-min-32-chars

# Optional - for weather features (get free at openweathermap.org)
WEATHER_API_KEY=your-openweather-api-key

# For local development:
ALLOWED_ORIGINS=http://localhost:3000
```

### 5️⃣ Start the Server

```bash
# Development mode (auto-restarts on changes)
npm run dev

# Or production mode
npm start
```

You should see:
```
timeBridge API server running on port 3001
Environment: development
Database initialized successfully
```

### 6️⃣ Test It Works! 🎉

**Test 1: Health Check**
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-11-18T...",
  "uptime": 1.234
}
```

**Test 2: Create a User**
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "timezone": "America/New_York",
    "city": "New York",
    "country": "USA",
    "language": "en"
  }'
```

Should return a user object with session token!

**Test 3: Login**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🔥 Quick Test in Browser

Open your browser and go to:
```
http://localhost:3001/health
```

You should see the health check JSON response!

## 📱 Test with Postman/Insomnia

1. Download [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download)
2. Import these requests:

**Signup:**
- Method: POST
- URL: `http://localhost:3001/api/auth/signup`
- Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "securepass123",
  "name": "John Doe",
  "timezone": "America/Los_Angeles",
  "city": "San Francisco",
  "country": "USA"
}
```

**Login:**
- Method: POST  
- URL: `http://localhost:3001/api/auth/login`
- Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Get Profile** (requires token from login):
- Method: GET
- URL: `http://localhost:3001/api/users/profile`
- Headers: `Authorization: Bearer YOUR_TOKEN_HERE`

## 🛠️ Common Issues & Solutions

### ❌ "Cannot find module 'express'"
**Solution:** Run `npm install`

### ❌ "Missing Supabase environment variables"
**Solution:** Make sure `.env` file exists and has correct values

### ❌ "EADDRINUSE: address already in use"
**Solution:** Port 3001 is taken. Change `PORT=3002` in `.env`

### ❌ "Authentication error" 
**Solution:** Check your Supabase URL and keys in `.env`

### ❌ Database connection failed
**Solution:** 
1. Check Supabase project is running
2. Verify you ran the schema.sql script
3. Check credentials are correct

## 📚 Next Steps

### Connect Your Frontend
Update your frontend to use:
```javascript
const API_URL = 'http://localhost:3001/api';
```

### Add More Test Data
Use Supabase dashboard → Table Editor to manually add test data.

### Explore API Endpoints

**Available Endpoints:**

**Authentication:**
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

**Users:**
- `GET /api/users/profile` - Get profile
- `PATCH /api/users/profile` - Update profile
- `PATCH /api/users/status` - Update status
- `GET /api/users/:id` - Get user by ID

**Contacts:**
- `GET /api/contacts` - List contacts
- `POST /api/contacts` - Send request
- `PATCH /api/contacts/:id/status` - Accept/reject
- `DELETE /api/contacts/:id` - Remove contact

**Call Requests:**
- `GET /api/call-requests` - List requests
- `POST /api/call-requests` - Create request
- `PATCH /api/call-requests/:id/respond` - Respond
- `DELETE /api/call-requests/:id` - Cancel

**Schedule:**
- `GET /api/schedule` - Get schedule
- `POST /api/schedule` - Add block
- `PATCH /api/schedule/:id` - Update block
- `DELETE /api/schedule/:id` - Delete block

**Privacy:**
- `GET /api/privacy/:contactId` - Get settings
- `PATCH /api/privacy/:contactId` - Update settings

**Weather:**
- `GET /api/weather/:city` - Get weather

### View Logs
Logs are created in the `logs/` folder:
- `logs/error.log` - Errors only
- `logs/combined.log` - All logs

### Stop the Server
Press `Ctrl + C` in the terminal

## 🚀 Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick deploy options:**
- **Heroku:** Free tier, easy setup
- **Railway:** Modern, great DX
- **Render:** Free tier available
- **Vercel:** Serverless option

## 📖 Full Documentation

- **README.md** - Complete project overview
- **DEPLOYMENT.md** - Deployment guide
- **RESUME_TALKING_POINTS.md** - Interview prep
- **API Documentation** - Coming soon!

## 💬 Need Help?

**Check logs:**
```bash
tail -f logs/combined.log
```

**Reset database:**
Re-run the schema.sql in Supabase SQL Editor

**Common Commands:**
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm start           # Start production server  
npm test            # Run tests (when implemented)
```

## ✅ Checklist

- [ ] Node.js installed (v18+)
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] Database schema loaded
- [ ] `.env` file configured
- [ ] Server starts successfully
- [ ] Health check works
- [ ] Can create a user
- [ ] Can login

## 🎉 You're All Set!

Your backend is now running! Time to:
1. ✅ Test all endpoints
2. ✅ Connect your frontend
3. ✅ Add more features
4. ✅ Deploy to production
5. ✅ Add to your resume!

---

**Happy coding! 🚀**

Questions? Check the README.md or create an issue on GitHub.

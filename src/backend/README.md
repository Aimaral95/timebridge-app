# timeBridge Backend API

Backend API server for timeBridge - A family connection application that helps people stay connected across different time zones.

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based authentication with Supabase
- **Real-time Communication**: Socket.IO for instant notifications and updates
- **Contact Management**: Send/accept contact requests with privacy controls
- **Call Requests**: Request calls with platform selection (WhatsApp, Instagram, Facebook, etc.)
- **Schedule Management**: Manage weekly schedules with Google/Apple Calendar sync
- **Privacy Controls**: Granular sharing settings per contact
- **Multi-language Support**: EN, RU, TR, KZ
- **Weather Integration**: Real-time weather data based on location
- **Timezone Handling**: Automatic timezone detection and conversion

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Real-time**: Socket.IO
- **Validation**: express-validator
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL database (or Supabase account)
- OpenWeather API key (for weather features)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd timebridge/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
WEATHER_API_KEY=your_openweather_api_key
```

4. Run database migrations:
```bash
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### Users
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile
- `PATCH /api/users/status` - Update availability status
- `GET /api/users/:id` - Get user by ID

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Send contact request
- `PATCH /api/contacts/:id/status` - Accept/reject contact
- `DELETE /api/contacts/:id` - Remove contact

### Call Requests
- `GET /api/call-requests` - Get all call requests
- `POST /api/call-requests` - Create call request
- `PATCH /api/call-requests/:id/respond` - Respond to call request
- `DELETE /api/call-requests/:id` - Cancel call request

### Schedule
- `GET /api/schedule` - Get user schedule
- `POST /api/schedule` - Add schedule block
- `PATCH /api/schedule/:id` - Update schedule block
- `DELETE /api/schedule/:id` - Delete schedule block
- `POST /api/schedule/sync` - Sync with external calendar

### Privacy
- `GET /api/privacy/:contactId` - Get privacy settings for contact
- `PATCH /api/privacy/:contactId` - Update privacy settings

### Weather
- `GET /api/weather/:city` - Get weather for city
- `GET /api/weather/coords/:lat/:lon` - Get weather by coordinates

## 🔌 WebSocket Events

### Client -> Server
- `join-room` - Join user's personal room
- `status-update` - Update availability status
- `typing` - Typing indicator

### Server -> Client
- `contact-request` - New contact request received
- `contact-accepted` - Contact request accepted
- `call-request` - New call request received
- `call-response` - Response to call request
- `status-changed` - Contact status changed
- `both-free` - Both users are free

## 🗄️ Database Schema

### Users
- User authentication and profile information
- Timezone, language, location data

### Contacts
- Friend/family connections
- Request status tracking

### Privacy Settings
- Granular sharing controls per contact
- Time/weather, availability, schedule sharing

### Schedule Blocks
- Recurring weekly schedule entries
- Calendar sync integration

### Call Requests
- Platform-specific call requests
- Response tracking

### Notifications
- System notifications
- Real-time alerts

## 🔐 Security Features

- Row Level Security (RLS) with Supabase
- JWT token authentication
- Rate limiting on all endpoints
- Helmet for HTTP headers security
- CORS protection
- Input validation and sanitization
- SQL injection prevention

## 📊 Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "details": {} // Optional additional details
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 📝 Logging

Logs are stored in the `logs/` directory:
- `error.log` - Error level logs
- `combined.log` - All logs

Log levels: error, warn, info, http, verbose, debug, silly

## 🚀 Deployment

### Environment Variables
Ensure all production environment variables are set:
- Use strong JWT secrets
- Enable HTTPS
- Set appropriate CORS origins
- Configure production database

### Recommended Hosting
- **API**: Heroku, Railway, Render, DigitalOcean
- **Database**: Supabase (managed PostgreSQL)
- **Real-time**: Socket.IO with Redis adapter for scaling

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure SSL certificates
- [ ] Set up monitoring (e.g., Sentry)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Enable database connection pooling
- [ ] Configure load balancer (if needed)

## 📈 Performance Optimization

- Database indexes on frequently queried fields
- Connection pooling
- Response caching where appropriate
- Gzip compression
- Rate limiting per user/IP

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Supabase for backend infrastructure
- OpenWeather for weather API
- Socket.IO for real-time features

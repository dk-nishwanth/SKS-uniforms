# SKS Uniforms Backend API

A comprehensive Node.js/Express backend API for the SKS Uniforms website with email and SMS integration.

## Features

- **Contact Management**: Handle contact forms, quote requests, sample requests, and consultation bookings
- **Email Integration**: Professional HTML email templates with Nodemailer
- **SMS Integration**: Real-time SMS notifications via Twilio
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Product Management**: Complete product catalog with search, filtering, and categorization
- **Order Management**: Full order lifecycle management with status tracking
- **Newsletter System**: Advanced newsletter subscription management with engagement tracking
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: Comprehensive request validation with express-validator
- **Error Handling**: Centralized error handling with detailed logging
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, compression, and other security middleware

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Email**: Nodemailer (SMTP)
- **SMS**: Twilio
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit
- **Utilities**: compression, morgan (logging)

## API Endpoints

### Contact Routes (`/api/contact`)
- `POST /` - Submit contact form
- `POST /quote` - Request product quote
- `POST /samples` - Request product samples
- `POST /consultation` - Book consultation
- `GET /test-sms` - Test SMS functionality (dev only)

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /guest-login` - Guest checkout login
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `GET /me` - Get current user profile

### Product Routes (`/api/products`)
- `GET /` - Get products with filtering and pagination
- `GET /featured` - Get featured products
- `GET /bestsellers` - Get best selling products
- `GET /categories/:category` - Get products by category
- `GET /:id` - Get single product by ID
- `GET /search/suggestions` - Get search suggestions
- `GET /filters/options` - Get available filter options

### Order Routes (`/api/orders`)
- `POST /` - Create new order
- `GET /:id` - Get order by ID
- `GET /` - Get orders with filtering
- `PUT /:id/status` - Update order status
- `POST /:id/tracking` - Add tracking information
- `GET /stats/summary` - Get order statistics

### Newsletter Routes (`/api/newsletter`)
- `POST /subscribe` - Subscribe to newsletter
- `POST /unsubscribe` - Unsubscribe from newsletter
- `PUT /preferences` - Update newsletter preferences
- `GET /status/:email` - Check subscription status
- `GET /subscribers` - Get subscribers list (admin)
- `GET /stats` - Get newsletter statistics

### Health Check
- `GET /api/health` - API health status

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Gmail account (for SMTP)
- Twilio account (for SMS)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure it:
```bash
cp .env.example .env
```

Edit `.env` with your actual configuration:

#### Required Configuration
```env
# Database
MONGODB_URI=mongodb://localhost:27017/sks-uniforms

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex

# Email Configuration (Gmail)
EMAIL_USER=duraikannan73@gmail.com
EMAIL_PASS=your-gmail-app-password-here

# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid-here
TWILIO_AUTH_TOKEN=your-twilio-auth-token-here
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

#### Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this password in `EMAIL_PASS`

#### Twilio Setup
1. Create a Twilio account at https://www.twilio.com
2. Get your Account SID and Auth Token from the dashboard
3. Purchase a phone number for sending SMS
4. Add these credentials to your `.env` file

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# Or if using MongoDB service
sudo systemctl start mongod
```

### 4. Run the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Email Templates

The system includes professional HTML email templates for:

- **Contact Form Notifications**: Sent to business email when forms are submitted
- **Auto-Reply Emails**: Sent to customers confirming receipt of their inquiry
- **Newsletter Confirmations**: Welcome emails for newsletter subscribers
- **Order Confirmations**: Detailed order information for customers
- **Status Updates**: Order status change notifications

## SMS Notifications

Real-time SMS notifications are sent to both contact numbers (7338031038 | 9980667425) for:

- Contact form submissions
- Quote requests
- Sample requests
- Consultation bookings
- New orders
- Order status changes

## Database Models

### Contact Model
- Stores all contact form submissions, quotes, samples, and consultation requests
- Includes status tracking, priority levels, and follow-up dates
- Supports categorization and assignment to team members

### User Model
- Complete user management with authentication
- Shopping cart and wishlist functionality
- Address management and preferences
- Role-based access control

### Product Model
- Comprehensive product catalog with images, sizes, colors
- Advanced search and filtering capabilities
- Stock management and sales tracking
- Review and rating system

### Order Model
- Complete order lifecycle management
- Payment tracking and status updates
- Shipping and tracking integration
- Timeline and status history

### Newsletter Model
- Advanced subscription management
- Engagement tracking and analytics
- Preference management and segmentation
- Unsubscribe handling and compliance

## Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Comprehensive request validation
- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS Protection**: Configurable cross-origin requests
- **Helmet Security**: Various HTTP security headers
- **Error Handling**: Secure error responses (no sensitive data leakage)

## Testing

### Test SMS Functionality
```bash
# Send test SMS to configured numbers
curl http://localhost:5000/api/contact/test-sms
```

### Test Email Functionality
Submit a contact form through the API to test email delivery.

### Health Check
```bash
curl http://localhost:5000/api/health
```

## Production Deployment

### Environment Variables
Set `NODE_ENV=production` and configure production database and email settings.

### Process Management
Use PM2 for production process management:
```bash
npm install -g pm2
pm2 start server.js --name "sks-uniforms-api"
pm2 startup
pm2 save
```

### Reverse Proxy
Configure Nginx as a reverse proxy:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring & Logging

- **Morgan**: HTTP request logging in development
- **Console Logging**: Structured logging with timestamps
- **Error Tracking**: Comprehensive error logging
- **Health Checks**: API status monitoring endpoint

## Support

For technical support or questions about the API:
- **Email**: duraikannan73@gmail.com
- **Phone**: +91 7338031038 | +91 9980667425

## License

This project is proprietary software for SKS Uniforms.
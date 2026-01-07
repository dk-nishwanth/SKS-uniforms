# SKS Uniforms - Complete Setup Guide

## Overview
SKS Uniforms is now a fully functional enquiry-based platform where customers can browse uniforms, add items to their enquiry list, and submit enquiries that will be sent via email to `duraikannan73@gmail.com` and SMS notifications to the configured phone numbers.

## 🚀 Quick Start

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The frontend will be available at: `http://localhost:5173`

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

4. The backend API will be available at: `http://localhost:5000`

## 📧 Email Configuration

To enable email notifications to `duraikannan73@gmail.com`, update the following in `backend/.env`:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=duraikannan73@gmail.com
EMAIL_PASS=your-gmail-app-password-here
EMAIL_FROM=duraikannan73@gmail.com
```

### Getting Gmail App Password:
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App passwords
4. Generate an app password for "Mail"
5. Use this password in the `EMAIL_PASS` field

## 📱 SMS Configuration

To enable SMS notifications to the phone numbers (+917338031038, +919980667425, +919019285770), you need a Twilio account:

1. Sign up at [Twilio](https://www.twilio.com)
2. Get your Account SID, Auth Token, and Phone Number
3. Update `backend/.env`:

```env
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid-here
TWILIO_AUTH_TOKEN=your-twilio-auth-token-here
TWILIO_PHONE_NUMBER=+1234567890

# Contact Information (SMS Recipients)
CONTACT_PHONE_1=+917338031038
CONTACT_PHONE_2=+919980667425
CONTACT_PHONE_3=+919019285770
```

## 🗄️ Database Configuration (Optional)

For data persistence, you can configure MongoDB:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/sks-uniforms
```

**Note:** The system works without a database - enquiries will still be sent via email/SMS but won't be stored.

## 🌐 Production Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

3. Update environment variables:
   ```env
   VITE_API_URL=https://your-backend-domain.com/api
   ```

### Backend (Heroku/Railway/DigitalOcean)
1. Set all environment variables in your hosting service
2. The backend is ready for production deployment

## 🧪 Testing the System

### Test Contact Form
1. Go to the Contact page
2. Fill out the form
3. Submit - you should see a success message
4. Check the backend logs for email/SMS status

### Test Enquiry System
1. Browse products and add items to enquiry
2. Click the enquiry icon in the navbar
3. Fill out contact information
4. Submit enquiry
5. Check backend logs for processing status

## 📋 Features

### ✅ Completed Features
- **Enquiry System**: Complete conversion from ecommerce to enquiry-based
- **Email Notifications**: Automatic emails to business and customers
- **SMS Notifications**: Real-time SMS alerts to all three phone numbers
- **Contact Forms**: Multiple contact methods (general, quote, samples, consultation)
- **Product Browsing**: Full catalog with categories and search
- **Wishlist**: Save products for later enquiry
- **Responsive Design**: Works on all devices
- **API Integration**: RESTful backend with proper error handling

### 🔧 Configuration Status
- ✅ Frontend: Fully configured and working
- ✅ Backend: Fully configured and working
- ⚠️ Email: Requires Gmail app password configuration
- ⚠️ SMS: Requires Twilio account configuration
- ⚠️ Database: Optional MongoDB configuration

## 🎯 How It Works

1. **Customer Journey**:
   - Browse uniforms by category
   - Add items to enquiry list
   - Submit enquiry with contact details
   - Receive auto-reply confirmation email

2. **Business Workflow**:
   - Receive email notification with enquiry details
   - Get SMS alerts on all three phone numbers
   - Contact customer directly to provide quotes
   - Track enquiries (if database is configured)

## 🔒 Security Features
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Environment variable protection

## 📞 Support

For technical support or configuration help:
- Email: duraikannan73@gmail.com
- Phone: +91 7338031038, +91 9980667425, +91 9019285770

## 🚀 Next Steps

1. Configure email credentials for production
2. Set up Twilio account for SMS notifications
3. Deploy to production hosting
4. Test all enquiry flows
5. Monitor and optimize performance

The system is now fully functional as an enquiry-based uniform platform!
# SKS Uniforms - Deployment Checklist

## ✅ Pre-Deployment Checklist

### Frontend
- [ ] Build completes without errors (`npm run build`)
- [ ] All pages load correctly
- [ ] Enquiry system works end-to-end
- [ ] Contact forms submit successfully
- [ ] Responsive design works on mobile/tablet
- [ ] Environment variables configured for production

### Backend
- [ ] Server starts without errors
- [ ] All API endpoints respond correctly
- [ ] Email service configured (Gmail app password)
- [ ] SMS service configured (Twilio credentials)
- [ ] Database connected (if using MongoDB)
- [ ] Environment variables set for production

## 🌐 Production Configuration

### Required Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=SKS Uniforms
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com

# Email Configuration (REQUIRED)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=duraikannan73@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=duraikannan73@gmail.com

# SMS Configuration (REQUIRED)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# Contact Phone Numbers
CONTACT_PHONE_1=+917338031038
CONTACT_PHONE_2=+919980667425
CONTACT_PHONE_3=+919019285770

# Database (Optional)
MONGODB_URI=your-mongodb-connection-string

# Security
JWT_SECRET=your-super-secret-jwt-key
```

## 🚀 Deployment Steps

### 1. Frontend Deployment (Netlify/Vercel)
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy

### 2. Backend Deployment (Heroku/Railway)
1. Connect your repository
2. Set root directory to `backend`
3. Add all environment variables
4. Deploy

### 3. Domain Configuration
1. Update CORS settings in backend
2. Update API URL in frontend
3. Test cross-origin requests

## 🧪 Post-Deployment Testing

### Critical Tests
- [ ] Homepage loads correctly
- [ ] Product catalog displays properly
- [ ] Contact form submissions work
- [ ] Enquiry system end-to-end test
- [ ] Email notifications received
- [ ] SMS notifications received
- [ ] Mobile responsiveness

### Test Scenarios

#### 1. Contact Form Test
1. Go to `/contact`
2. Fill out form with test data
3. Submit form
4. Verify success message
5. Check email inbox for notification
6. Check phone for SMS notification

#### 2. Enquiry System Test
1. Browse products
2. Add 2-3 items to enquiry
3. Open enquiry drawer
4. Fill contact information
5. Submit enquiry
6. Verify success message
7. Check email for enquiry details
8. Check phone for SMS alert

#### 3. Mobile Test
1. Test on mobile device
2. Verify navigation works
3. Test enquiry flow on mobile
4. Verify forms are usable

## 📊 Monitoring

### Key Metrics to Monitor
- API response times
- Error rates
- Email delivery success
- SMS delivery success
- User engagement

### Logs to Check
- Backend server logs
- Email service logs
- SMS service logs
- Database connection logs

## 🔧 Troubleshooting

### Common Issues

#### Email Not Sending
- Check Gmail app password
- Verify EMAIL_* environment variables
- Check Gmail security settings

#### SMS Not Sending
- Verify Twilio credentials
- Check phone number format (+country code)
- Verify Twilio account balance

#### API Connection Issues
- Check CORS configuration
- Verify API URL in frontend
- Check network connectivity

#### Database Issues
- Verify MongoDB connection string
- Check database permissions
- Monitor connection pool

## 📞 Support Contacts

**Technical Issues:**
- Email: duraikannan73@gmail.com
- Phone: +91 7338031038

**Business Enquiries:**
- Phone: +91 9980667425, +91 9019285770

## 🎯 Success Criteria

Deployment is successful when:
- [ ] Website loads without errors
- [ ] All enquiry forms work correctly
- [ ] Email notifications are received
- [ ] SMS notifications are received
- [ ] Mobile experience is smooth
- [ ] Performance is acceptable (< 3s load time)

## 🔄 Maintenance

### Regular Tasks
- Monitor server logs
- Check email/SMS delivery rates
- Update dependencies
- Backup database (if using)
- Review and respond to enquiries

### Monthly Tasks
- Review performance metrics
- Update content if needed
- Check security updates
- Verify all integrations working

The system is production-ready once all checklist items are completed!
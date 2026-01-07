# SKS Uniforms - Complete Hosting & Deployment Guide

## 🚀 **HOSTING OPTIONS**

### **Option 1: Free Hosting (Recommended for Testing)**

#### **Frontend: Netlify (Free)**
- **Pros**: Free, easy deployment, automatic builds from Git
- **Cons**: Limited bandwidth (100GB/month)
- **Perfect for**: Testing and small-scale deployment

#### **Backend: Railway/Render (Free Tier)**
- **Pros**: Free tier available, easy deployment
- **Cons**: Limited resources, may sleep after inactivity
- **Perfect for**: Development and testing

### **Option 2: Professional Hosting (Recommended for Production)**

#### **Frontend: Vercel Pro ($20/month)**
- **Pros**: Excellent performance, global CDN, unlimited bandwidth
- **Cons**: Paid service
- **Perfect for**: Production websites

#### **Backend: DigitalOcean Droplet ($6/month)**
- **Pros**: Full control, reliable, scalable
- **Cons**: Requires server management
- **Perfect for**: Production APIs

---

## 📋 **STEP-BY-STEP DEPLOYMENT**

### **STEP 1: Backend Deployment (Railway - Free)**

1. **Prepare Backend for Deployment:**
   ```bash
   cd backend
   
   # Make sure all dependencies are in package.json
   npm install
   
   # Test locally first
   npm run dev
   ```

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Choose the `backend` folder
   - Railway will auto-detect Node.js and deploy

3. **Configure Environment Variables in Railway:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sks-uniforms
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=duraikannan73@gmail.com
   EMAIL_PASS=your-gmail-app-password
   EMAIL_FROM=duraikannan73@gmail.com
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE_NUMBER=your-twilio-phone-number
   CONTACT_PHONE_1=+917338031038
   CONTACT_PHONE_2=+919980667425
   FRONTEND_URL=https://your-frontend-domain.netlify.app
   ```

4. **Get Your Backend URL:**
   - Railway will provide a URL like: `https://your-app-name.up.railway.app`
   - Your API will be available at: `https://your-app-name.up.railway.app/api`

### **STEP 2: Database Setup (MongoDB Atlas - Free)**

1. **Create MongoDB Atlas Account:**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (free tier)

2. **Configure Database:**
   - Create database user
   - Whitelist IP addresses (0.0.0.0/0 for all IPs)
   - Get connection string
   - Replace in Railway environment variables

3. **Seed Database:**
   ```bash
   # Update .env with production MongoDB URI
   npm run seed
   ```

### **STEP 3: Frontend Deployment (Netlify - Free)**

1. **Update Frontend Configuration:**
   ```bash
   # Update .env file
   REACT_APP_API_URL=https://your-app-name.up.railway.app/api
   ```

2. **Build and Deploy:**
   ```bash
   # Build the project
   npm run build
   
   # Deploy to Netlify
   # Option A: Drag & drop build folder to netlify.com/drop
   # Option B: Connect GitHub repository
   ```

3. **Netlify Configuration:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `build`

4. **Environment Variables in Netlify:**
   ```
   REACT_APP_API_URL=https://your-app-name.up.railway.app/api
   REACT_APP_NAME=SKS Uniforms
   REACT_APP_CONTACT_EMAIL=duraikannan73@gmail.com
   REACT_APP_CONTACT_PHONE_1=+91 7338031038
   REACT_APP_CONTACT_PHONE_2=+91 9980667425
   ```

### **STEP 4: Email & SMS Configuration**

#### **Gmail Setup:**
1. Enable 2-Factor Authentication on `duraikannan73@gmail.com`
2. Go to Google Account → Security → App passwords
3. Generate app password for "Mail"
4. Use this password in `EMAIL_PASS` environment variable

#### **Twilio Setup:**
1. Create account at [twilio.com](https://twilio.com)
2. Get Account SID and Auth Token
3. Purchase phone number for SMS sending
4. Add credentials to environment variables

---

## 🔧 **TESTING YOUR DEPLOYMENT**

### **Test Backend API:**
```bash
# Health check
curl https://your-app-name.up.railway.app/api/health

# Test contact form
curl -X POST https://your-app-name.up.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+919876543210",
    "message": "Test message",
    "inquiryType": "general"
  }'
```

### **Test Frontend:**
1. Visit your Netlify URL
2. Fill out contact form
3. Check if emails are received at `duraikannan73@gmail.com`
4. Check if SMS is received at `7338031038` and `9980667425`

---

## 💰 **COST BREAKDOWN**

### **Free Tier (Perfect for Testing):**
- **Frontend (Netlify)**: Free
- **Backend (Railway)**: Free (with limitations)
- **Database (MongoDB Atlas)**: Free (512MB)
- **Email (Gmail)**: Free
- **SMS (Twilio)**: Pay per SMS (~₹1 per SMS)
- **Total**: ~₹0-500/month depending on SMS usage

### **Professional Tier (Recommended for Production):**
- **Frontend (Vercel Pro)**: $20/month
- **Backend (DigitalOcean Droplet)**: $6/month
- **Database (MongoDB Atlas)**: $9/month
- **Email (Gmail)**: Free
- **SMS (Twilio)**: Pay per SMS
- **Total**: ~$35/month + SMS costs

---

## 🛠️ **ALTERNATIVE HOSTING OPTIONS**

### **All-in-One Solutions:**

#### **1. Vercel (Frontend + Backend)**
- Deploy both frontend and backend on Vercel
- Serverless functions for backend
- Cost: $20/month for pro features

#### **2. Heroku (Backend) + Netlify (Frontend)**
- Heroku for Node.js backend
- Netlify for React frontend
- Cost: $7/month (Heroku) + Free (Netlify)

#### **3. AWS (Full Stack)**
- EC2 for backend
- S3 + CloudFront for frontend
- RDS for database
- Cost: $20-50/month depending on usage

### **Indian Hosting Providers:**

#### **1. Hostinger India**
- VPS hosting starting at ₹299/month
- Good for both frontend and backend

#### **2. BigRock**
- Cloud hosting starting at ₹199/month
- Indian support and servers

#### **3. GoDaddy India**
- Shared hosting starting at ₹149/month
- Easy setup for beginners

---

## 📱 **MOBILE APP DEPLOYMENT (Future)**

If you want to create mobile apps later:

### **React Native (Recommended)**
- Reuse existing React components
- Deploy to Google Play Store and Apple App Store
- Cost: $25 (Google) + $99/year (Apple)

### **Progressive Web App (PWA)**
- Convert existing website to PWA
- Works like native app
- No app store fees

---

## 🔒 **SECURITY & PERFORMANCE**

### **SSL Certificate:**
- Netlify provides free SSL automatically
- Railway provides free SSL automatically

### **Domain Setup:**
1. **Buy Domain** (₹500-1000/year):
   - GoDaddy, Namecheap, or BigRock
   - Suggested: `sksuniforms.com` or `sksuniformsooty.com`

2. **Configure DNS:**
   - Point domain to Netlify for frontend
   - Create subdomain `api.yourdomain.com` for backend

### **Performance Optimization:**
- Enable Gzip compression (automatic on Netlify/Railway)
- Optimize images (use WebP format)
- Enable caching headers
- Use CDN (automatic on Netlify)

---

## 📞 **SUPPORT & MAINTENANCE**

### **Monitoring:**
- Set up uptime monitoring (UptimeRobot - free)
- Monitor email delivery rates
- Track SMS delivery success

### **Backups:**
- MongoDB Atlas automatic backups (included)
- Export contact form submissions regularly
- Keep environment variables backed up securely

### **Updates:**
- Update dependencies monthly
- Monitor security vulnerabilities
- Test all functionality after updates

---

## 🎯 **QUICK START CHECKLIST**

- [ ] Backend deployed to Railway
- [ ] MongoDB Atlas database created and seeded
- [ ] Gmail app password configured
- [ ] Twilio account set up
- [ ] Frontend deployed to Netlify
- [ ] Environment variables configured
- [ ] Contact form tested (email + SMS)
- [ ] Domain purchased and configured (optional)
- [ ] SSL certificates active
- [ ] Monitoring set up

---

## 📧 **NEED HELP?**

If you need assistance with deployment:
- **Email**: duraikannan73@gmail.com
- **Phone**: +91 7338031038 | +91 9980667425

**I can help you with:**
- Setting up hosting accounts
- Configuring environment variables
- Testing the deployment
- Domain setup and DNS configuration
- Troubleshooting any issues

---

**🎉 Your SKS Uniforms website will be live and fully functional with email and SMS integration!**
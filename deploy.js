#!/usr/bin/env node

// SKS Uniforms Deployment Helper Script
const fs = require('fs');
const path = require('path');

console.log('🚀 SKS Uniforms Deployment Helper\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

// Read package.json to confirm this is the SKS project
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!packageJson.name || !packageJson.name.includes('sks')) {
  console.log('⚠️  This doesn\'t appear to be the SKS Uniforms project');
}

console.log('📋 Pre-deployment Checklist:\n');

// Check for required files
const requiredFiles = [
  { file: '.env', description: 'Frontend environment variables' },
  { file: 'backend/.env', description: 'Backend environment variables' },
  { file: 'services/api.js', description: 'API service file' },
  { file: 'backend/server.js', description: 'Backend server file' },
  { file: 'netlify.toml', description: 'Netlify configuration' },
  { file: 'backend/Procfile', description: 'Backend Procfile for deployment' }
];

let allFilesExist = true;

requiredFiles.forEach(({ file, description }) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${description} - ${file}`);
  } else {
    console.log(`❌ Missing: ${description} - ${file}`);
    allFilesExist = false;
  }
});

console.log('\n📝 Environment Variables Check:\n');

// Check frontend .env
if (fs.existsSync('.env')) {
  const frontendEnv = fs.readFileSync('.env', 'utf8');
  const requiredFrontendVars = [
    'REACT_APP_API_URL',
    'REACT_APP_CONTACT_EMAIL',
    'REACT_APP_CONTACT_PHONE_1',
    'REACT_APP_CONTACT_PHONE_2'
  ];
  
  console.log('Frontend Environment Variables:');
  requiredFrontendVars.forEach(varName => {
    if (frontendEnv.includes(varName)) {
      console.log(`✅ ${varName}`);
    } else {
      console.log(`❌ Missing: ${varName}`);
      allFilesExist = false;
    }
  });
} else {
  console.log('❌ Frontend .env file not found');
  allFilesExist = false;
}

console.log('\nBackend Environment Variables:');
// Check backend .env
if (fs.existsSync('backend/.env')) {
  const backendEnv = fs.readFileSync('backend/.env', 'utf8');
  const requiredBackendVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'EMAIL_USER',
    'EMAIL_PASS',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'CONTACT_PHONE_1',
    'CONTACT_PHONE_2'
  ];
  
  requiredBackendVars.forEach(varName => {
    if (backendEnv.includes(varName)) {
      console.log(`✅ ${varName}`);
    } else {
      console.log(`❌ Missing: ${varName}`);
      allFilesExist = false;
    }
  });
} else {
  console.log('❌ Backend .env file not found');
  allFilesExist = false;
}

console.log('\n🔧 Deployment Instructions:\n');

if (allFilesExist) {
  console.log('✅ All required files are present!\n');
  
  console.log('📤 BACKEND DEPLOYMENT (Railway):');
  console.log('1. Go to https://railway.app');
  console.log('2. Sign up with GitHub');
  console.log('3. Click "New Project" → "Deploy from GitHub repo"');
  console.log('4. Select your repository and choose the "backend" folder');
  console.log('5. Add environment variables from backend/.env');
  console.log('6. Your API will be available at: https://your-app.up.railway.app/api\n');
  
  console.log('🌐 FRONTEND DEPLOYMENT (Netlify):');
  console.log('1. Go to https://netlify.com');
  console.log('2. Sign up with GitHub');
  console.log('3. Click "New site from Git"');
  console.log('4. Choose your repository');
  console.log('5. Build settings: Command: "npm run build", Directory: "build"');
  console.log('6. Add environment variables from .env');
  console.log('7. Update REACT_APP_API_URL with your Railway backend URL\n');
  
  console.log('🗄️ DATABASE SETUP (MongoDB Atlas):');
  console.log('1. Go to https://mongodb.com/atlas');
  console.log('2. Create free cluster');
  console.log('3. Create database user and get connection string');
  console.log('4. Update MONGODB_URI in Railway environment variables');
  console.log('5. Run "npm run seed" to populate database\n');
  
  console.log('📧 EMAIL SETUP (Gmail):');
  console.log('1. Enable 2FA on duraikannan73@gmail.com');
  console.log('2. Generate App Password: Google Account → Security → App passwords');
  console.log('3. Use app password in EMAIL_PASS environment variable\n');
  
  console.log('📱 SMS SETUP (Twilio):');
  console.log('1. Create account at https://twilio.com');
  console.log('2. Get Account SID, Auth Token, and phone number');
  console.log('3. Add to environment variables\n');
  
  console.log('🧪 TESTING:');
  console.log('1. Test backend: https://your-app.up.railway.app/api/health');
  console.log('2. Test frontend contact form');
  console.log('3. Verify emails arrive at duraikannan73@gmail.com');
  console.log('4. Verify SMS arrive at +91 7338031038 and +91 9980667425\n');
  
} else {
  console.log('❌ Some required files are missing. Please check the items above.\n');
  
  console.log('🔧 Quick fixes:');
  console.log('1. Copy .env.example to .env and fill in values');
  console.log('2. Copy backend/.env.example to backend/.env and fill in values');
  console.log('3. Make sure all files are in the correct locations\n');
}

console.log('📞 Need Help?');
console.log('Email: duraikannan73@gmail.com');
console.log('Phone: +91 7338031038 | +91 9980667425\n');

console.log('📚 For detailed instructions, see HOSTING_GUIDE.md');
console.log('🎉 Good luck with your deployment!');
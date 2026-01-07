# SKS Uniforms Backend Deployment Guide

This guide covers deploying the SKS Uniforms backend API to production environments.

## Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Set `NODE_ENV=production`
- [ ] Configure production MongoDB URI
- [ ] Set up Gmail App Password for email service
- [ ] Configure Twilio credentials for SMS
- [ ] Generate strong JWT secret
- [ ] Configure CORS for production frontend URL

### 2. Security Review
- [ ] Review and update rate limiting settings
- [ ] Ensure sensitive data is not logged in production
- [ ] Verify HTTPS is enforced
- [ ] Check that error responses don't leak sensitive information

### 3. Database Setup
- [ ] Set up production MongoDB database
- [ ] Create database indexes for performance
- [ ] Run database migrations if any
- [ ] Seed initial data if required

## Deployment Options

### Option 1: VPS/Dedicated Server (Recommended)

#### Server Requirements
- **OS**: Ubuntu 20.04 LTS or newer
- **RAM**: Minimum 2GB, Recommended 4GB+
- **Storage**: Minimum 20GB SSD
- **CPU**: 2+ cores recommended
- **Network**: Stable internet connection

#### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18 LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx for reverse proxy
sudo apt install nginx -y
```

#### Step 2: Deploy Application
```bash
# Create application directory
sudo mkdir -p /var/www/sks-uniforms-api
sudo chown $USER:$USER /var/www/sks-uniforms-api

# Clone or upload your code
cd /var/www/sks-uniforms-api
# Upload your backend files here

# Install dependencies
npm install --production

# Create production environment file
cp .env.example .env
# Edit .env with production values
nano .env
```

#### Step 3: Configure PM2
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'sks-uniforms-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF

# Create logs directory
mkdir -p logs

# Start application with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
# Follow the instructions provided by the command above
```

#### Step 4: Configure Nginx
```bash
# Create Nginx configuration
sudo cat > /etc/nginx/sites-available/sks-uniforms-api << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # API routes
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:5000/api/health;
        access_log off;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/sks-uniforms-api /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

#### Step 5: SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

### Option 2: Cloud Platforms

#### Heroku Deployment
```bash
# Install Heroku CLI
# Create Procfile
echo "web: node server.js" > Procfile

# Create heroku app
heroku create sks-uniforms-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
# ... set all other environment variables

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### DigitalOcean App Platform
1. Connect your GitHub repository
2. Configure environment variables in the dashboard
3. Set build and run commands:
   - Build: `npm install`
   - Run: `node server.js`

#### AWS EC2 (Similar to VPS setup)
1. Launch EC2 instance with Ubuntu
2. Configure security groups (ports 22, 80, 443)
3. Follow VPS deployment steps above

## Database Configuration

### MongoDB Atlas (Cloud)
```bash
# Connection string format
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sks-uniforms?retryWrites=true&w=majority
```

### Local MongoDB Optimization
```bash
# Edit MongoDB configuration
sudo nano /etc/mongod.conf

# Add these optimizations:
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 1  # Adjust based on available RAM

# Restart MongoDB
sudo systemctl restart mongod
```

## Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Go to Google Account → Security → App passwords
   - Select "Mail" and generate password
   - Use this password in `EMAIL_PASS`

### Alternative Email Providers
- **SendGrid**: Professional email service
- **AWS SES**: Cost-effective for high volume
- **Mailgun**: Developer-friendly email API

## SMS Configuration

### Twilio Setup
1. Create Twilio account
2. Verify phone numbers for SMS recipients
3. Purchase a phone number
4. Get Account SID and Auth Token
5. Configure in environment variables

### Alternative SMS Providers
- **AWS SNS**: Integrated with AWS ecosystem
- **TextLocal**: India-focused SMS service
- **MSG91**: Indian SMS provider

## Monitoring & Logging

### PM2 Monitoring
```bash
# View application status
pm2 status

# View logs
pm2 logs sks-uniforms-api

# Monitor in real-time
pm2 monit

# Restart application
pm2 restart sks-uniforms-api
```

### Log Management
```bash
# Setup log rotation
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true
```

### Health Monitoring
Set up monitoring for:
- API endpoint availability
- Database connectivity
- Email service status
- SMS service status
- Server resources (CPU, RAM, disk)

## Backup Strategy

### Database Backup
```bash
# Create backup script
cat > backup-db.sh << EOF
#!/bin/bash
DATE=\$(date +%Y%m%d_%H%M%S)
mongodump --db sks-uniforms --out /backups/mongodb_\$DATE
tar -czf /backups/mongodb_\$DATE.tar.gz /backups/mongodb_\$DATE
rm -rf /backups/mongodb_\$DATE
find /backups -name "mongodb_*.tar.gz" -mtime +7 -delete
EOF

chmod +x backup-db.sh

# Setup cron job for daily backups
crontab -e
# Add: 0 2 * * * /path/to/backup-db.sh
```

### Application Backup
- Keep versioned deployments
- Backup environment configuration
- Store deployment scripts in version control

## Performance Optimization

### Database Indexes
```javascript
// Run these in MongoDB shell
db.contacts.createIndex({ email: 1 })
db.contacts.createIndex({ createdAt: -1 })
db.products.createIndex({ category: 1, isActive: 1 })
db.orders.createIndex({ user: 1, createdAt: -1 })
db.newsletters.createIndex({ email: 1, status: 1 })
```

### Caching (Optional)
```bash
# Install Redis for caching
sudo apt install redis-server -y
sudo systemctl enable redis-server

# Add to your application
npm install redis
```

### CDN for Static Assets
- Use CloudFlare or AWS CloudFront
- Serve product images from CDN
- Cache API responses where appropriate

## Security Hardening

### Server Security
```bash
# Setup firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart ssh

# Setup fail2ban
sudo apt install fail2ban -y
```

### Application Security
- Keep dependencies updated: `npm audit fix`
- Use HTTPS everywhere
- Implement proper CORS policies
- Regular security audits
- Monitor for suspicious activity

## Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check PM2 logs
pm2 logs sks-uniforms-api

# Check if port is in use
sudo netstat -tlnp | grep :5000

# Restart application
pm2 restart sks-uniforms-api
```

#### Database Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Test connection
mongo --eval "db.adminCommand('ismaster')"
```

#### Email/SMS Not Working
- Verify credentials in environment variables
- Check service provider dashboards
- Review application logs for error messages
- Test with simple curl commands

### Performance Issues
```bash
# Monitor system resources
htop
df -h
free -m

# Check application performance
pm2 monit

# Analyze slow queries in MongoDB
db.setProfilingLevel(2)
db.system.profile.find().sort({ts:-1}).limit(5)
```

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review and rotate logs
- [ ] Monitor disk space
- [ ] Check SSL certificate expiry
- [ ] Review security logs
- [ ] Backup verification
- [ ] Performance monitoring

### Update Procedure
```bash
# Create backup before updates
pm2 stop sks-uniforms-api
cp -r /var/www/sks-uniforms-api /var/www/sks-uniforms-api-backup

# Update application
git pull origin main
npm install --production

# Test in staging environment first
# Then restart production
pm2 start sks-uniforms-api
```

## Support Contacts

For deployment support:
- **Technical**: duraikannan73@gmail.com
- **Phone**: +91 7338031038 | +91 9980667425

## Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [MongoDB Production Notes](https://docs.mongodb.com/manual/administration/production-notes/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
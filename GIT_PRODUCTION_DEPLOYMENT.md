# Git-Based Production Deployment Guide

## Overview
Using Git for production deployment means:
- ✅ Your production code lives on a Git server (GitHub)
- ✅ You pull/clone code directly to your production server
- ✅ Simple deployment: `git pull` to get latest changes
- ✅ Easy rollback: `git checkout` to previous versions
- ✅ Full version history and control

---

## Current Setup

### Repository Details
- **GitHub URL:** https://github.com/Dp1011/Sanjivani-Homeopathy-Clinic.git
- **Branch:** main
- **Latest Commit:** a580a8e (Real-Time Booking Calendar implementation)

### Local Development
- **Location:** c:\Users\patildar\Cursor\homeopathy-clinic
- **Git Status:** Up to date with origin/main

---

## Production Deployment via Git

### Step 1: Production Server Setup

You have two options:

#### Option A: Traditional VPS (Recommended for Git-based)
- AWS EC2 instance
- DigitalOcean droplet
- Linode server
- Azure VM
- Any Linux server

#### Option B: Shared Hosting
- If they support Node.js
- If they support custom application servers

### Step 2: Clone Repository on Production Server

**On your production server, run:**

```bash
# Go to desired directory
cd /var/www/  # or your preferred location

# Clone the repository
git clone https://github.com/Dp1011/Sanjivani-Homeopathy-Clinic.git homeopathy-clinic

# Navigate to project
cd homeopathy-clinic
```

### Step 3: Install Dependencies on Production

```bash
# Install Node modules
npm install

# Install production dependencies only
npm ci --production
```

### Step 4: Set Up Environment Variables

Create `.env` file on production server:

```bash
# Copy example
cp .env.example .env

# Edit with production values
nano .env  # or use your preferred editor
```

**Production .env content:**

```env
# Database - Use PostgreSQL/MySQL in production, NOT SQLite
DATABASE_URL="postgresql://user:password@db-host:5432/homeopathy_db"

# Or for MySQL:
# DATABASE_URL="mysql://user:password@db-host:3306/homeopathy_db"

# Clinic Details
CLINIC_NAME="Sanjivani Homeopathic Clinic"
CLINIC_DOCTOR_NAME="Dr. Yogesh M Patil (MD Homeopathy)"
CLINIC_PHONE="+919420441549"
CLINIC_ADDRESS_STREET="Station Road"
CLINIC_ADDRESS_CITY="Nandurbar"
CLINIC_ADDRESS_STATE="Maharashtra"
CLINIC_HOURS_MON_FRI="09:00 - 18:00"
CLINIC_HOURS_SAT="10:00 - 14:00"

# Appointment Settings
APPOINTMENT_BOOKING_DAYS_AHEAD=1
APPOINTMENT_MAX_BOOKING_DAYS=90

# Email Configuration (if setting up notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@homeopathy-clinic.com"

# Admin Settings
ADMIN_SECRET_KEY="your-secure-admin-key"
```

### Step 5: Build the Application

```bash
# Generate Prisma client
npx prisma generate

# Build Next.js app
npm run build
```

### Step 6: Set Up Database

```bash
# Push schema to production database
npx prisma db push

# Optional: Run seed script if you have one
# npx ts-node prisma/seed.ts
```

### Step 7: Start Production Server

#### Option A: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start npm --name "homeopathy-clinic" -- start

# Make it restart on server reboot
pm2 startup
pm2 save

# View logs
pm2 logs homeopathy-clinic

# Stop/restart
pm2 stop homeopathy-clinic
pm2 restart homeopathy-clinic
```

#### Option B: Using systemd (Linux)

Create `/etc/systemd/system/homeopathy-clinic.service`:

```ini
[Unit]
Description=Homeopathy Clinic Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/homeopathy-clinic
Environment="PATH=/usr/local/bin:/usr/bin"
Environment="NODE_ENV=production"
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:

```bash
# Enable the service
sudo systemctl enable homeopathy-clinic

# Start it
sudo systemctl start homeopathy-clinic

# Check status
sudo systemctl status homeopathy-clinic

# View logs
sudo journalctl -u homeopathy-clinic -f
```

#### Option C: Using Node directly (Simple)

```bash
NODE_ENV=production npm start
```

**Note:** This is not recommended for production as it doesn't auto-restart on failure.

### Step 8: Set Up Reverse Proxy (Nginx/Apache)

#### Nginx Configuration

Create `/etc/nginx/sites-available/homeopathy-clinic`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/homeopathy-clinic /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Apache Configuration

Create `/etc/apache2/sites-available/homeopathy-clinic.conf`:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

Enable it:

```bash
sudo a2ensite homeopathy-clinic
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
```

### Step 9: SSL Certificate (HTTPS)

#### Using Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

---

## Updating Production with Latest Changes

### Simple Update Process

**On production server, pull latest code:**

```bash
cd /var/www/homeopathy-clinic

# Pull latest from main branch
git pull origin main

# Install any new dependencies
npm install

# Rebuild if needed
npm run build

# Restart the application
pm2 restart homeopathy-clinic
# or
sudo systemctl restart homeopathy-clinic
```

### Zero-Downtime Deployment

For better reliability, use Blue-Green deployment:

```bash
# Keep two instances running
# Instance 1: Current production (blue)
# Instance 2: New version (green)

# After green is ready and tested
# Switch nginx/load balancer to point to green
# Blue becomes backup
```

---

## Workflow: Development → Production

### 1. Make Changes Locally
```bash
# In your local development
cd c:\Users\patildar\Cursor\homeopathy-clinic
# Make changes in IDE
```

### 2. Test Locally
```bash
npm run dev
# Test at http://localhost:3000
```

### 3. Commit & Push
```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

### 4. Deploy to Production
```bash
# On production server
cd /var/www/homeopathy-clinic
git pull origin main
npm run build
pm2 restart homeopathy-clinic
```

---

## Database Strategy for Production

### Current: SQLite (Development)
- Location: `prisma/dev.db`
- Fine for testing locally
- **NOT suitable for production**

### Recommended: PostgreSQL (Production)

#### Set Up PostgreSQL

**On production server:**

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres psql
```

Then in PostgreSQL prompt:

```sql
CREATE DATABASE homeopathy_db;
CREATE USER homeopathy_user WITH PASSWORD 'secure_password_here';
ALTER ROLE homeopathy_user SET client_encoding TO 'utf8';
ALTER ROLE homeopathy_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE homeopathy_user SET default_transaction_deferrable TO on;
ALTER ROLE homeopathy_user SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE homeopathy_db TO homeopathy_user;
\q
```

#### Update .env

```env
DATABASE_URL="postgresql://homeopathy_user:secure_password_here@localhost:5432/homeopathy_db"
```

#### Migrate Schema

```bash
npx prisma db push
```

---

## Monitoring & Maintenance

### View Application Logs

```bash
# With PM2
pm2 logs homeopathy-clinic

# With systemd
sudo journalctl -u homeopathy-clinic -f

# With PM2 (last 100 lines)
pm2 logs homeopathy-clinic --lines 100
```

### Monitor Server Resources

```bash
# CPU and Memory usage
top
ps aux | grep node

# Disk usage
df -h

# Database size
du -sh /var/lib/postgresql/
```

### Automated Backups

```bash
# Create backup script (backup.sh)
#!/bin/bash
BACKUP_DIR="/var/backups/homeopathy-clinic"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
pg_dump homeopathy_db > $BACKUP_DIR/db_$TIMESTAMP.sql

# Backup application
tar -czf $BACKUP_DIR/app_$TIMESTAMP.tar.gz /var/www/homeopathy-clinic

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete
```

Add to crontab:

```bash
crontab -e
# Add: 0 2 * * * /path/to/backup.sh (runs daily at 2 AM)
```

---

## Rollback to Previous Version

### If Something Goes Wrong

```bash
# View commit history
git log --oneline

# Go back to specific commit
git checkout abc1234  # Replace with commit hash

# Rebuild and restart
npm run build
pm2 restart homeopathy-clinic
```

### Switch Back to Latest

```bash
git checkout main
npm run build
pm2 restart homeopathy-clinic
```

---

## Domain Setup

### Point Domain to Server

1. **Get your server IP:** 
   ```bash
   ip addr show
   ```

2. **Update DNS records** (at your domain registrar):
   - Add A record: `yourdomain.com` → your-server-ip
   - Add A record: `www.yourdomain.com` → your-server-ip

3. **Wait for DNS propagation** (up to 24 hours)

4. **Test:** `ping yourdomain.com`

---

## Security Best Practices

### 1. SSH Keys (Never use passwords!)

```bash
# Generate key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub
# GitHub Settings → SSH and GPG keys → New SSH key

# Use SSH URL for clone:
git clone git@github.com:Dp1011/Sanjivani-Homeopathy-Clinic.git
```

### 2. Firewall Rules

```bash
# Allow only necessary ports
sudo ufw enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw delete allow 3000/tcp  # Block Node directly
```

### 3. Update System

```bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
```

### 4. Environment Variables

```bash
# NEVER commit .env file
# ALWAYS use production-specific .env file
# Keep SECRET_KEYs secure
```

---

## Troubleshooting

### Application won't start
```bash
# Check logs
pm2 logs homeopathy-clinic

# Check if port 3000 is in use
lsof -i :3000

# Check Node version
node --version  # Should be 16+ for best compatibility
```

### Database connection error
```bash
# Test connection
psql "postgresql://user:password@localhost:5432/database_name"

# Check .env file
cat .env | grep DATABASE_URL

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### High CPU/Memory usage
```bash
# Restart application
pm2 restart homeopathy-clinic

# Check for memory leaks
pm2 monit

# View process details
pm2 show homeopathy-clinic
```

---

## Migration Path: Git → Vercel

When you're ready to switch to Vercel:

1. **No code changes needed** - Your current setup works
2. **Connect GitHub to Vercel** - Simple setup
3. **Auto-deploy on push** - Vercel handles everything
4. **Keep production running** - Gradual migration

---

## Summary

### Your Git-Based Production Setup:

```
Local Development
    ↓ (git push)
GitHub Repository (origin/main)
    ↓ (git pull)
Production Server
    ↓ (npm run build)
Running Application (http://yourdomain.com)
```

### Key Commands Reference:

```bash
# Development
npm run dev                 # Local testing
git push origin main        # Push to GitHub

# Production Deployment
git pull origin main        # Get latest code
npm install                 # Install dependencies
npm run build              # Build app
pm2 restart homeopathy-clinic  # Restart server

# Monitoring
pm2 logs homeopathy-clinic # View logs
pm2 monit                  # Monitor resources
git log --oneline          # View history
```

---

## Next Steps

1. ✅ Choose hosting provider (AWS, DigitalOcean, Linode, etc.)
2. ✅ Set up server with Node.js and PostgreSQL
3. ✅ Clone your repository
4. ✅ Configure environment variables
5. ✅ Build and deploy
6. ✅ Set up domain and SSL
7. ✅ Configure monitoring/backups
8. ✅ Later: Switch to Vercel when ready

---

**Your production deployment is now git-powered!** 🚀

Need help with any specific hosting provider or step?

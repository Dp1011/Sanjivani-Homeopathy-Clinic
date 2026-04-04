# Git Production Deployment - Quick Reference

## 🎯 What You Need to Know

Your code is on GitHub. To deploy:
1. **Clone** it on production server
2. **Install** dependencies
3. **Configure** environment
4. **Build** the app
5. **Run** it with PM2
6. **Update** with `git pull`

---

## 📋 Deployment Checklist

### Before You Deploy

- [ ] Code is committed and pushed to GitHub
- [ ] You have a server (AWS, DigitalOcean, etc.)
- [ ] Server has Node.js 18+ installed
- [ ] You have SSH access to server
- [ ] Domain is ready (optional for now)

### Deployment Steps

```bash
# 1. SSH into your server
ssh your-user@your-server-ip

# 2. Go to web directory
cd /var/www/

# 3. Clone your repository
git clone https://github.com/Dp1011/Sanjivani-Homeopathy-Clinic.git homeopathy-clinic
cd homeopathy-clinic

# 4. Install dependencies
npm install

# 5. Create .env file
cp .env.example .env
nano .env  # Edit with your settings

# 6. Build the application
npm run build

# 7. Install PM2 globally
npm install -g pm2

# 8. Start with PM2
pm2 start npm --name "homeopathy-clinic" -- start
pm2 startup
pm2 save

# 9. Check if running
pm2 logs homeopathy-clinic
```

---

## 🔄 Update Production

Every time you make changes locally:

```bash
# 1. On your local machine
git add .
git commit -m "Your changes"
git push origin main

# 2. On production server
cd /var/www/homeopathy-clinic
git pull origin main
npm install
npm run build
pm2 restart homeopathy-clinic
```

---

## 🗄️ Database Setup

### For Production, Use PostgreSQL

```bash
# On server, install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb homeopathy_db

# Create user
sudo -u postgres psql
CREATE USER homeopathy_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE homeopathy_db TO homeopathy_user;
\q

# Update .env
DATABASE_URL="postgresql://homeopathy_user:your_password@localhost:5432/homeopathy_db"

# Push schema
npx prisma db push
```

---

## 🚀 Key Commands

| What | Command |
|------|---------|
| Start | `pm2 start npm --name "homeopathy-clinic" -- start` |
| Stop | `pm2 stop homeopathy-clinic` |
| Restart | `pm2 restart homeopathy-clinic` |
| View Logs | `pm2 logs homeopathy-clinic` |
| Check Status | `pm2 status` |
| Update Code | `git pull origin main` |
| Rebuild | `npm run build` |

---

## 🌐 Set Up Domain

1. **Get your server IP:**
   ```bash
   ip addr show
   ```

2. **Go to your domain registrar** (GoDaddy, NameCheap, etc.)

3. **Update DNS A record:**
   - `yourdomain.com` → your-server-ip
   - `www.yourdomain.com` → your-server-ip

4. **Set up Nginx reverse proxy** to forward traffic to port 3000:
   ```bash
   # Edit Nginx config
   sudo nano /etc/nginx/sites-available/default
   
   # Add these lines in server block:
   location / {
       proxy_pass http://localhost:3000;
   }
   
   # Test and restart
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Setup SSL with Let's Encrypt:**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 📊 Monitoring

### Check if App is Running
```bash
pm2 status
```

### View Recent Logs
```bash
pm2 logs homeopathy-clinic --lines 50
```

### View All Logs (Follow)
```bash
pm2 logs homeopathy-clinic -f
```

### Monitor Resources
```bash
pm2 monit
```

---

## 🆘 Troubleshooting

### App won't start?
```bash
pm2 logs homeopathy-clinic
# Check error message
```

### Port already in use?
```bash
lsof -i :3000
kill -9 <PID>
pm2 restart homeopathy-clinic
```

### Database connection error?
```bash
# Test connection
psql "postgresql://user:password@localhost:5432/homeopathy_db"

# Check .env file
cat .env | grep DATABASE_URL
```

### Changes not showing?
```bash
git pull origin main
npm run build
pm2 restart homeopathy-clinic
```

---

## 💾 Backup Strategy

### Automatic Daily Backups

Create `backup.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/homeopathy"
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)

# Backup database
pg_dump homeopathy_db > $BACKUP_DIR/db_$DATE.sql

# Backup code
tar -czf $BACKUP_DIR/code_$DATE.tar.gz /var/www/homeopathy-clinic

# Keep only 7 days
find $BACKUP_DIR -type f -mtime +7 -delete
```

Add to crontab:
```bash
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

---

## 🔄 Rollback (Emergency)

If something breaks:

```bash
# Go back to previous version
cd /var/www/homeopathy-clinic
git log --oneline
git checkout <previous-commit-hash>
npm run build
pm2 restart homeopathy-clinic

# Or go back to main branch
git checkout main
npm run build
pm2 restart homeopathy-clinic
```

---

## 🔐 Security Essentials

1. **Use SSH keys (not passwords)**
   ```bash
   ssh-keygen -t ed25519
   # Add public key to GitHub SSH settings
   ```

2. **Firewall rules**
   ```bash
   sudo ufw enable
   sudo ufw allow 22/tcp   # SSH
   sudo ufw allow 80/tcp   # HTTP
   sudo ufw allow 443/tcp  # HTTPS
   ```

3. **Update system regularly**
   ```bash
   sudo apt-get update
   sudo apt-get upgrade
   ```

4. **Never commit .env** (especially passwords!)

---

## 📈 Recommended Hosting Providers

| Provider | Cost | Setup | Notes |
|----------|------|-------|-------|
| **AWS EC2** | $5-20/mo | Medium | Most flexible |
| **DigitalOcean** | $5-24/mo | Easy | Great for small apps |
| **Linode** | $5-24/mo | Easy | Fast, reliable |
| **Render** | Free-$25/mo | Very Easy | Auto-deploys from Git |
| **Railway** | Free-$20/mo | Very Easy | Auto-deploys from Git |

---

## 📝 Your GitHub Workflow

```
Local Changes
    ↓ (git add, git commit)
Local Repository
    ↓ (git push origin main)
GitHub Repository
    ↓ (git pull origin main)
Production Server
    ↓ (npm run build)
Running Application
    ↓
Live Website (yourdomain.com)
```

---

## 🎯 Migration to Vercel Later

When ready to switch to Vercel:
1. Connect GitHub repo to Vercel
2. Vercel auto-deploys on push
3. No code changes needed
4. Same workflow!

---

## ✅ You're Ready to Deploy!

**Your Next Steps:**
1. Choose a hosting provider
2. Follow the deployment checklist
3. Deploy your site
4. Share the URL with patients!

**Need help?** See `GIT_PRODUCTION_DEPLOYMENT.md` for detailed guide.

---

**Your homeopathy clinic website is production-ready!** 🚀

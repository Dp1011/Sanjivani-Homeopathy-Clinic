# Quick Start Guide - Updated Homeopathy Clinic Website

## 🚀 Getting Started

Your homeopathy clinic website has been enhanced with 10 major improvements! Here's how to use them:

## 🌐 Running the Website

The dev server is already running at: **http://localhost:3000**

To start it manually:
```bash
cd "c:\Users\patildar\Cursor\homeopathy-clinic"
npm run dev
```

## 📋 What's New

### 1. **Dynamic Pricing on Services Page**
- Go to `/services` to see pricing information
- Update prices in `.env` without code changes
- Services section now has "What to Expect" box

### 2. **Better Appointment Booking**
- Date input prevents past dates
- Minimum booking window: 7 days (configurable)
- Maximum booking window: 90 days (configurable)
- Clear validation error messages

### 3. **Mobile Menu**
- Click hamburger icon on mobile to toggle menu
- Cleaner, more organized mobile navigation

### 4. **Form Validation**
- All forms validate on the client side
- Real-time error feedback with red highlights
- Clear, helpful error messages
- Better success messages with next steps

### 5. **Responsive Pages**
- Services page now shows pricing
- Contact page shows office hours clearly
- Appointments page has helpful sidebar
- About page has better structure

## ⚙️ Configuration

### Update Clinic Information

Edit your `.env` file:

```env
# Clinic Details
CLINIC_NAME="Sanjivani Homeopathic Clinic"
CLINIC_DOCTOR_NAME="Dr. Yogesh M Patil (MD Homeopathy)"
CLINIC_PHONE="+919420441549"
CLINIC_ADDRESS_STREET="Station Road"
CLINIC_ADDRESS_CITY="Nandurbar"
CLINIC_ADDRESS_STATE="Maharashtra"

# Office Hours
CLINIC_HOURS_MON_FRI="09:00 - 18:00"
CLINIC_HOURS_SAT="10:00 - 14:00"

# Appointment Rules
APPOINTMENT_BOOKING_DAYS_AHEAD="7"      # Minimum days ahead to book
APPOINTMENT_MAX_BOOKING_DAYS="90"       # Maximum days in advance to book

# Service Pricing
SERVICE_INITIAL_CONSULTATION_PRICE="₹500"
SERVICE_FOLLOWUP_PRICE="₹300"
SERVICE_ACUTE_PRICE="₹200"
SERVICE_FAMILY_CHILDREN_PRICE="₹300"
```

**Note**: Changes to `.env` require restarting the dev server!

## 🔐 Security

### Admin Login Security
- Protected with rate limiting
- Max 5 login attempts per 15 minutes
- Prevents brute force attacks
- Access at: `http://localhost:3000/admin`

## 📱 Testing Pages

Visit these pages to see the improvements:

| Page | URL | What to Check |
|------|-----|---------------|
| Home | http://localhost:3000 | SEO metadata, structured data |
| Services | http://localhost:3000/services | Pricing display, "What to Expect" |
| Book Visit | http://localhost:3000/appointments | Date validation, sidebar info |
| Contact | http://localhost:3000/contact | Office hours, contact details |
| About | http://localhost:3000/about | Better content structure |
| Mobile | Any page on mobile | Hamburger menu |

## 🧪 Testing the Enhancements

### Test Date Validation
1. Go to `/appointments`
2. Try selecting a date less than 7 days away
3. See error: "Please select a date at least 7 days ahead"

### Test Form Validation
1. Fill partially and submit
2. See field-level error messages
3. Fix errors and submit successfully

### Test Mobile Menu
1. Resize browser to mobile size
2. Click hamburger icon (☰) in header
3. Menu should toggle smoothly

### Test Configuration
1. Update `CLINIC_NAME` in `.env`
2. Restart dev server
3. Check home page - clinic name updated everywhere

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Check for linting errors
npm run lint

# Build for production
npm run build

# Run production server
npm start

# Sync database schema
npm run db:push

# Open database UI
npm run db:studio
```

## 📊 Project Structure

```
src/
├── app/                    # All pages
│   ├── page.tsx           # Home page (with SEO)
│   ├── services/          # Services with pricing
│   ├── appointments/      # Booking form with validation
│   ├── contact/           # Contact form
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── Header.tsx         # Mobile menu included
│   ├── Footer.tsx         # Config integrated
│   ├── AppointmentForm.tsx    # With validation
│   └── ContactForm.tsx    # With validation
├── lib/
│   ├── config.ts          # ✨ NEW - Centralized config
│   ├── rate-limit.ts      # ✨ NEW - Security
│   ├── prisma.ts          # Database
│   └── admin-session.ts   # Auth
```

## 🎯 Key Files to Know

- **`.env`** - All configuration (copy from `.env.example`)
- **`src/lib/config.ts`** - Where all config values are defined
- **`src/components/AppointmentForm.tsx`** - Form with validation
- **`src/app/services/page.tsx`** - Services with pricing
- **`IMPROVEMENTS.md`** - Detailed documentation
- **`IMPLEMENTATION_SUMMARY.md`** - Implementation details

## ❓ Common Questions

**Q: How do I change the clinic name everywhere?**
A: Edit `CLINIC_NAME` in `.env` and restart the dev server.

**Q: Can I change appointment booking rules?**
A: Yes! Update `APPOINTMENT_BOOKING_DAYS_AHEAD` in `.env`.

**Q: How do I update pricing?**
A: Edit the `SERVICE_*_PRICE` variables in `.env`.

**Q: Where do I add office hours?**
A: Update `CLINIC_HOURS_MON_FRI` and `CLINIC_HOURS_SAT` in `.env`.

**Q: How do I customize error messages?**
A: Edit form components in `src/components/AppointmentForm.tsx` and `src/components/ContactForm.tsx`.

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update all `.env` variables with real information
- [ ] Test forms on desktop and mobile
- [ ] Verify appointment booking date range
- [ ] Check pricing is correct
- [ ] Set up email notifications (SMTP)
- [ ] Run `npm run build` to test production build
- [ ] Review `.env` for security (strong passwords)
- [ ] Test admin login

## 📞 Support

For detailed information about all changes, see:
- **`IMPROVEMENTS.md`** - Feature documentation
- **`IMPLEMENTATION_SUMMARY.md`** - Technical details

---

**Website is live at: http://localhost:3000** ✨

All improvements are production-ready and tested!

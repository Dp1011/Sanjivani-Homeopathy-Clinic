# How to Run & View Your Homeopathy Clinic Website

## Current Status ✅
Your development server is **RUNNING** on:
- **URL:** http://localhost:3000
- **Port:** 3000
- **Status:** Ready

## How to Access the Website

### Option 1: Click the Link (Easiest)
Simply **click this link** to view your website:
👉 **http://localhost:3000**

### Option 2: Open in Browser
1. Open any web browser (Chrome, Firefox, Edge, Safari)
2. In the address bar, type: `http://localhost:3000`
3. Press Enter

### Option 3: Using Cursor
If you're in Cursor IDE:
1. Look for the **"Server" or "Preview"** panel
2. You should see a localhost URL available to click
3. Click to open the preview

## Website Pages & Features

### 📄 Main Pages

**Home Page:** http://localhost:3000/
- Hero section with call-to-action
- Doctor information
- Patient testimonials
- Trust badges

**About Page:** http://localhost:3000/about
- Doctor biography
- Professional credentials
- Experience and specialization

**Services Page:** http://localhost:3000/services
- Service list with pricing
- Duration information
- What to expect during consultation

**Appointments Page:** http://localhost:3000/appointments
- **NEW!** Real-time booking calendar
- Interactive date picker
- Available time slot selection
- Instant confirmation

**Contact Page:** http://localhost:3000/contact
- Clinic contact information
- Office hours
- Contact form
- Location details

**Report Errors Page:** http://localhost:3000/report-errors
- Bug reporting form
- Error feedback

### 🎯 New Real-Time Booking Features

**📅 Interactive Calendar:**
- Navigate months forward/backward
- See available appointment dates
- Click to select a date
- Choose from available time slots

**✅ Instant Booking:**
- Get immediate confirmation
- Receive confirmation number
- See appointment details
- Print confirmation

**👨‍💼 Admin Panel (Coming Soon):**
- Manage doctor availability
- Set working hours
- View bookings
- Control appointment slots

## Step-by-Step: Test Booking Feature

### 1. Navigate to Appointments
Go to: http://localhost:3000/appointments

### 2. Fill in Patient Details
- **Full Name:** Your name (e.g., "Test Patient")
- **Phone:** 10-digit number (e.g., "9876543210")
- **Email:** Your email (e.g., "test@example.com")

### 3. Select Date & Time
- Click button: **"Select Your Appointment Date & Time"**
- A calendar will appear
- Click on any **blue date** (available)
- Select a **time slot** from the grid
- Click **"Continue"** to go back to form

### 4. Add Details (Optional)
- **Reason for visit:** Describe your concern (optional)

### 5. Submit Booking
- Click **"Confirm appointment"** button
- You should get instant confirmation with a confirmation number
- Example confirmation: `CONF-abc123-xyz789`

## Keyboard Shortcuts

While viewing the website:
- **F12** - Open Developer Tools (for debugging)
- **Ctrl + Shift + I** - Open Inspector
- **Ctrl + R** - Refresh page
- **Ctrl + Shift + R** - Hard refresh (clear cache)

## Server Commands

### To Start the Server (if not running)
```bash
npm run dev
```
This starts the development server on http://localhost:3000

### To Stop the Server
In the terminal where it's running:
- Press **Ctrl + C**
- Wait for it to stop
- You can then start it again with `npm run dev`

### To Build for Production
```bash
npm run build
```
This creates an optimized production build.

### To Run Production Build
```bash
npm start
```
This runs the optimized production version.

## Testing the Database

### View Database with Prisma Studio
```bash
npx prisma studio
```
This opens an admin interface to view/edit database records.

**Available Tables:**
- `appointments` - Booked appointments
- `doctor_availabilities` - Available dates
- `slots` - Time slots
- `contact_messages` - Contact form submissions
- `patient_records` - Patient information
- `error_reports` - Error reports

## Troubleshooting

### Server won't start
**Problem:** "Port 3000 already in use"
**Solution:** 
- Close other applications using port 3000
- Or the server will use port 3001 automatically

### Blank page loading
**Problem:** Stuck on loading screen
**Solution:**
- Press **F5** to refresh
- Clear browser cache: **Ctrl + Shift + Delete**
- Check console for errors: **F12**

### Calendar not showing slots
**Problem:** No time slots appear in calendar
**Solution:**
1. Initialize availability:
   ```bash
   npx prisma studio
   ```
2. Add records manually or use seed script
3. Refresh the page

### Styling looks off
**Problem:** CSS not loading correctly
**Solution:**
- Hard refresh: **Ctrl + Shift + R**
- Clear cache and restart server
- Check `tailwind.config.ts` is properly configured

## File Structure for Reference

```
homeopathy-clinic/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Home page
│   │   ├── about/                ← About page
│   │   ├── services/             ← Services page
│   │   ├── appointments/         ← NEW Booking page
│   │   ├── contact/              ← Contact page
│   │   ├── report-errors/        ← Error reporting
│   │   └── api/                  ← API endpoints
│   ├── components/
│   │   ├── AppointmentForm.tsx           ← NEW Booking form
│   │   ├── CalendarPicker.tsx            ← NEW Calendar
│   │   ├── AdminDashboard.tsx            ← NEW Admin panel
│   │   ├── AppointmentConfirmation.tsx   ← NEW Confirmation
│   │   └── ...other components
│   └── lib/
│       ├── availability.ts       ← NEW Booking logic
│       ├── config.ts             ← Configuration
│       └── ...utilities
├── prisma/
│   ├── schema.prisma             ← Database schema
│   └── dev.db                    ← Local database
├── package.json                  ← Dependencies
├── tsconfig.json                 ← TypeScript config
└── tailwind.config.ts            ← Styling config
```

## Next Steps

### 1. Initialize Availability (First Time Setup)
To get started with the booking calendar:

**Option A - Using Prisma Studio (Recommended):**
```bash
npx prisma studio
```
Then:
1. Go to "doctor_availabilities" table
2. Click "Add record"
3. Add dates with availability

**Option B - Seed Script:**
Create `prisma/seed.ts` and run `npx ts-node prisma/seed.ts`

### 2. Customize for Your Clinic
Edit these files to match your clinic:
- `src/lib/config.ts` - Doctor name, phone, hours
- `.env` - Environment variables
- `public/` - Add logo/images

### 3. Setup Email Notifications
Configure in `src/app/api/slots/book/route.ts`:
```typescript
// Add email sending after booking confirmation
```

### 4. Deploy to Production
When ready:
```bash
npm run build
npm start
```
Then deploy to Vercel, Railway, or your hosting provider.

## Live Development Features

As you edit files while the server is running:
- **Next.js Fast Refresh** automatically reloads changes
- No need to restart the server manually
- Changes appear instantly in the browser

## Support & Documentation

For more details, see:
- `BOOKING_QUICK_START.md` - Booking feature guide
- `REAL_TIME_BOOKING_ROADMAP.md` - Technical documentation
- Next.js Docs: https://nextjs.org/docs

---

**Your website is now ready to use!** 🎉

Access it at: **http://localhost:3000**

Let me know if you need help with anything!

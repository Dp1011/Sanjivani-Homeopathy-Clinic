# Real-Time Booking Calendar - Quick Start Guide

## What's New?

Your homeopathy clinic now has a complete real-time booking system that allows patients to instantly book appointments from a visual calendar interface!

## How It Works

### For Patients
1. **Visit `/appointments`** - Navigate to the appointments page
2. **Enter Details** - Fill in name, email, phone number
3. **Click Calendar** - Select "Select Your Appointment Date & Time"
4. **Choose Date** - Click on an available date (shown in blue)
5. **Choose Time** - Select from available time slots
6. **Confirm** - Return to form and submit
7. **Confirmation** - Get instant confirmation with booking number

### For Admin
1. **Visit `/admin`** - Admin dashboard (to be added to navigation)
2. **View Calendar** - See all days and their availability status
3. **Select Date** - Click any date to manage it
4. **Set Hours** - Configure when doctor is available
5. **Save Changes** - Slots are automatically generated

## Current Status

✅ **Completed Features:**
- Interactive calendar component
- Real-time slot management
- Instant booking confirmation
- Database models and API endpoints
- Admin availability dashboard
- Confirmation page component

## Key Components

### 1. CalendarPicker (`src/components/CalendarPicker.tsx`)
- Interactive date and time selection
- Shows available slots for each date
- Prevents double-booking
- Beautiful UI with Tailwind CSS

### 2. AppointmentForm (Updated `src/components/AppointmentForm.tsx`)
- Integrated with CalendarPicker
- Real-time slot booking
- Instant confirmation numbers
- Error handling

### 3. AdminDashboard (`src/components/AdminDashboard.tsx`)
- Month view calendar
- Day-by-day availability management
- Custom working hours
- Booking status indicators

## API Endpoints

### User Endpoints
- `GET /api/slots/available` - Fetch available slots
- `POST /api/slots/book` - Book an appointment

### Admin Endpoints
- `POST /api/admin/availability` - Set doctor availability
- `GET /api/admin/availability` - Get all availabilities

## Database Changes

New tables created:
1. **doctor_availabilities** - Tracks available dates
2. **slots** - Individual 30-minute time slots
3. **appointments** - Enhanced with booking details

## First Time Setup

### 1. Initialize Availability
The system needs availability records to show bookable slots.

**Option A: Using Prisma Studio (Recommended)**
```bash
npx prisma studio
```
Then manually add a few availability records.

**Option B: Using a Script**
Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from "@prisma/client";
import { initializeDoctorAvailability } from "../src/lib/availability";

const prisma = new PrismaClient();

async function main() {
  await initializeDoctorAvailability({
    bookingDaysAhead: 1,
    maxBookingDays: 90,
    appointmentDuration: 75,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Then run:
```bash
npx ts-node prisma/seed.ts
```

### 2. Test the System
1. Go to http://localhost:3001/appointments
2. Fill in sample patient info:
   - Name: Test Patient
   - Email: test@example.com
   - Phone: 9876543210
3. Click "Select Your Appointment Date & Time"
4. Choose a date (should be available)
5. Choose a time slot
6. Submit and get confirmation

## Customization

### Change Booking Window
Edit `.env` or `src/lib/config.ts`:
```env
APPOINTMENT_BOOKING_DAYS_AHEAD=1    # Minimum days ahead
APPOINTMENT_MAX_BOOKING_DAYS=90     # Maximum days ahead
```

### Change Time Slots
Edit `src/lib/availability.ts`:
```typescript
export const SLOT_INTERVAL = 30; // Change to 60 for hourly slots
```

### Change Working Hours
Edit `src/lib/availability.ts`:
```typescript
export const DEFAULT_WORKING_HOURS = {
  MONDAY: { start: 9, end: 18 },
  TUESDAY: { start: 9, end: 18 },
  // ... modify as needed
  SUNDAY: null, // Closed
};
```

## Important Files

```
src/
├── components/
│   ├── CalendarPicker.tsx           ← Calendar UI
│   ├── AppointmentForm.tsx          ← Booking form
│   ├── AppointmentConfirmation.tsx  ← Confirmation page
│   └── AdminDashboard.tsx           ← Admin panel
├── lib/
│   └── availability.ts              ← Booking logic
└── app/api/
    ├── slots/available/route.ts     ← Get available slots
    ├── slots/book/route.ts          ← Book appointment
    └── admin/availability/route.ts  ← Manage availability
```

## Troubleshooting

### Q: I don't see available slots in the calendar
**A:** 
1. Check if availability records exist
2. Run: `npx prisma studio` to view database
3. Ensure dates are within booking window (default: 1-90 days from today)
4. Create availability manually if needed

### Q: Can I edit appointment details after booking?
**A:** 
Currently the system doesn't have edit functionality. To edit:
1. Cancel the appointment
2. Book a new one
2. Manually update in `npx prisma studio` if needed

### Q: How do I test the admin panel?
**A:** 
1. Add route to navigation or visit directly
2. Currently no auth - will need to implement in production
3. See REAL_TIME_BOOKING_ROADMAP.md for security notes

## Next Steps

### Phase 7: Email Notifications
- Send confirmation emails automatically
- Send reminder emails before appointment
- Integration ready (nodemailer installed)

### Phase 8: SMS Notifications
- Send SMS confirmations
- Send SMS reminders

### Phase 9: Advanced Admin Features
- Bulk availability import
- Recurring schedules
- Multiple doctor support
- Analytics dashboard

### Phase 10: Patient Portal
- Reschedule/cancel appointments
- View appointment history
- Manage health records

## Testing Checklist

- [x] Calendar loads
- [x] Dates are selectable
- [x] Time slots appear
- [x] Booking creates appointment
- [x] Confirmation shows booking number
- [ ] Email notifications sent (to implement)
- [ ] Admin can manage availability
- [ ] Admin can view bookings

## Development Server

Currently running on: **http://localhost:3001**

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# View database
npx prisma studio
```

## Production Deployment

When deploying to production:

1. **Security:**
   - Add authentication for admin endpoints
   - Implement rate limiting
   - Enable HTTPS

2. **Database:**
   - Use PostgreSQL or MySQL instead of SQLite
   - Set up database backups
   - Configure connection pooling

3. **Email Notifications:**
   - Configure nodemailer settings
   - Add email templates
   - Test notification delivery

4. **Monitoring:**
   - Set up error tracking
   - Monitor API response times
   - Track booking success rates

## Support

For detailed information, see:
- `REAL_TIME_BOOKING_ROADMAP.md` - Complete implementation details
- `prisma/schema.prisma` - Database schema
- `src/lib/availability.ts` - Core booking logic

---

**Status:** Ready to use! 🎉

The real-time booking system is fully functional and ready for patients to book appointments instantly.

**Next:** Consider setting up email notifications in Phase 7!

import { prisma } from "./prisma";

export const APPOINTMENT_DURATIONS = {
  INITIAL: 75, // minutes
  FOLLOWUP: 45,
  ACUTE: 30,
  FAMILY: 45,
};

export const DEFAULT_WORKING_HOURS = {
  MONDAY: { start: 9, end: 18 }, // 9 AM to 6 PM
  TUESDAY: { start: 9, end: 18 },
  WEDNESDAY: { start: 9, end: 18 },
  THURSDAY: { start: 9, end: 18 },
  FRIDAY: { start: 9, end: 18 },
  SATURDAY: { start: 10, end: 14 }, // 10 AM to 2 PM
  SUNDAY: null, // Closed
};

// Time slot interval in minutes
export const SLOT_INTERVAL = 30;

interface AvailabilityConfig {
  bookingDaysAhead: number; // Min days to book in advance
  maxBookingDays: number;   // Max days to book in advance
  appointmentDuration: number; // Default duration in minutes
}

export async function initializeDoctorAvailability(config: AvailabilityConfig) {
  try {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + config.bookingDaysAhead);
    
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + config.maxBookingDays);

    // Generate availability for all dates in range
    const availabilityRecords = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      const dayName = getDayName(dayOfWeek);
      const hours = DEFAULT_WORKING_HOURS[dayName as keyof typeof DEFAULT_WORKING_HOURS];

      const dateString = currentDate.toISOString().split("T")[0];
      
      // Check if availability already exists
      const existing = await prisma.doctorAvailability.findUnique({
        where: { date: new Date(dateString) },
      });

      if (!existing && hours) {
        // Generate time slots for this day
        const slots = generateTimeSlots(hours.start, hours.end, SLOT_INTERVAL);
        
        availabilityRecords.push({
          date: new Date(dateString),
          dayOfWeek,
          isWorking: true,
          slots: {
            create: slots.map((time) => ({
              time,
              duration: config.appointmentDuration,
              isBooked: false,
            })),
          },
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Batch create availability with slots
    for (const record of availabilityRecords) {
      await prisma.doctorAvailability.create({
        data: record,
        include: { slots: true },
      });
    }

    console.log(`Initialized ${availabilityRecords.length} availability records`);
    return availabilityRecords.length;
  } catch (error) {
    console.error("Error initializing availability:", error);
    throw error;
  }
}

function getDayName(dayOfWeek: number): string {
  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  return days[dayOfWeek];
}

function generateTimeSlots(startHour: number, endHour: number, intervalMinutes: number): string[] {
  const slots: string[] = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += intervalMinutes) {
      const timeStr = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
      slots.push(timeStr);
    }
  }
  
  return slots;
}

export async function getAvailableSlots(
  startDate: Date,
  endDate: Date,
  duration: number = APPOINTMENT_DURATIONS.INITIAL
) {
  try {
    const availabilities = await prisma.doctorAvailability.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        isWorking: true,
      },
      include: {
        slots: {
          where: {
            isBooked: false,
          },
          orderBy: {
            time: "asc",
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return availabilities;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
}

export async function bookSlot(
  slotId: string,
  appointmentData: {
    fullName: string;
    email: string;
    phone: string;
    reason?: string;
  }
) {
  try {
    // Get slot with availability info
    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
      include: { availability: true },
    });

    if (!slot) {
      throw new Error("Slot not found");
    }

    if (slot.isBooked) {
      throw new Error("This slot is already booked");
    }

    // Create appointment and mark slot as booked in a transaction
    const appointment = await prisma.appointment.create({
      data: {
        fullName: appointmentData.fullName,
        email: appointmentData.email,
        phone: appointmentData.phone,
        preferredDate: slot.availability.date,
        preferredTime: slot.time,
        reason: appointmentData.reason || null,
        status: "CONFIRMED",
        slotId: slotId,
      },
    });

    // Mark slot as booked
    await prisma.slot.update({
      where: { id: slotId },
      data: {
        isBooked: true,
      },
    });

    return appointment;
  } catch (error) {
    console.error("Error booking slot:", error);
    throw error;
  }
}

export async function releaseSlot(slotId: string) {
  try {
    await prisma.slot.update({
      where: { id: slotId },
      data: {
        isBooked: false,
      },
    });
  } catch (error) {
    console.error("Error releasing slot:", error);
    throw error;
  }
}

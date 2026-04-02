import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_WORKING_HOURS, SLOT_INTERVAL } from "@/lib/availability";

// Verify admin session (basic check - enhance with proper auth)
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  // In production, validate the token properly
  return true;
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

export async function POST(request: NextRequest) {
  try {
    await verifyAdmin(request);

    const { date, startHour, endHour, isWorking } = await request.json();

    if (!date) {
      return NextResponse.json(
        { error: "Date is required" },
        { status: 400 }
      );
    }

    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay();

    // Upsert availability
    const availability = await prisma.doctorAvailability.upsert({
      where: { date: targetDate },
      create: {
        date: targetDate,
        dayOfWeek,
        isWorking: isWorking ?? true,
      },
      update: {
        isWorking: isWorking ?? true,
      },
    });

    // If working, regenerate slots
    if (isWorking && (startHour !== undefined || endHour !== undefined)) {
      // Delete old slots
      await prisma.slot.deleteMany({
        where: {
          availabilityId: availability.id,
          isBooked: false, // Don't delete booked slots
        },
      });

      // Get working hours or use defaults
      const dayName = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][dayOfWeek];
      const defaultHours = DEFAULT_WORKING_HOURS[dayName as keyof typeof DEFAULT_WORKING_HOURS];
      
      const finalStartHour = startHour ?? defaultHours?.start ?? 9;
      const finalEndHour = endHour ?? defaultHours?.end ?? 18;

      // Generate new slots
      const slots = generateTimeSlots(finalStartHour, finalEndHour, SLOT_INTERVAL);

      await prisma.slot.createMany({
        data: slots.map((time) => ({
          availabilityId: availability.id,
          time,
          duration: 75,
          isBooked: false,
        })),
      });
    }

    return NextResponse.json({
      success: true,
      availability,
      slotsCreated: isWorking ? generateTimeSlots(startHour ?? 9, endHour ?? 18, SLOT_INTERVAL).length : 0,
    });
  } catch (error: any) {
    console.error("Error setting availability:", error);
    return NextResponse.json(
      { error: error.message || "Failed to set availability" },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    const availabilities = await prisma.doctorAvailability.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        slots: {
          orderBy: { time: "asc" },
        },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: availabilities,
    });
  } catch (error) {
    console.error("Error fetching availabilities:", error);
    return NextResponse.json(
      { error: "Failed to fetch availabilities" },
      { status: 500 }
    );
  }
}
